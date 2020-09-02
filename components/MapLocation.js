import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import ENV from '../env';

const MapLocation = ({children, location, style}) => {
  let locationImageUrl;
  console.log(location);
  if (location) {
    locationImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${location.latitude},${location.longitude}&key=${ENV.googleApiKey}`;
  };
  console.log(locationImageUrl);
  
  return (
    <View style={{...styles.imageContainer, ...style} }>
      {location ? <Image source={{uri: locationImageUrl}} style={styles.image} /> : children}
      </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default MapLocation;