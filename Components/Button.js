import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


export default function Button({ bgColor, btnLabel, textColor, Press }) {
    return (
        <TouchableOpacity
            onPress={Press}
            style={{
                backgroundColor: bgColor,
                borderRadius: 13,
                alignItems: 'center',
                width: 170,
                paddingVertical: 5,
                marginVertical: 10
            }}>

            <Text style={{
                color: textColor,
                fontSize: 22,
                fontWeight: 'bold'
            }} >
                {btnLabel}
            </Text>

        </TouchableOpacity>
    )
}