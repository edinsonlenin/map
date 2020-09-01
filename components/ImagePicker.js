import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image, Platform, Alert } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from 'expo-permissions';
import Colors from "../constants/colors";

const ImgPicker = (props) => {
  const [image, setImage] = useState();

  getPermissionAsync = async () => {
    const error = 'Sorry, we need camera roll permissions to make this work!';
    if (Platform.OS !== 'web') {
      const status = false;
      const { statusCamera } = await Permissions.askAsync(Permissions.CAMERA);
      const { statusCameraRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (Platform.OS === 'android' || (Platform.OS === 'ios' && Platform.Version >= 10)) {
        status = statusCamera && statusCameraRoll;
      } 
      else {
        status = statusCamera;
      }
      if (status !== 'granted') {
        Alert.alert('Permissions Error', error, [{text: 'OK'}]);
      }
      return false;
    }
    return true;
  };

  const takePhotoHandler = async () => {
    const isGrantedPermissions = await getPermissionAsync();
    if (!isGrantedPermissions) return;
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  <View style={styles.container}>
    <View style={styles.imageContainer}>
      {!image ? (
        <Text>No image, take one</Text>
      ) : (
        <Image style={styles.image} source={{ uri: image }} />
      )}
    </View>
    <Button style={styles.save} title="Take" onPress={takePhotoHandler} />
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 400
  },
  image: {
    width: '100%',
    height: '100%'
  },
  save: {
    color: Colors.primary
  }
});

export default ImgPicker;
