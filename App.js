import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SelectionScreen from "./src/screens/SelectionScreen";
import MatchScreen from "./src/screens/MatchScreen";
import WinnerScreen from "./src/screens/WinnerScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Seleccion">
        <Stack.Screen name="Seleccion" component={SelectionScreen} options={{ title: "NBA JAM RETRO" }} />
        <Stack.Screen name="Partido" component={MatchScreen} options={{ title: "Match Screen" }} />
        <Stack.Screen name="Ganador" component={WinnerScreen} options={{ title: "Winner Screen" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
