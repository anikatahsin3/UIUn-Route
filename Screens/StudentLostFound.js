import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Pressable, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { busOrange } from '../Components/Constants';
import { useRoute } from '@react-navigation/native';
import { firebase } from '../Components/config';
import Dashboard from './Dashboard';
import Background from '../Components/Background';

import { FlatList, TextInput } from 'react-native-gesture-handler';

const StudentLostFound = (props) => {
    console.log(props.studentId)
    const [lost, setlost] = useState([]);

    const lostref = firebase.firestore().collection('lostfound').where('claim', '==', '0');
    lostref
    .onSnapshot(
        querySnapshot =>{
            const lost = []
            querySnapshot.forEach((doc) => {
                const { item, busno, routeno} = doc.data()
                lost.push({
                    item,
                    busno,
                    routeno,
                })
            })
            setlost(lost)
        }
    )

    const claimitem = (itemid) => {
        const itemref = firebase.firestore().collection('lostfound').doc(itemid)
        .update({
        })
        props.navigation.navigate('StudentLostFound')
    }

    return(
        <Background>
            <View style={styles.v1}>
            <FlatList
            style={styles.fl1}
            data ={lost}
            renderItem={({item}) => 
            <View style={styles.v2}>
                <Text >Route Number {item.routeno}</Text>
                <Text >Bus Number {item.busno} : {item.item}</Text>
                {/* <Pressable style={styles.p1} onPress={() => claimitem(item.id)}>
                    <Text>Claim</Text>
                </Pressable> */}
            </View>
            }
            />
            <Pressable style={styles.menubutton} onPress={() => { props.navigation.navigate('Dashboard') }}>
                        <Text style={styles.buttontext}>Home</Text>
            </Pressable>
            </View>
        </Background>
        
    );
}

const styles = StyleSheet.create({
    p1 : {
        backgroundColor : busOrange,
        width : 100,
        textAlign : 'center',
        margin : 5,
        borderRadius : 5,
    },
    v2 :{
        borderColor : busOrange,
        borderStyle : 'solid',
        padding: 2,
        borderWidth : 1,  
        borderRadius : 5,
        margin : 2 
    },
    fl1 : {
        padding : 25,
    },
    v1: {
        alignItems: "center",
        backgroundColor: 'white',
        height: (Dimensions.get('window').height * .8),
        width: (Dimensions.get('window').width * .8),
        borderRadius: 5,
        borderTopLeftRadius: 50,
        marginTop: (Dimensions.get('window').height * .1),
        justifyContent: 'center',
        flexDirection: 'column',

    },
    menubutton: {
        width : 100,
        backgroundColor: busOrange,
        borderRadius: 15,
        padding: 15,
        margin: 5
    },
    buttontext: {
        color : 'white',
        fontSize: (Dimensions.get('window').height * .025)
    }


});

export default StudentLostFound;
