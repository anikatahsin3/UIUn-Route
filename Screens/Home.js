import React from 'react';
import {View, Text, Image} from 'react-native';
import Background from '../Components/Background';
import Button from '../Components/Button';
import { busOrange, transGray} from '../Components/Constants';

const Home = (props) => {
    return (
        <Background>
            <View style = {{ marginVertical: 140, marginRight: 30 }} >
                <Image source={require("../assets/logo.png")}
                    style = {{ height: 150 , width: 250, alignItems: 'center', marginTop: 40, opacity: 1}}
                />
                <Text style = {{ color: 'black', fontSize: 54}} >Let's start</Text>
                <Text style = {{ color: 'black', fontSize: 34, marginBottom: 40}} >the journey...</Text>
                <Button bgColor={busOrange} textColor='white' btnLabel="Login" Press={() =>
                props.navigation.navigate('Login')}/>
                <Button bgColor={transGray} textColor={busOrange} btnLabel="Sign Up"  Press={() =>
                props.navigation.navigate('Signup')}/>
            </View>
        </Background>
    );
}

export default Home;