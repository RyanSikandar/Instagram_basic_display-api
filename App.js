import React, { useEffect, useState } from "react";
import { View, Text, Linking } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import queryString from 'query-string';
import Home from "./screens/Home.screen";
import About from "./screens/About.screen";
import ChoosePhoto from "./screens/ChoosePhoto.screen";

const Stack = createStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="ChoosePhoto" component={ChoosePhoto} />
        </Stack.Navigator>
        {/* For testing purposes */}
      </NavigationContainer>
  );
}
