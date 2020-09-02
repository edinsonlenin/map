import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Platform,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Colors from "../constants/colors";

const ImgPicker = ({ onSelectedImage }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    const error = "Sorry, we need camera roll permissions to make this work!";
    if (Platform.OS !== "web") {
      let status = false;
      const { status: statusCamera } = await Permissions.askAsync(
        Permissions.CAMERA
      );
      const { status: statusCameraRoll } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );
      if (
        Platform.OS === "android" ||
        (Platform.OS === "ios" && Platform.Version >= 10)
      ) {
        status = statusCamera === "granted" && statusCameraRoll === "granted";
      } else {
        status = statusCamera === "granted";
      }
      if (!status) {
        Alert.alert("Permissions Error", error, [{ text: "OK" }]);
        return false;
      }
    }
    return true;
  };

  const takePhotoHandler = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
      onSelectedImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {!image ? (
          <Text>No image, take one</Text>
        ) : (
          <Image style={styles.image} source={{ uri: image }} />
        )}
      </View>
      <Button style={styles.save} title="Take Image" onPress={takePhotoHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 250,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  save: {
    color: Colors.primary,
  },
});

export default ImgPicker;
