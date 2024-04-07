import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NatureLog from "./screens/NatureLog";
import Map from "./screens/Map";
import AddNature from "./screens/AddNature";
import UpdateNature from "./screens/UpdateNature";
import NatureDetails from "./screens/NatureDetails";
import SymbolButton from "./components/UI Design/SymbolButton";
import { Colors } from "./constants/colors";
import { init } from "./util/db";
import * as SplashScreen from "expo-splash-screen"; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitilized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitilized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    async function prepareApp() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepareApp();
  }, []);

  if (!dbInitialized) {
    return null;
  }

  SplashScreen.hideAsync();

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
            name="NatureLog"
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
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              title: "Map",
            }}
          />
          <Stack.Screen
            name="NatureDetails"
            component={NatureDetails}
            options={{
              title: "Loading Place...",
            }}
          />
          <Stack.Screen
            name="UpdateNature"
            component={UpdateNature}
            options={{
              title: "Update Nature",
            }}
          />          
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
