import React from "react";
import { View } from "react-native";
import {
  MapScreen,
  NewPlaceScreen,
  PlaceDetailScreen,
  PlacesListScreen,
} from "../screens";

export const Page = MapScreen;

export default () => (
  <View>
    <MapScreen />
    <NewPlaceScreen />
    <PlaceDetailScreen />
    <PlacesListScreen />
  </View>
);
