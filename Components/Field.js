import React from 'react';
import { TextInput } from 'react-native';

const Field = (props) => {
    return (
        <TextInput {...props} style={{
            alignItems: "center",
            borderRadius: 13,
            color: 'black',
            paddingHorizontal: 20,
            height: 43,
            width: '78%',
            backgroundColor: 'rgb(220, 220, 220)',
            marginVertical: 10,
            fontSize: 15
        }}
            placeholderTextColor='black'>
        </TextInput>
    );
}

export default Field;