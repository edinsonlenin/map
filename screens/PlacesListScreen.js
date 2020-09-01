import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Platform,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { IoniconsHeaderButtons, Item } from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";
import * as actionsPlaces from '../store/actions/places'

const PlacesListScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IoniconsHeaderButtons>
          <Item
            title="Add Place"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => navigation.navigate("NewPlace")}
          />
        </IoniconsHeaderButtons>
      ),
    });
  }, [navigation]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionsPlaces.setPlaces());
  }, [dispatch]);

  const places = useSelector((state) => state.places.places);
  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlaceItem
            image={item.image}
            title={item.title}
            address={null}
            onSelect={() => navigation.navigate("PlaceDetail", {
              id: item.id,
              title: item.title
            })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlacesListScreen;
