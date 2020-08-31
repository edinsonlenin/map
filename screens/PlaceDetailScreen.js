import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

const PlaceDetailScreen = ({ navigation, route }) => {
  const { id, title } = route.params;
  const place = useSelector(state => state.places.places.find(place => place.id === id));
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>{place.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  }
});

export default PlaceDetailScreen;