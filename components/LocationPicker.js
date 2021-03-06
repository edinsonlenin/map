import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Colors from "../constants/colors";
import MapLocation from "./MapLocation";

const LocationPicker = ({ onSelectedLocation, navigation, locationMap }) => {
  const [location, setLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setLocation(locationMap);
  }, [locationMap]);

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    const error = "Sorry, we need camera roll permissions to make this work!";
    if (Platform.OS !== "web") {
      try {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (!status) {
          Alert.alert("Permissions Error", error, [{ text: "OK" }]);
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }
    return true;
  };

  const getLocationHandler = async () => {
    setIsFetching(true);
    try {
      const position = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setLocation(location);
      onSelectedLocation(location);
    } catch (err) {
      Alert.alert("Error", "Try again in a few moment", [{ text: "Ok" }]);
    }
    setIsFetching(false);
  };

  const setLocationHandler = () => {
    navigation.navigate('Map', {readOnly: false, pickedLocation: location});
  };

  return (
    <View style={styles.container}>
      <MapLocation location={location} style={styles.imageContainer} onPress={setLocationHandler}>
        {!isFetching ? (
          <Text>No location chosen yet!</Text>
        ) : (
          <ActivityIndicator size="large" color={Colors.primary} />
        )}
      </MapLocation>
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.save}
          title="Get User Location"
          onPress={getLocationHandler}
        />
        <Button
          style={styles.save}
          title="View Map"
          onPress={setLocationHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  imageContainer: {
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  save: {
    color: Colors.primary,
  },
});

export default LocationPicker;
