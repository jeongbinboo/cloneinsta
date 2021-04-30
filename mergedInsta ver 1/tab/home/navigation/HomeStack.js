import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import CommentScreen from '../screens/CommentScreen';
import StoryScreen from '../screens/StoryScreen';
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
class HomeStack extends Component {
  constructor(props) {
    super(props);
    this.state = {isComment: false};
    this.isCommentOpen = this.isCommentOpen.bind(this);
  }
  isCommentOpen() {
    this.setState({isComment: !this.state.isComment});
    if (this.state.isComment === false) {
      this.props.TabNavigation.setOptions({tabBarVisible: false});
    }
  }
  render() {
    const config = {
      animation: 'spring',
      config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      },
    };
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen
            name="Instagram"
            //component={HomeScreen}
            options={{
              headerStyle: {
                backgroundColor: 'white',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                fontFamily: 'Norican-Regular',
                fontSize: 30,
              },
              headerLeft: null, //remove back button
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
            }}>
            {({navigation}) => (
              <HomeScreen
                TabNavigation={this.props.TabNavigation}
                storyHandler={this.props.storyHandler}
                StackNavi={navigation}
                cmtOpen={() => this.isCommentOpen()}
              />
            )}
          </Stack.Screen>
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
                    this.props.TabNavigation.setOptions({tabBarVisible: true});
                  }}>
                  <HeaderIcon name="ios-chevron-back" />
                </TouchableOpacity>
              ),
              headerRight: () => <HeaderIcon name="ios-paper-plane-outline" />,
            })}
          />
          <Stack.Screen
            name="StoryScreen"
            component={StoryScreen}
            options={{
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: 'vertical',
              transitionSpec: {
                open: config,
                close: config,
              },
            }} //위에서 아래로 swipe back
          />
        </Stack.Navigator>
      </>
    );
  }
}

export default HomeStack;
