import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker"; // Import ImagePicker component
import LocationPicker from "./LocationPicker"; // Import LocationPicker component
import Btn from "../UI Design/Btn"; // Import Btn component
import { Nature } from "../../models/nature"; // Import Nature model

// NatureForm component
function NatureForm({ onCreateNature }) {
  // State variables
  // State for entered title
  const [enteredTitle, setEnteredTitle] = useState("");
  // State to track input focus
  const [isFocused, setIsFocused] = useState(false);
  // State for picked location
  const [pickedLocation, setPickedLocation] = useState();
  // State for selected image
  const [selectedImage, setSelectedImage] = useState();

  // Function to handle title input change
  function changeTitleHandler(enteredTitle) {
    setEnteredTitle(enteredTitle);
  }

  // Function to handle image selection
  function imageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  // Callback function to handle location selection
  const locationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  // Function to handle saving post
  function savePostHandler() {
    // Create a new Nature object with entered title, selected image, and picked location
    const nature = new Nature(enteredTitle, selectedImage, pickedLocation);
    // Call onCreateNature function with the created Nature object
    onCreateNature(nature);

    // Provide feedback to the user that the post has been saved
    Alert.alert("Post Saved", "Your post has been successfully saved.");
  }

  // Render the NatureForm component
  return (
    <ScrollView style={styles.form}>
      {/* Title input */}
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: isFocused ? Colors.hover : Colors.primary },
          ]}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>

      {/* Image picker */}
      <ImagePicker onImage={imageHandler} />

      {/* Location picker */}
      <LocationPicker onLocation={locationHandler} />

      {/* Button to add post */}
      <Btn onPress={savePostHandler}>Add Post</Btn>
    </ScrollView>
  );
}

// Export the NatureForm component as the default export
export default NatureForm;

// Styles for the NatureForm component
const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    marginBottom: 4,
    fontSize: 20,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
});
