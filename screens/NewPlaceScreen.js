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

const NewPlaceScreen = ({navigation}) => {
  const [titleValue, setTitleValue] = useState("");
  const titleChangeHandler = (value) => {
    setTitleValue(value);
  };
  const dispatch = useDispatch();
  const savePlaceHandler = () => {
    dispatch(actionsPlaces.addPlace(titleValue));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>New Place</Text>
        <TextInput
          style={styles.text}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker />
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
