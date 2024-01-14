import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Image, Button } from 'react-native';

const StudentLocation = (props) =>{
  
    const [latitude1, setlat] = useState(23.750871) ;
    const [longitude1, setlong] = useState(90.4033241);

    return (
    <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={{
          latitude: latitude1,
          longitude: longitude1,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}  
        >
    <Marker
            coordinate={{
            latitude: latitude1,
            longitude: longitude1,}}
            pinColor = {"purple"}
    />
  </MapView>
    <Button
    onPress={()=>{props.navigation.navigate('Dashboard')}}
    title="GO BACK"
    color="#841584"
    />
    <Button
    onPress={()=>{props.navigation.navigate('StudentLocation')}}
    title="REFRESH"
    color="#841584"
    />
    </View>

  );
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      flex: 1,
    },
    map: {
      width: '100%',
      height: '90%',
    },
  });

export default StudentLocation