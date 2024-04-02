import { Image, Pressable, View, StyleSheet } from "react-native";

function NatureItem({ natureItem, onSelect }) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: natureItem.imateUri }} />
      <View>
        <Text>{natureItem.title}</Text>
        <Text>{natureItem.address}</Text>
      </View>
    </Pressable>
  );
}

export default NatureItem;

const styles = StyleSheet.create({});
