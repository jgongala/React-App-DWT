// Import necessary modules and components
import NatureList from "../components/Nature/NatureList";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { fetchNature, deleteNature } from "../util/db"; // Import functions from util/db
import NatureItem from "../components/Nature/NatureItem";

function NatureLog() {
  // State variables for loadedNature and isFocused
  // State to store loaded nature data
  const [loadedNature, setLoadedNature] = useState([]);
  // Hook to detect if the screen is focused
  const isFocused = useIsFocused();

  // useEffect to load nature data when the component mounts or isFocused changes
  useEffect(() => {
    const loadNature = async () => {
      // Fetch nature data from the database
      const nature = await fetchNature();
      // Set loadedNature state with fetched data
      setLoadedNature(nature);
    };
    // Call the function to load nature data
    loadNature();
    // Reload nature data when the screen is focused
  }, [isFocused]);

  // Function to handle deletion of a nature item
  const handleDeleteNature = async (id) => {
    try {
      // Delete nature item from the database
      await deleteNature(id);
      // Filter out deleted item from loadedNature
      const updatedNature = loadedNature.filter((item) => item.id !== id);
      // Update loadedNature state with filtered data
      setLoadedNature(updatedNature);
    } catch (error) {
      // Log error if deletion fails
      console.error("Error deleting nature item:", error);
    }
  };

  // Render NatureList component with loaded nature data and deleteNature function
  return <NatureList nature={loadedNature} deleteNature={handleDeleteNature} />;
}

export default NatureLog;

// Styles for the component (empty for now)
const styles = StyleSheet.create({});
