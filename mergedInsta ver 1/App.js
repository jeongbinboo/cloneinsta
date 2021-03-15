import React from 'react';
import StackNavigation from './login/navigation/Stack';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

//navigation test
/*
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
*/

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

/*
const App = () => {
  return (
    <View>
      <Text>하이 안녕 !!</Text>
      
    </View>
  );
};

*/
/*
const App = () => <TestNav />;

const TestNav = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Profile">
        {() => (
          <Stack.Navigator>
            <Stack.Screen //Home.js
              name="Home"
              component={Test1}
              options={{
                title: 'M0ovie',
                //headerTitleAlign: 'center',  //타이틀 중앙정렬
                justifyContent: 'center',
              }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  </NavigationContainer>
);

const Test1 = () => (
  <View>
    <Text>하이</Text>
  </View>
);
*/
export default App;
