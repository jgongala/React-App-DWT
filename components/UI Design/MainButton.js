import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo vector icons
import { Colors } from "../../constants/colors"; // Import Colors constant

// MainButton component to create a button with an icon and text
function MainButton({ onPress, icon, children }) {
  return (
    // Pressable component to create a touchable button
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]} // Apply styles based on pressed state
      onPress={onPress} // Handle onPress event
    >
      {/* Ionicons component to display icon */}
      <Ionicons style={styles.icon} name={icon} />

      {/* Text component to display button text */}
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

// Export the MainButton component as the default export
export default MainButton;

// Styles for the MainButton component
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12, // Horizontal padding
    paddingVertical: 6, // Vertical padding
    margin: 4, // Margin
    flexDirection: "row", // Horizontal layout
    justifyContent: "center", // Center align content horizontally
    alignItems: "center", // Center align content vertically
    borderWidth: 2, // Border width
    backgroundColor: Colors.primary, // Background color
    borderColor: Colors.primary, // Border color
  },
  pressed: {
    opacity: 0.7, // Decrease opacity when button is pressed
  },
  icon: {
    marginRight: 6, // Right margin
    color: Colors.accents, // Icon color
    fontSize: 16, // Font size
  },
  text: {
    color: Colors.accents, // Text color
    fontSize: 16, // Font size
    fontWeight: "bold", // Bold font weight
    letterSpacing: 1, // Letter spacing
  },
});