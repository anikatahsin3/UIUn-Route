import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { busOrange } from '../Components/Constants';
import { useRoute } from '@react-navigation/native';
import { firebase } from '../Components/config';
import Dashboard from './Dashboard';

import { FlatList, TextInput, Label } from 'react-native-gesture-handler';

export default function LostFoundStaff() {

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    
    const add = () => {
        console.log(text1)
        console.log(text2)
        console.log(text3)
        const staffref = firebase.firestore().collection('lostfound')
        const data = {
            item : text1,
            busno : text2,
            routeno : text3,
        }
        staffref.add(data)
        navigation.navigate('LostFoundStaff')
    }

    const home = () => {
        navigation.navigate('Dashboard');
    }

    return (
        <View style={styles.container}>
            <View style={styles.lostfound}>
                <Label>Item Found:</Label><TextInput style={styles.textarea} placeholder={text1} value={text1} onChangeText={text => setText1(text)}></TextInput>
                <Label>Route No:</Label><TextInput style={styles.textarea} placeholder={text2} value={text2} onChangeText={text => setText2(text)}></TextInput>
                <Label>Bus No:</Label><TextInput style={styles.textarea} placeholder={text3} value={text3} onChangeText={text => setText3(text)}></TextInput>

                <View style={styles.btn} >
                    {<Button title={'Add this item'} onPress={() => { add() }} />}
                </View> 
            </View>
            {<Button title={'DASHBOARD'} onPress={() => { home() }}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        fontSize: 16,
        margin: 20
    },
    lostfound: {
        backgroundColor: '#D5D6EA',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 50,
        height: 300,
        width: 600,
        overflow: 'hidden',
        borderRadius: 30,
    },
    btn: {
        margin: 20,
        padding: 20,
    },
    textarea: {
        backgroundColor:'#FFFFFF',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        width:500,
        height: 10, // Adjust the height as needed
    }

})