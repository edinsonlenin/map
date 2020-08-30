import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const PlacesListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Places List </Text>
      <Button title="Go to details" onPress={() => navigation.navigate('PlaceDetail', {name: 'Details using params'})}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlacesListScreen;
