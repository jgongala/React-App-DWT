import React, { useState, useEffect } from "react";
import { ScrollView, View, TextInput, StyleSheet, Text } from "react-native";
import { updateNature, fetchNatureDetails } from "../util/db"; // Import functions from util/db
import { useNavigation, useRoute } from "@react-navigation/native";
import MainButton from "../components/UI Design/MainButton";
import { Colors } from "../constants/colors";

function UpdateNature({ route, navigation }) {
  // State variables for title, fetchedNature, and loading status
  const [title, setTitle] = useState("");
  const [fetchedNature, setFetchedNature] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Extract the selectedNatureId from the route params
  const selectedNatureId = route.params.natureId;

  // useEffect to fetch nature details when the component mounts or selectedNatureId changes
  useEffect(() => {
    async function loadedNatureData() {
      try {
        // Fetch nature details based on selectedNatureId
        const nature = await fetchNatureDetails(selectedNatureId);
        // Log fetched nature details
        console.log("Fetched Nature:", nature);
        // Set fetchedNature state
        setFetchedNature(nature);
        // Set the initial title
        setTitle(nature.title);
        // Set isLoading to false
        setIsLoading(false);
        navigation.setOptions({
          // Set navigation title to nature title
          title: nature.title,
        });
      } catch (error) {
        // Log error if fetching fails
        console.error("Error fetching nature details:", error);
        // Set isLoading to false
        setIsLoading(false);
      }
    }
    // Call the function to load nature data
    loadedNatureData();
    // Run useEffect when selectedNatureId changes
  }, [selectedNatureId]);

  // Function to handle updating the title
  const updateTitleHandler = async () => {
    try {
      // Update the nature title
      await updateNature({ ...fetchedNature, title: title });
      // Navigate back
      navigation.goBack();
    } catch (error) {
      // Log error if updating fails
      console.error("Error updating title:", error);
    }
  };

  // Render loading message if isLoading is true
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading Place Data ...</Text>
      </View>
    );
  }

  // Render error message if fetchedNature is null
  if (!fetchedNature) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: Nature data not found</Text>
      </View>
    );
  }

  // Render the update form
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          // Handle text input changes
          onChangeText={setTitle}
          // Set input value
          value={title}
        />
        <MainButton onPress={updateTitleHandler}>Update Title</MainButton>
      </View>
    </ScrollView>
  );
}

export default UpdateNature;

// Styles for the component
const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    marginBottom: 4,
    fontSize: 20,
    color: Colors.primary,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
