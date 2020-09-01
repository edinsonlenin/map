import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import PlaceNavigator from "./navigation/PlaceNavigator";
import placesReducer from "./store/reducers/places";
import { init } from "./helpers/db";

export default function App() {
  init()
    .then(() => {
      console.log("Initialized database");
    })
    .catch((error) => {
      console.log("Initializing db failed.");
      console.log(error);
    });
    
  const rootReducer = combineReducers({
    places: placesReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <PlaceNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
