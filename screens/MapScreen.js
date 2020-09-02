import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import MapView, { Marker } from 'react-native-maps';

import Colors from "../constants/colors";

const MapScreen = ({navigation, route}) => {
  const { pickedLocation } = route.params || {};
  const [selectedLocation, setSelectedLocation] = useState();
  const saveHandler = () => {
    if (selectedLocation) {
      navigation.navigate("NewPlace", {pickedLocation: selectedLocation})
    };
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.save} onPress={saveHandler}>
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, selectedLocation]);

  useEffect(() => {
    if (pickedLocation) {
      setSelectedLocation(pickedLocation);
    }
  }, [route.params]);

  const initialRegion = {
    latitude: pickedLocation ? pickedLocation.latitude : -11.9289,
    longitude: pickedLocation ? pickedLocation.longitude :-77.040,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectedLocationHandler = (region) => {
    //setRegion({latitude: region.nativeEvent.coordinate.latitude, longitude: region.nativeEvent.coordinate.longitude});
    setSelectedLocation(region.nativeEvent.coordinate);
  };

  
  return (
    <MapView style={styles.container} initialRegion={initialRegion} onPress={selectedLocationHandler}>
      {selectedLocation && <Marker title="Location Selected" coordinate={selectedLocation} />}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
    fontSize: 18
  },
  save: {
    marginHorizontal: 15
  }
});

export default MapScreen;
