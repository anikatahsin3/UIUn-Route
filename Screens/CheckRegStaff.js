import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { busOrange } from '../Components/Constants';
import { useRoute } from '@react-navigation/native';
import { firebase } from '../Components/config';

export default function CheckRegStaff() {
    const route = useRoute();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(null);
    const [text, setText] = useState('Scan the seat QR code')
    const [userid, setuserid] = useState('')

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }

    useEffect(() => {
        askForCameraPermission();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true)
        // const str = data.split('')
        // route = str[0]
        setuserid(data+'_Fall2022')
        setText('ID: '+data)
    };


    const checkReg = () => {
        firebase.firestore().collection('registration')
        .doc(userid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                alert('Student is Registered!')
            } else {
                alert("Student isn't Registered! 50tk Fine applied")
            }
        })
    }

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting camera permission!</Text>
            </View>
        )
    } else if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }} >Camera Permission Denied!</Text>
                <Button title={'Allow Camera'} onPress={() => { askForCameraPermission() }} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={ scanned ? undefined : handleBarCodeScanned }
                    style = {{ height: 400, width: 400}}
                />
            </View>
            <Text style = {styles.maintext} >{text}</Text>
            {scanned && <Button title={'Check'} onPress={() => { checkReg() }} />}
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
        fontSize: 16,
        margin: 20
    }
})
