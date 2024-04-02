import React, { useState } from "react";
import { Alert, View, StyleSheet, Image, Text } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { Colors } from "../../constants/colors";
import MainButton from "../UI Design/MainButton";
import { getMapPreview } from "../../util/location";

function LocationPicker({}) {
  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
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

  async function getLocationHandler() {
    const response = await verifyPermissions();

    if (!response) {
      return;
    }
    const currentLocation = await getCurrentPositionAsync();
    setPickedLocation({
      lat: currentLocation.coords.latitude,
      lng: currentLocation.coords.longitude,
    });
  }

  function pickLocationHandler() {}

  let locationPreview = <Text>No location picked</Text>;

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

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
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

export default LocationPicker;

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
