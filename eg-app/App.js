import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStore } from "redux";
import { Provider, connect } from 'react-redux';

import * as React from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInForm from "./src/components/SignInForm";
import HomePage from "./src/components/HomePage";
import ScanForm from "./src/components/Update/ScanForm";
import rootReducer from './src/reducers';
import CreateGrForm from "./src/components/Update/CreateGrForm";
import GrSummary from "./src/components/Update/GrSummary";
import GrList from "./src/components/View/GrList";
import GrDetails from "./src/components/View/GrDetails";


export default function App() {
  const store = createStore(rootReducer);
  const Stack = createNativeStackNavigator();
  const navigationRef = useNavigationContainerRef();
  return (
    <Provider store={store}>
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
          <Stack.Screen
            name="ScanForm"
            component={ScanForm}
            options={{ title: "Step 1: Scan Barcode" }}
          />
          <Stack.Screen
            name="CreateGrForm"
            component={CreateGrForm}
            options={{ title: "Step 2: Update Stock" }}
          />
          <Stack.Screen
            name="GrSummary"
            component={GrSummary}
            options={{ title: "Step 3: Confirm GR" }}
          />
          <Stack.Screen
            name="GrList"
            component={GrList}
            options={{ title: "GR List" }}
          />
          <Stack.Screen
            name="GrDetails"
            component={GrDetails}
            options={{ title: "Details" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
