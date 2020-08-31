import React from "react";
import { View, StyleSheet, Text, Button, Platform } from "react-native";

import { IoniconsHeaderButtons, Item } from "../components/HeaderButton";

const PlacesListScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IoniconsHeaderButtons>
          <Item
            title="Add Place"
            iconName={Platform.OS === 'android' ? "md-add" : "ios-add"}
            onPress={() => navigation.navigate('NewPlace')}
          />
        </IoniconsHeaderButtons>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>Places List </Text>
      <Button
        title="Go to details"
        onPress={() =>
          navigation.navigate("PlaceDetail", { name: "Details using params" })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlacesListScreen;
