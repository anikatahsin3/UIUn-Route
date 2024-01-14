import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import Background from '../Components/Background';
import { busOrange, transGray } from '../Components/Constants';
import Field from '../Components/Field';
import Button from '../Components/Button';
import { Dimensions } from 'react-native';
import { firebase } from '../Components/config'
import { useNavigation } from '@react-navigation/native';

const ForgotPass = (props) => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    var w = 400;

    function setWidth() {
        if( Dimensions.get('window').width > w )
        {
            w = 400
        } else {
            w = Dimensions.get('window').width
        }
    }

    const forgotPass = async (email) => {
        if (email === "") {
            alert("Please type your email!")
        } else {

            try {
                await firebase.auth().sendPasswordResetEmail(email)
                .then( () => {
                    alert("Password reset link send to your email!")
                })
                .then( () => {
                    props.navigation.navigate("Login")
                })
            } catch (error) {
                alert(error.message)
            }
        }
    }

    return (
        <Background>
        {setWidth()}
            <View style={{ alignItems: "center", width: 395 }}>
                <Text style={{
                    color: 'black',
                    fontSize: 35,
                    fontWeight: 'bold',
                    marginTop: 35,
                    marginBottom: 15
                }} >Forgot Password?</Text>
                
                <View style={{
                    backgroundColor: 'white',
                    height: Dimensions.get('window').height,
                    width: w,
                    borderTopLeftRadius: 130,
                    paddingTop: 10,
                    alignItems: 'center'
                }}>

                    <Image source={require("../assets/forgot.png")}
                        style = {{ height: 200 , width: 200, alignItems: 'center', marginTop: 40, opacity: 1}}
                    />

                    <Text style={{
                        fontSize: 19,
                        color: transGray,
                        fontWeight: 'bold',
                        marginBottom: 15
                    }} >Type your email and press Reset!</Text>

                    <Field placeholder="Email" value={email} onChangeText={text => setEmail(text)} autoCapitalize="none" autoCorrect={false} onkeyboardType={"email-address"} />

                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Button bgColor={busOrange} textColor='white' btnLabel="Reset" Press={() => forgotPass(email)} />
                    </View>
                </View>
            </View>
        </Background>
    );
}

export default ForgotPass;