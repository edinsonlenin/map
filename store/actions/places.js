import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

import { insertPlace, fetchPlaces } from '../../helpers/db';

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const setPlaces = () => {
  return async dispatch => {
    const result = await fetchPlaces();
    return dispatch({type: SET_PLACES, payload: result.rows._array});
    
  };
};
export const addPlace = (title, image, longitude, latitude) => {
  return async dispatch => {
    const nameFile = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + nameFile;
    if (Platform.OS !== 'web'){
      try {
        await FileSystem.moveAsync({
          from: image,
          to: newPath
        });

        const result = await insertPlace(title, newPath, 'dummy adrress', latitude, longitude);
        return dispatch({
          type: ADD_PLACE,
          payload: {
            id: result.insertId,
            title,
            image: newPath
          },
        })
      }
      catch(error){
        throw error;
      }
    }
    
    
  };
};
