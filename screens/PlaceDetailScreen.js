import React from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";

import Colors from '../constants/colors';
import MapLocation from "../components/MapLocation";

const PlaceDetailScreen = ({ navigation, route }) => {
  const { id, title } = route.params;
  const place = useSelector((state) =>
    state.places.places.find((place) => place.id === id)
  );
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation]);
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <MapLocation
          style={styles.mapPreview}
          onPress={() => {navigation.navigate('Map'), {readOnly: true, location: {latitude: place.latitude, longitude: place.longitude}}}}
          location={{ latitude: place.latitude, longitude: place.logitude }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetailScreen;
