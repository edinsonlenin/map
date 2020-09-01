import React from 'react';
import { HeaderButton, HeaderButtons } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import Colors from "../constants/colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "ios" ? "white" : Colors.primary}
    />
  );
};

export const IoniconsHeaderButtons = (props) => (
  <HeaderButtons
    HeaderButtonComponent={CustomHeaderButton}
    {...props}
  ></HeaderButtons>
);

export { Item } from "react-navigation-header-buttons";
