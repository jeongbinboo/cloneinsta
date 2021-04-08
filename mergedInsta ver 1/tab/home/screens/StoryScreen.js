import axios from 'axios';
import {Button} from 'native-base';
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
  componentDidMount() {
    this.getStory();
  }
  getStory() {
    axios
      .get(`${axios.defaults.baseURL}/stories/test`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        this.setState({
          story: response.data.data,
        });
      })
      .catch((error) => {
        console.log('storyError' + error);
      });
  }
  _onRefresh() {
    //밑으로 내리면 닫힘
    this.props.storyHandler();
  }
  renderItem({item}) {
    return (
      <Image
        style={styles.imgView}
        source={{uri: `http://34.64.201.219:8080/api/v1/${item.url}`}}
      />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.background}
          onPress={() => this.props.storyHandler()}>
          <View
            style={{
              marginTop: hp('20%'),
            }}>
            <FlatList
              horizontal
              onRefresh={this._onRefresh}
              data={this.state.story}
              renderItem={(item) => {
                return this.renderItem({item});
              }}
              keyExtractor={(index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
        {/*<Image
            style={styles.imgView}
            source={{
              uri: `http://34.64.201.219:8080/api/v1/${this.state.story}`,
            }}
          />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  imgView: {
    height: hp('50%'),
    width: wp('100%'),
    backgroundColor: 'blue',
  },
});
