import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Ifpasswordforgot from "../screens/ifpasswordforgot";
import Join from "../screens/join";
import Login from "../screens/login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Sample from "../screens/sample";
import Home from "../screens/home";
import SignUp from "../screens/signup";
const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Join"
        component={Join}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Ifpasswordforgot"
        component={Ifpasswordforgot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Signup" name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
