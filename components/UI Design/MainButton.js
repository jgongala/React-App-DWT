import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

function MainButton({ onPress, icon, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons style={styles.icon} name={icon} />
      <Text style={styles.text}> {children} </Text>
    </Pressable>
  );
}

export default MainButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
    color: Colors.accents,
    fontSize: 16,
  },
  text: {
    color: Colors.accents,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
