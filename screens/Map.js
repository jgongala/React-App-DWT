import React, { useState, useLayoutEffect, useCallback } from "react";
import { StyleSheet, Alert } from "react-native";
import SymbolButton from "../components/UI Design/SymbolButton"; // Import SymbolButton component
import MapView, { Marker } from "react-native-maps";

function Map({ route, navigation }) {
  // Extract initial location from route params
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  // State to store selected location
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  // Define the initial region for the map
  const region = {
    latitude: initialLocation ? initialLocation.lat : 54.9783,
    longitude: initialLocation ? initialLocation.lng : -1.6174,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Function to handle selection of location on the map
  function selectLocationHandler(event) {
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  // Function to handle saving the picked location
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location picked! Pick your location by tapping on a map");
      return;
    }

    // Navigate to "Add Nature" screen and pass picked latitude and longitude
    navigation.navigate("Add Nature", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  // Update header with save button using useLayoutEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <SymbolButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  // Render MapView with markers
  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

// Styles for the component
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
