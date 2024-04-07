import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo vector icons

// SymbolButton component to create a button with an icon
function SymbolButton({ icon, size, color, onPress }) {
  return (
    // Pressable component to create a touchable button
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]} // Apply styles based on pressed state
      onPress={onPress} // Handle onPress event
    >
      {/* Ionicons component to display icon */}
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

// Export the SymbolButton component as the default export
export default SymbolButton;

// Styles for the SymbolButton component
const styles = StyleSheet.create({
  button: {
    padding: 8, // Padding
    margin: 4, // Margin
    justifyContent: "center", // Center align content horizontally
    alignItems: "center", // Center align content vertically
  },
  pressed: {
    opacity: 0.7, // Decrease opacity when button is pressed
  },
});