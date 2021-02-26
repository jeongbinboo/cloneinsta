import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../../components/HomeScreen';
import CommentScreen from '../../components/CommentScreen';

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

const Stack = createStackNavigator();

class HomeStack extends React.Component {
  render() {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen
            name="Instagram"
            component={HomeScreen}
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
            }}
          />
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
      </>
    );
  }
}

export default HomeStack;
