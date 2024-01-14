import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Background from '../Components/Background';
import { busOrange, transGray } from '../Components/Constants';
import Field from '../Components/Field';
import Button from '../Components/Button';
import { Dimensions } from 'react-native';
import { firebase } from '../Components/config'
import { useNavigation } from '@react-navigation/native';

const Login = (props) => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    var w = 400;

    function setWidth() {
        if( Dimensions.get('window').width > w )
        {
            w = 400
        } else {
            w = Dimensions.get('window').width
        }
    }

    const loginUser = async (email, password) => {
        if (email === "" || password === "") {
            alert("Email or Password field can't be empty!")
        } else {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (error) {
                alert(error.message)
            }
        }
    }

    return (
        <Background>
        {setWidth()}
            <View style={{ alignItems: "center"}}>
                <Text style={{
                    color: 'black',
                    fontSize: 60,
                    fontWeight: 'bold',
                    marginTop: 30,
                    marginBottom: 7
                }} >Login</Text>

                <View style={{
                    backgroundColor: 'white',
                    height: Dimensions.get('window').height,
                    width: w,
                    borderTopLeftRadius: 130,
                    paddingTop: 60,
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 40, color: busOrange, fontWeight: 'bold' }}>Welcome back</Text>

                    <Text style={{
                        fontSize: 19,
                        color: transGray,
                        fontWeight: 'bold',
                        marginBottom: 15
                    }} >Login to your account</Text>

                    <Field placeholder="Email" value={email} onChangeText={text => setEmail(text)} autoCapitalize="none" autoCorrect={false} onkeyboardType={"email-address"} />
                    <Field placeholder="Password" value={password} onChangeText={text => setPassword(text)} autoCapitalize="none" autoCorrect={false} secureTextEntry={true} />

                    <View style={{
                        alignItems: 'flex-end',
                        width: '78%',
                        paddingRight: 16,
                        marginBottom: 140
                    }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate("ForgotPass")}>
                            <Text style={{
                                color: busOrange,
                                fontWeight: 'bold',
                                fontSize: 16
                            }}
                            >Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Button bgColor={busOrange} textColor='white' btnLabel="Login" Press={() => loginUser(email, password)} />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Don't have an account? </Text>

                        <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
                            <Text style={{ fontSize: 16, color: busOrange, fontWeight: 'bold' }} >Signup</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Background>
    );
}

export default Login;