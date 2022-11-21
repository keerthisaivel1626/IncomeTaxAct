import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SectionScreen from "./screens/SectionScreen";
import Check from "./screens/Check";
import SectionDetailScreen from "./screens/SectionDetailScreen";
import SectionInfo from "./components/SectionInfo";
import { navigationRef } from "./RootNavigation";
import AboutUs from "./screens/AboutUs";
const Stack = createStackNavigator();

function Nav() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Section" component={SectionScreen} />
        <Stack.Screen name="SectionDetail" component={SectionDetailScreen} />
        <Stack.Screen name="About" component={AboutUs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;
