import { FlatList, StyleSheet, Text, View } from "react-native";
import NatureItem from "./NatureItem"; // Import NatureItem component
import { Colors } from "../../constants/colors"; // Import Colors constant
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook from React Navigation

// NatureList component
function NatureList({ nature, deleteNature }) {
  const navigation = useNavigation(); // Get navigation object from useNavigation hook

  // Function to handle selecting a nature item
  function selectNatureHandler(id) {
    navigation.navigate("NatureDetails", {
      natureId: id,
    });
  }

  // Render the component
  if (!nature || nature.length === 0) {
    // Render fallback message if there are no nature items
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No Posts Added Yet, Start Adding Some.
        </Text>
      </View>
    );
  }

  // Render FlatList to display nature items
  return (
    <FlatList
      data={nature}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <NatureItem
          nature={item}
          onSelect={selectNatureHandler}
          onDelete={deleteNature}
        />
      )}
    />
  );
}

// Export the NatureList component as the default export
export default NatureList;

// Styles for the NatureList component
const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
});
