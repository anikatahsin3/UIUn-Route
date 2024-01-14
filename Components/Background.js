import React from 'react';
import { View, ImageBackground, StatusBar } from 'react-native';

const Background = ({children}) => {
    return (
        <View style = {{ flex: 1, alignItems: 'center'}}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
            <ImageBackground
                resizeMode='cover'
                source = { require("../assets/homebg.png")}
                style = {{height:'100%', width:'100%', opacity: .4 }}>
            </ImageBackground>
            <View style = {{ position: "absolute" }}>
                {children}
            </View>

        </View>
    );
}

export default Background;