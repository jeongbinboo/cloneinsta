import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Ifpasswordforgot from "../screens/ifpasswordforgot";
import Join from "../screens/join";
import Login from "../screens/login";

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
    </Stack.Navigator>
  );
};

export default StackNavigation;
