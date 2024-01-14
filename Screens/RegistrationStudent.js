import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, Dimensions, TouchableOpacity } from 'react-native';

import { FlatList, TextInput } from 'react-native-gesture-handler';
import Background from '../Components/Background';
import { busOrange } from '../Components/Constants';
import Field from '../Components/Field';
import Button from '../Components/Button';
import { firebase } from '../Components/config'
import { useNavigation } from '@react-navigation/native';

const RegistrationStudent = (props) => {
    const sid=props.studentId;
    const [routes , setRoutes] = useState([]);
    const routeref = firebase.firestore().collection('routes');
    routeref
    .onSnapshot(
        querySnapshot => {

            const routes = []
            querySnapshot.forEach((doc) => {
                const { Description, rid } = doc.data()
                routes.push({
                    id : doc.id,
                    rid,
                    Description,
                })
            })
            setRoutes(routes)
        }
    )

    const [route, setroute] = useState('')
    var w = 400;

    function setWidth() {
        if( Dimensions.get('window').width > w )
        {
            w = 400
        } else {
            w = Dimensions.get('window').width
        }
    }
    
    const CompleteRegistration = async(sid, tid) => {
        
            const registration = firebase.firestore().collection('registration')
            const data = {
                studentid : sid,
                route : tid,
            }
            registration.add(data)
            props.navigation.navigate('Dashboard')
        
    }

    return (
        <Background>
        {setWidth()}
            <View style={{ alignItems: "center", width: 395 }}>
                <Text style={{
                    color: 'black',
                    fontSize: 45,
                    fontWeight: 'bold',
                    marginTop: 30
                }} >Registration</Text>

                


                <View style={{
                    backgroundColor: 'white',
                    height: Dimensions.get('window').height,
                    width: w,
                    borderTopLeftRadius: 130,
                    paddingTop: 50,
                    alignItems: 'center'
                }}>
                <FlatList
                style={styles.fl1}
                data ={routes}
                renderItem={({item}) => 
                <View style={styles.v2}>
                    <Text >Route {item.rid} : {item.Description}</Text>
                    <Pressable style={styles.p1} onPress={() => CompleteRegistration(sid, item.rid)}>
                    <Text>Register Route</Text>
                </Pressable>
                </View>
                }
                />
                    
                </View>
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
        flex : 1,
        borderColor : busOrange,
        borderStyle : 'solid',
        padding: 2,
        borderWidth : 1,  
        borderRadius : 5,
        margin : 2 
    },
    fl1 : {
        flex : 1,
        padding : 25,
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


export default RegistrationStudent;