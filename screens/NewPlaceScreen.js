import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import Colors from "../constants/colors";
import { useDispatch } from 'react-redux';

import * as actionsPlaces from '../store/actions/places';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = ({navigation}) => {
  const [titleValue, setTitleValue] = useState("");
  const [location, setLocation] = useState();
  const titleChangeHandler = (value) => {
    setTitleValue(value);
  };
  const selectedLocationHandler = (location) => {
    setLocation(location);
  };
  const dispatch = useDispatch();
  const savePlaceHandler = async () => {
    dispatch(await actionsPlaces.addPlace(titleValue, image, location.longitude, location.latitude));
    navigation.goBack();
  };
  const [image, setImage] = useState();
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>New Place</Text>
        <TextInput
          style={styles.text}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onSelectedImage={image => setImage(image)} />
        <LocationPicker onSelectedLocation={selectedLocationHandler} />
        <Button title="Save Place" onPress={savePlaceHandler}  style={styles.save} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  text: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  save: {
    color: Colors.primary,
  },
});

export default NewPlaceScreen;
