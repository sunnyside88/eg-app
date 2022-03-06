import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer,useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInForm from "./src/components/SignInForm";
import HomePage from "./src/components/HomePage";

const App = () => {
  const Stack = createNativeStackNavigator();
  const navigationRef = useNavigationContainerRef();  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignInForm}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: "Menu" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App