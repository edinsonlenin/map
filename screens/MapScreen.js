import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../constants/colors";

const MapScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map Screen {Colors.primary}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: Colors.primary,
    fontSize: 30
  },
});

export default MapScreen;
