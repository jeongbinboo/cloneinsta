import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HomeStack from './HomeStack';
import StoryScreen from '../screens/StoryScreen';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {isStory: false};
    this.toggleStory = this.toggleStory.bind(this);
  }
  toggleStory() {
    this.setState({
      isStory: !this.state.isStory,
    });
    if (this.state.isStory === true) {
      this.props.TabNavigation.setOptions({tabBarVisible: true});
    }
    if (this.state.isStory === false) {
      this.props.TabNavigation.setOptions({tabBarVisible: false});
    }
  }
  render() {
    return (
      <>
        <HomeStack
          storyHandler={() => this.toggleStory()}
          TabNavigation={this.props.TabNavigation}
        />
      </>
    );
  }
}

export default Home;
