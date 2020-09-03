import React from "react";
import { View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  MapScreen,
  NewPlaceScreen,
  PlaceDetailScreen,
  PlacesListScreen,
} from "../screens";
import Colors from "../constants/colors";

const stack = createStackNavigator();

const defaultOptionsNavigation = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const navigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={defaultOptionsNavigation} initialRouteName="PlaceList">
        <stack.Screen
          name="PlacesList"
          component={PlacesListScreen}
          options={{ title: "All Places" }}
        />
        <stack.Screen
          name="NewPlace"
          component={NewPlaceScreen}
          options={{ title: 'Add Place' }}
        />
        <stack.Screen
          name="PlaceDetail"
          component={PlaceDetailScreen}
        />
        <stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: "Map" }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default navigator;
