import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NatureLog from "./screens/NatureLog";
import AddNature from "./screens/AddNature";
import SymbolButton from "./components/UI Design/SymbolButton";
import { Colors } from "./constants/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: Colors.primary,
          }}
        >
          <Stack.Screen
            name="Nature Log"
            component={NatureLog}
            options={({ navigation }) => ({
              title: "Nature Log",
              headerRight: () => (
                <SymbolButton
                  icon="add"
                  size={24}
                  color={Colors.primary}
                  onPress={() => navigation.navigate("Add Nature")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Add Nature"
            component={AddNature}
            options={{
              title: "Add a new post",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
