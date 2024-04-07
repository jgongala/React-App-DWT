import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors"; // Import Colors constant

// Btn component to create a custom button
function Btn({ onPress, children }) {
  return (
    // Pressable component to create a touchable button
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]} // Apply styles based on pressed state
      onPress={onPress} // Handle onPress event
    >
      {/* Text component to display button text */}
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

// Export the Btn component as the default export
export default Btn;

// Styles for the Btn component
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
  text: {
    color: Colors.accents, // Text color
    fontSize: 16, // Font size
    fontWeight: "bold", // Bold font weight
    letterSpacing: 1, // Letter spacing
    textAlign: 'center' // Center align text horizontally
  },
});