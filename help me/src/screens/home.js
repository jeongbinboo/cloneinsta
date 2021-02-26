import React from 'react';
import {Text, View} from 'react-native';
//import {NavigationContainer} from '@react-navigation/native';
//import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import HomeScreen from '../../components/HomeScreen';
//import CommentScreen from '../../components/CommentScreen';
import Profile from './Profile';
import HomeStack from './HomeStack';

const ShoppingScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Shopping!</Text>
    </View>
  );
};
const UploadScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Upload!</Text>
    </View>
  );
};
const FindScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Find screen</Text>
    </View>
  );
};

const HeaderIcon = (props) => {
  return (
    <Ionicons.Button
      name={props.name}
      size={37}
      color="white"
      backgroundColor="transparent"
      style={{paddingRight: '3%'}}
    />
  );
};

//const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveBackgroundColor: 'black',
        inactiveTintColor: 'white',
        activeBackgroundColor: 'black',
        showLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => {
            let iconName = ''; //아이콘 눌렸을 때 변경
            iconName = focused ? 'ios-home' : 'ios-home-outline';
            return (
              <Ionicons name={iconName} size={30} style={{color: 'white'}} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Find"
        component={FindScreen}
        options={{
          tabBarIcon: ({focused}) => {
            let iconName = '';
            iconName = focused ? 'ios-search-sharp' : 'ios-search-outline';
            return (
              <Ionicons name={iconName} size={30} style={{color: 'white'}} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          tabBarIcon: ({focused}) => {
            let iconName = '';
            iconName = focused
              ? 'ios-add-circle-sharp'
              : 'ios-add-circle-outline';
            return (
              <Ionicons name={iconName} size={30} style={{color: 'white'}} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Shopping"
        component={ShoppingScreen}
        options={{
          tabBarIcon: ({focused}) => {
            let iconName = '';
            iconName = focused ? 'ios-basket' : 'ios-basket-outline';
            return (
              <Ionicons name={iconName} size={30} style={{color: 'white'}} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            let iconName = '';
            iconName = focused
              ? 'ios-person-circle-sharp'
              : 'ios-person-circle-outline';
            return (
              <Ionicons name={iconName} size={30} style={{color: 'white'}} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
