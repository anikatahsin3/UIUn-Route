import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { busOrange } from '../Components/Constants';
import { useRoute } from '@react-navigation/native';
import { firebase } from '../Components/config';

export default function BookSeat(props) {
    const route = useRoute();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(null);
    const [text, setText] = useState('Scan the seat QR code ')
    const [date, setDate] = useState(null);
    const [bookingId, setBookingId] = useState('')
    const [studentId, setStudentId] = useState('')
    const [lastBooking, setLastBooking] = useState('')
    var seat = ""
    var bus = ""
    var busroute = ""
    var userData = route.params.userData

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }

    const confirmSeat = () => {
        firebase.firestore().collection('bookings')
            .doc(bookingId).get()
            .then((snapshot) => {
                if (!snapshot.exists) {

                    if (lastBooking == date) {
                        alert('You have already booked seat today!')
                    }
                    else {
                        firebase.firestore().collection('bookings')
                            .doc(bookingId)
                            .set({
                                studentId,
                            })
                            .then(() => {
                                alert('Seat Booked for you!')
                            })
                    }
                    props.navigation.pop()
                }
                else {
                    alert('This seat is already booked for today!')
                }
            })
    }

    useEffect(() => {
        askForCameraPermission();
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        setDate(date);

        const str2 = userData.split('_')
        setStudentId(str2[0])
        setLastBooking(str2[1])

    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true)
        const str = data.split('_')
        busroute = str[0]
        bus = str[1]
        seat = str[2]
        setBookingId(date + "_" + data)
        setText('Route: ' + busroute + '\nBus: ' + bus + '\nSeat: ' + seat)
    };

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text style={styles.maintext}>Requesting camera permission!</Text>
            </View>
        )
    } else if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={styles.maintext} >Camera Permission Denied!</Text>
                <Button title={'Allow Camera'} onPress={() => { askForCameraPermission() }} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }}
                />
            </View>
            <Text style={styles.maintext} >{text}</Text>
            {scanned && <Button title={'Confirm Seat'} onPress={() => { confirmSeat() }} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcodebox: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: busOrange
    },
    maintext: {
        fontSize: 20,
        margin: 20,
        fontWeight: 'bold'
    }
})