import React from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Button } from 'react-native';
import { Colors } from '../constants/colors';

const NewPlaceScreen = props => {
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>New Place</Text>
        <TextInput style={styles.text}/>
        <Button title="Save Place" onPress={() => {}} style={styles.save} />
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
    marginBottom: 15
  },
  text: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  },
  save: {
    color: Colors.primary
  }

});

export default NewPlaceScreen;