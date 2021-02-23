import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './components/HomeScreen';
import CommentScreen from './components/CommentScreen';

const ProfileScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile!</Text>
    </View>
  );
};
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
      //onPress={() => props.navigation.navigate('HomeScreen')}
    />
  );
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveBackgroundColor: 'black',
          inactiveTintColor: 'white',
          activeBackgroundColor: 'black',
        }}>
        <Tab.Screen
          name="Home"
          //component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => {
              let iconName = ''; //아이콘 눌렸을 때 변경
              iconName = focused ? 'ios-home' : 'ios-home-outline';
              return (
                <Ionicons
                  name={iconName}
                  size={30}
                  style={{color: 'white'}}></Ionicons>
              );
            },
          }}>
          {() => (
            <Stack.Navigator>
              <Stack.Screen
                name="Instagram"
                options={{
                  headerStyle: {
                    backgroundColor: 'black',
                  },
                  headerTintColor: 'white',
                  headerTitleStyle: {
                    fontFamily: 'Norican-Regular',
                    fontSize: 30,
                  },
                  headerRight: () => (
                    <View style={{flexDirection: 'row'}}>
                      <HeaderIcon name="ios-heart-outline" />
                      <HeaderIcon name="ios-paper-plane-outline" />
                    </View>
                  ),
                }}>
                {({navigation}) => <HomeScreen navigation={navigation} />}
              </Stack.Screen>
              <Stack.Screen
                name="CommentScreen"
                component={CommentScreen}
                options={{
                  headerTitle: '댓글',
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: 'black',
                  },
                  headerTintColor: 'white',
                  /*headerLeft: ({navigation}) => (
                    <HeaderIcon
                      name="ios-chevron-back"
                      navigation={navigation}
                    />
                  ),
                  headerRight: ({navigation}) => (
                    <HeaderIcon
                      name="ios-paper-plane-outline"
                      navigation={navigation}
                    />
                  ),*/
                }}
              />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Find"
          component={FindScreen}
          options={{
            tabBarIcon: ({focused}) => {
              let iconName = '';
              iconName = focused ? 'ios-search-sharp' : 'ios-search-outline';
              return (
                <Ionicons
                  name={iconName}
                  size={30}
                  style={{color: 'white'}}></Ionicons>
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
                <Ionicons
                  name={iconName}
                  size={30}
                  style={{color: 'white'}}></Ionicons>
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
                <Ionicons
                  name={iconName}
                  size={30}
                  style={{color: 'white'}}></Ionicons>
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => {
              let iconName = '';
              iconName = focused
                ? 'ios-person-circle-sharp'
                : 'ios-person-circle-outline';
              return (
                <Ionicons
                  name={iconName}
                  size={30}
                  style={{color: 'white'}}></Ionicons>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
