import axios from 'axios';
//import {Button} from 'native-base';
import React from 'react';
import {PureComponent} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {PanGestureHandler, FlatList} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//ICON
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class StoryScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.getStory = this.getStory.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this.state = {story: []};
  }
  getStory() {
    axios
      .get(
        `${axios.defaults.baseURL}/stories/${this.props.route.params.writer}`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        this.setState({
          story: this.state.story.concat(response.data.data),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  _onRefresh() {
    //밑으로 내리면 닫힘
    this.props.storyHandler();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>하이</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('50%'),
    width: wp('100%'),
    backgroundColor: 'yellow',
  },
});
