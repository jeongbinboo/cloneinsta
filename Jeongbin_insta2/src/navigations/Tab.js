import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Ifpasswordforgot from "../screens/ifpasswordforgot";
import Join from "../screens/join";
import Login from "../screens/login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Login">
      <Tab.Screen name="Login" component={Login}></Tab.Screen>
      <Tab.Screen name="Join" component={Join}></Tab.Screen>
      <Tab.Screen
        name="Ifpasswordforgot"
        component={Ifpasswordforgot}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};
export default TabNavigation;
