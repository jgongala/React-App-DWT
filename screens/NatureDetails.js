// Import necessary modules and components
import React from "react";
import { ScrollView, Image, View, StyleSheet, Text } from "react-native";
import MainButton from "../components/UI Design/MainButton"; // Import MainButton component
import { Colors } from "../constants/colors"; // Import colors constant
import { useEffect, useState } from "react"; // Import useEffect and useState hooks
import { fetchNatureDetails } from "../util/db"; // Import fetchNatureDetails function from util/db

function NatureDetails({ route, navigation }) {
  // State variable to store fetched nature data
  const [fetchedNature, setFetchedNature] = useState();

  // Function to navigate to the map screen
  function showMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedNature.location.lat, // Pass initial latitude to map screen
      initialLng: fetchedNature.location.lng, // Pass initial longitude to map screen
    });
  }

  // Extract the selectedNatureId from the route params
  const selectedNatureId = route.params.natureId;

  // useEffect to fetch nature details when the component mounts or selectedNatureId changes
  useEffect(() => {
    async function loadedNatureData() {
      // Fetch nature details
      const nature = await fetchNatureDetails(selectedNatureId);
      // Set fetchedNature state with fetched data
      setFetchedNature(nature);
      navigation.setOptions({
        // Set navigation title to nature title
        title: nature.title,
      });
    }
    // Call the function to load nature data
    loadedNatureData();
    // Reload nature details when selectedNatureId changes
  }, [selectedNatureId]);

  // Render loading message if fetchedNature is not available
  if (!fetchedNature) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Place Data ...</Text>
      </View>
    );
  }

  // Render nature details
  return (
    <ScrollView>
      {/* Display nature image */}
      <Image style={styles.image} source={{ uri: fetchedNature.imageUri }} />

      {/* Display nature location information */}
      <View style={styles.location}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedNature.address}</Text>
        </View>
        {/* Button to view nature location on map */}
        <MainButton icon="map" onPress={showMapHandler}>
          View on map
        </MainButton>
      </View>
    </ScrollView>
  );
}

export default NatureDetails;

// Styles for the component
const styles = StyleSheet.create({
  image: {
    height: "35",
    minHeight: 300,
    width: "100%",
  },
  location: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: "center",
    fontSize: 20,
    letterSpacing: 1,
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
