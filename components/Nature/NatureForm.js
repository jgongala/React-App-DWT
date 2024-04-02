import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function NatureForm() {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  function changeTitleHandler(enteredTitle) {
    setEnteredTitle(enteredTitle);
  }

  return (
    <ScrollView style={styles.form}>
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
    </ScrollView>
  );
}

export default NatureForm;

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
