import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const R2SScreen = () => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [coordinates, setCoordinates] = useState([
    { latitude: 37.78825, longitude: -122.4324 },
    { latitude: 37.75825, longitude: -122.4624 },
    { latitude: 37.74825, longitude: -122.4824 },
    { latitude: 37.75825, longitude: -122.4524 },
    { latitude: 37.77825, longitude: -122.4324 },
  ]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {coordinates.map((coordinate, index) => (
          <Marker key={index} coordinate={coordinate} title={`Point ${index + 1}`} />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default R2SScreen;
