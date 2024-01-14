import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Background from '../Components/Background';
import { busOrange } from '../Components/Constants';
import Field from '../Components/Field';
import Button from '../Components/Button';
import { Dimensions } from 'react-native';
import { firebase } from '../Components/config'
import { useNavigation } from '@react-navigation/native';

const Signup = (props) => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [id, setId] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    var w = 400;

    function setWidth() {
        if( Dimensions.get('window').width > w )
        {
            w = 400
        } else {
            w = Dimensions.get('window').width
        }
    }
    
    const registerUser = async(email, password, name, phone, id, limit, userType) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://uiu-nroute.web.app',
            })
            .then(() => {
                alert('Congratulations! Account successfully created. Verification Email sent!')
            }).catch((error) => {
                alert(error.message)
            })
            .then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email,
                    phone,
                    id,
                    limit,
                    userType,
                })
                .then(() => {
                    firebase.auth().signOut()
                })
            })
            .catch((error) => {
                alert(error.message)
            })
        })
        .catch((error => {
            alert(error.message)
        }))
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
                }} >Student Register</Text>

                <Text style={{
                    fontSize: 19,
                    color: busOrange,
                    fontWeight: 'bold',
                    marginBottom: 5
                }} >Create a new student account</Text>


                <View style={{
                    backgroundColor: 'white',
                    height: Dimensions.get('window').height,
                    width: w,
                    borderTopLeftRadius: 130,
                    paddingTop: 50,
                    alignItems: 'center'
                }}>
                    <Field placeholder="Full Name" value={name} onChangeText={text => setName(text)}/>
                    <Field placeholder="Email"  onChangeText={text => setEmail(text)} value={email} autoCapitalize="none" autoCorrect={false} onkeyboardType={"email-address"} />
                    <Field placeholder="Phone" value={phone} onChangeText={text => setPhone(text)} keyboardType={"numeric"} />
                    <Field placeholder="Student ID" value={id} onChangeText={text => setId(text)} keyboardType={"numeric"} />
                    <Field placeholder="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} />
                    <Field placeholder="Confirm Password" value={confirmPassword} onChangeText={text => setConfirmPassword(text)} secureTextEntry={true} />

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '78%'
                    }}>
                        <Text style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 12,
                            }}
                            >By signin up, you agree to our </Text>
                        <TouchableOpacity>
                            <Text style={{
                                color: busOrange,
                                fontWeight: 'bold',
                                fontSize: 12
                            }}
                            >Terms & Conditions</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '80%',
                        marginBottom: 20,
                        marginRight: 30
                    }}>
                        <Text style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 12
                            }}
                            >and </Text>
                        <TouchableOpacity>
                            <Text style={{
                                color: busOrange,
                                fontWeight: 'bold',
                                fontSize: 12
                            }}
                            >Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>

                    <Button bgColor={busOrange} textColor='white' btnLabel="Register" Press={() => registerUser(email, password, name, phone, id, '5', '3')} />

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Already have an account? </Text>

                        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
                            <Text style={{ fontSize: 16, color: busOrange, fontWeight: 'bold' }} >Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Background>
    );
}

export default Signup;