import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

function MainButton({ onPress, icon, children }) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={icon} />
      <Text> {children} </Text>
    </Pressable>
  );
}

export default MainButton;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
