import React from 'react';
import Background from '../Components/Background';
import { useState, useEffect } from 'react';
import { firebase } from '../Components/config';
import Button from '../Components/Button';
import { Text, View, Image, Dimensions } from 'react-native';
import { busOrange } from '../Components/Constants';
import { TouchableOpacity } from 'react-native';

const Dashboard = (props) => {
    const [curUser, setCurUser] = useState('')
    const [emailVarified, setEmailVarified] = useState('')
    var w = 400;
    var paddingVer = 15
    var paddingHor = 20
    var logoHeightWidth = 85

    function setWidth() {
        if (Dimensions.get('window').width > w) {
            w = 400
        } else {
            w = Dimensions.get('window').width
        }
    }

    useEffect(() => {
        firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid).get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setCurUser(snapshot.data())
                }
                else {
                    setCurUser('N/A')
                }

                if (firebase.auth().currentUser.emailVerified) {
                    setEmailVarified('')
                } else {
                    setEmailVarified(" (not verified)")
                }
            })
    }, [])

    if (curUser.userType == '3') {
        var studentId = curUser.id;

        return (
            <Background>
                {setWidth()}
                <View>
                    <View style={{ width: '100%', justifyContent: 'center', marginTop: 55, flexDirection: 'row' }}>
                        <Image source={require("../assets/userIcon.png")}
                            style={{ height: 70, width: 70, alignItems: 'center', borderRadius: 10 }}
                        />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{curUser.name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{curUser.email}</Text>
                                <Text style={{ color: busOrange }}>{emailVarified}</Text>
                            </View>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#32CD32' }}>Emergency Usage Limit: 5</Text>
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: 'white',
                        height: Dimensions.get('window').height,
                        width: w,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        marginTop: 20
                    }}>

                        <View style={{ padding: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('BookSeat', { studentId })} style={{ width: 170, alignItems: 'center', paddingHorizontal: paddingHor, paddingVertical: paddingVer }} >
                                    <Image source={require("../assets/booking.png")} style={{ height: logoHeightWidth, width: logoHeightWidth }} />
                                    <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }} >Attend Seat</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => props.navigation.navigate('EmergencyRegisterStudent')} style={{ width: 170, alignItems: 'center', paddingHorizontal: paddingHor, paddingVertical: paddingVer }} >
                                    <Image source={require("../assets/emergency.png")} style={{ height: logoHeightWidth, width: logoHeightWidth }} />
                                    <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }} >Emergency Use</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('RegistrationStudent', { studentId })} style={{ width: 170, alignItems: 'center', paddingHorizontal: paddingHor, paddingVertical: paddingVer }} >
                                    <Image source={require("../assets/registration.png")} style={{ height: logoHeightWidth, width: logoHeightWidth }} />
                                    <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }} >Transport Registration</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => props.navigation.navigate("StudentLocation", {latt : 23.750871, long : 90.4033241})} style={{ width: 170, alignItems: 'center', paddingHorizontal: paddingHor, paddingVertical: paddingVer }} >
                                    <Image source={require("../assets/location.png")} style={{ height: logoHeightWidth, width: logoHeightWidth }} />
                                    <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }} >Transport Location</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate("StudentLostFound")} style={{ width: 170, alignItems: 'center', paddingHorizontal: paddingHor, paddingVertical: paddingVer }} >
                                    <Image source={require("../assets/lost-and-found.png")} style={{ height: logoHeightWidth, width: logoHeightWidth }} />
                                    <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }} >Lost and Found</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: 170, alignItems: 'center', paddingHorizontal: paddingHor, paddingVertical: paddingVer }} >
                                    <Image source={require("../assets/profile.png")} style={{ height: logoHeightWidth, width: logoHeightWidth }} />
                                    <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }} >Update Profile</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Button bgColor={busOrange} textColor='white' btnLabel="Logout" Press={() => { firebase.auth().signOut() }} />
                        </View>
                    </View>
                </View>
            </Background>
        );
    } else if (curUser.userType == '2') {
        return (
            <Background>
                {setWidth()}
                <View>
                    <View style={{ width: '100%', justifyContent: 'center', marginTop: 55, flexDirection: 'row' }}>
                        <Image source={require("../assets/userIcon.png")}
                            style={{ height: 70, width: 70, alignItems: 'center', borderRadius: 10 }}
                        />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{curUser.name} [staff]</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{curUser.email}</Text>
                                <Text style={{ color: busOrange }}>{emailVarified}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: 'white',
                        height: Dimensions.get('window').height,
                        width: w,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        marginTop: 20
                    }}>
                        <View style= {{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate("CheckRegStaff")} style = {{ width: 170, alignItems: 'center', paddingHorizontal: paddingHor, paddingVertical: paddingVer }} >
                                <Image source={require("../assets/registration.png")} style = {{ height: logoHeightWidth , width: logoHeightWidth}}/>
                                <Text style = {{paddingTop: 5, fontSize: 15, fontWeight: 'bold'}} >Check Registration</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: 170, alignItems: 'center', paddingHorizontal: paddingHor, paddingVertical: paddingVer }} >
                                <Image source={require("../assets/emergency.png")} style={{ height: logoHeightWidth, width: logoHeightWidth }} />
                                <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }} >Fined Students</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ width: 170, alignItems: 'center', paddingHorizontal: paddingHor, paddingVertical: paddingVer }} >
                                <Image source={require("../assets/location.png")} style={{ height: logoHeightWidth, width: logoHeightWidth }} />
                                <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }} >Location Share</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => props.navigation.navigate("LostFoundStaff")} style={{ width: 170, alignItems: 'center', paddingHorizontal: paddingHor, paddingVertical: paddingVer }} >
                                <Image source={require("../assets/lost-and-found.png")} style={{ height: logoHeightWidth, width: logoHeightWidth }} />
                                <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }} >Lost & Found </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ width: 170, alignItems: 'center', paddingHorizontal: paddingHor, paddingVertical: paddingVer }} >
                                <Image source={require("../assets/profile.png")} style={{ height: logoHeightWidth, width: logoHeightWidth }} />
                                <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: 'bold' }} >Update Profile</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Button bgColor={busOrange} textColor='white' btnLabel="Logout" Press={() => { firebase.auth().signOut() }} />
                        </View>
                    </View>
                </View>
            </Background>
        );
    } else if (curUser.userType == '1') {
        //props.navigation.navigate('Admin')
    }
};

export default Dashboard;
