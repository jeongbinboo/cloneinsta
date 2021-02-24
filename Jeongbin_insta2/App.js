import React from "react";
import StackNavigation from "./src/navigations/Stack";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};
export default App;
