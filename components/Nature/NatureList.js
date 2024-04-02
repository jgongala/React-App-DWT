import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import NatureItem from "./NatureItem";
import { Colors } from "../../constants/colors";

function NatureList({ nature }) {
  if (!nature || nature.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No posts added yet - add your first post
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={nature}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NatureItem natureItem={item} />}
    />
  );
}

export default NatureList;

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
