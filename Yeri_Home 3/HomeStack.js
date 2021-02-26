import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './components/HomeScreen';
import CommentScreen from './components/CommentScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HeaderIcon = (props) => {
  return (
    <TouchableOpacity>
      <Ionicons.Button
        name={props.name}
        size={35}
        color="black"
        backgroundColor="transparent"
      />
    </TouchableOpacity>
  );
};

const Stack = createStackNavigator();
class HomeStack extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen
            name="Instagram"
            component={HomeScreen}
            options={{
              headerStyle: {
                backgroundColor: 'white',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                fontFamily: 'Norican-Regular',
                fontSize: 30,
              },
              headerRight: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <HeaderIcon name="ios-add-circle-outline" />
                  <HeaderIcon name="ios-heart-outline" />
                  <HeaderIcon name="ios-paper-plane-outline" />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="CommentScreen"
            component={CommentScreen}
            options={({navigation}) => ({
              headerTitle: '댓글',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'white',
              },
              headerTintColor: 'black',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <HeaderIcon name="ios-chevron-back" />
                </TouchableOpacity>
              ),
              headerRight: () => <HeaderIcon name="ios-paper-plane-outline" />,
            })}
          />
        </Stack.Navigator>
      </>
    );
  }
}

export default HomeStack;
