import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "./src/screens/HomeScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import Analytics from "./src/screens/Analytics";
import ImageClicker from "./src/screens/ImageClicker";
import { AuthContextProvider } from "./src/context/AuthContext";
import { Profile } from "./src/components/Buttons";
import ProfileScreen from "./src/screens/ProfileScreen";
// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Welcome"
            options={{ headerShown: false }}
            component={WelcomeScreen}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="SignUp"
            options={{ headerShown: false }}
            component={SignUpScreen}
          />
          <Stack.Screen
            name="Chart"
            options={{ headerShown: false }}
            component={Analytics}
          />
          <Stack.Screen
            name="ImageClicker"
            options={{ headerShown: false }}
            component={ImageClicker}
          />
          <Stack.Screen
            name="Profile"
            options={{ headerShown: false }}
            component={ProfileScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

function InsideApp() {}
