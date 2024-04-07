import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import Btn from "../UI Design/Btn";

// UpdateForm component
function UpdateForm({ onUpdateNature, existingNature }) {
  // State for managing the title input
  const [title, setTitle] = useState(existingNature?.title || "");

  // Function to handle changes in the title input
  const changeTitleHandler = (enteredTitle) => {
    setTitle(enteredTitle);
  };

  // Function to handle the update nature action
  const updateNatureHandler = () => {
    // Create an updated nature object with the new title
    const updatedNature = { ...existingNature, title: title };
    // Call the onUpdateNature function with the updated nature object
    onUpdateNature(updatedNature);
  };

  // Render the component
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={title}
        />
      </View>
      {/* Button to trigger the update nature action */}
      <Btn onPress={updateNatureHandler}>Update Title</Btn>
    </ScrollView>
  );
}

// Export the UpdateForm component as the default export
export default UpdateForm;

// Styles for the UpdateForm component
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
    borderColor: "black",
    borderWidth: 2,
  },
});
