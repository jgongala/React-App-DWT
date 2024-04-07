import React, { useEffect, useState } from "react";
import { Alert, View, StyleSheet, Image, Text } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location"; // Import functions and hooks from expo-location
import { Colors } from "../../constants/colors"; // Import Colors constant
import MainButton from "../UI Design/MainButton"; // Import MainButton component
import Map from "../../screens/Map"; // Import Map component
import { getMapPreview, getAddress } from "../../util/location"; // Import location-related utility functions
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"; // Import navigation-related hooks

// LocationPicker component
function LocationPicker({onLocation}) {
  // State for storing picked location
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused(); // Hook to check if the screen is focused

  // Navigation and route hooks
  const navigation = useNavigation();
  const route = useRoute();

  // Permission related hooks
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  // Effect hook to update picked location when the screen is focused and params are passed
  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  // Effect hook to handle location-related actions
  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onLocation({...pickedLocation, address: address});
      }
    }
    handleLocation();
  }, [onLocation, pickedLocation]);

  // Function to verify location permissions
  async function verifyPermissions() {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permission denied.",
        "You need to allow location permissions."
      );
      return false;
    }
    return true;
  }

  // Function to handle getting current location
  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  // Function to handle picking location
  function pickLocationHandler() {
    navigation.navigate('Map');
  }

  // Variable to hold location preview JSX
  let locationPreview = <Text>No location picked</Text>;

  // Display location preview if location is picked
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.mapPreviewImage}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  // Render LocationPicker component
  return (
    <View>
      {/* Location preview */}
      <View style={styles.mapPreview}>{locationPreview}</View>
      {/* Action buttons */}
      <View style={styles.actions}>
        <MainButton icon="map" onPress={pickLocationHandler}>
          Pick location
        </MainButton>
        <MainButton icon="location" onPress={getLocationHandler}>
          Locate User
        </MainButton>
      </View>
    </View>
  );
}

// Export the LocationPicker component as the default export
export default LocationPicker;

// Styles for the LocationPicker component
const styles = StyleSheet.create({
  mapPreview: {
    marginVertical: 8,
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapPreviewImage: {
    width: "100%",
    height: "100%",
    borderColor: Colors.primary,
    borderWidth: 2,
  },
});