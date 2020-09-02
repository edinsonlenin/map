import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

import { insertPlace, fetchPlaces } from "../../helpers/db";
import ENV from "../../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const setPlaces = () => {
  return async (dispatch) => {
    const result = await fetchPlaces();
    return dispatch({ type: SET_PLACES, payload: result.rows._array });
  };
};
export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    try {
      const uri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${ENV.googleApiKey}`;
      // console.log(uri);
      const response = await fetch(uri);

      const resData = await response.json();
      // if (resData.status !== 'OK') {
      //   throw new Error("Something went wrong");
      // }
      // console.log(resData);
      if (!resData) {
        throw new Error("Something went wrong");
      }

      const address = resData.results[0].formatted_address;
      console.log(address), '------------------------------------------------------------';

      const nameFile = image.split("/").pop();
      const newPath = FileSystem.documentDirectory + nameFile;
      if (Platform.OS !== "web") {
        await FileSystem.moveAsync({
          from: image,
          to: newPath,
        });

        const result = await insertPlace(
          title,
          newPath,
          address,
          location.latitude,
          location.longitude
        );
        return dispatch({
          type: ADD_PLACE,
          payload: {
            id: result.insertId,
            title,
            image: newPath,
            address,
            latitude: location.latitude,
            longitude: location.longitude,
          },
        });
      }
    } catch (error) {
      throw error;
    }
  };
};
