import React from "react";
import { Image, Pressable, View, StyleSheet, Text } from "react-native";
import SymbolButton from "../UI Design/SymbolButton"; // Import SymbolButton component
import { Colors } from "../../constants/colors"; // Import Colors constant
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook from React Navigation
import MainButton from "../UI Design/MainButton"; // Import MainButton component

// NatureItem component
function NatureItem({ nature, onSelect, onDelete }) {
  const navigation = useNavigation(); // Get navigation object from useNavigation hook

  // Function to handle edit button press
  const handleEditPress = () => {
    // Navigate to the update screen and pass the nature object as a parameter
    navigation.navigate("UpdateNature", { natureId: nature.id });
  };

  // Render the NatureItem component
  return (
    <Pressable onPress={() => onSelect(nature.id)} style={styles.container}>
      {/* Render nature image */}
      <Image style={styles.image} source={{ uri: nature.imageUri }} />

      {/* Render nature information */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{nature.title}</Text>
        <Text style={styles.address}>{nature.address}</Text>
      </View>

      {/* Render buttons for edit and delete */}
      <View style={styles.buttonContainer}>
        {/* Edit button */}
        <SymbolButton
          icon="pencil"
          size={24}
          color={Colors.primary}
          onPress={handleEditPress}
        />

        {/* Delete button */}
        <SymbolButton
          icon="trash"
          size={24}
          color={Colors.primary}
          onPress={() => onDelete(nature.id)}
        />
      </View>
    </Pressable>
  );
}

// Export the NatureItem component as the default export
export default NatureItem;

// Styles for the NatureItem component
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    position: "relative",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  address: {
    color: "#888",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    flexDirection: "row",
  },
});
