import axios from 'axios';
import React from 'react';
import {PureComponent} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import StoryScreen from '../screens/StoryScreen';

//ICON
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Story extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {profileImage: ''};
    this.onPressFunc = this.onPressFunc.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
  }
  componentDidMount() {
    this.getUserProfile();
  }
  onPressFunc() {
    //this.props.storyHandler();
    this.props.navigation.navigate('StoryScreen', {
      writer: this.props.item.writer,
      profileImage: this.state.profileImage,
    });
  }
  getUserProfile() {
    axios
      .get(`${axios.defaults.baseURL}/users/${this.props.item.writer}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        this.setState({profileImage: response.data.data[0].profile_image});
        console.log(this.state.profileImage);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View>
        <View style={styles.storyId}>
          <TouchableOpacity
            onPress={() => {
              this.onPressFunc();
            }}>
            <Image
              style={{
                height: 55,
                width: 55,
                borderRadius: 60,
                marginBottom: 7,
                marginTop: 5,
              }}
              source={{
                uri: `http://34.64.201.219:8080/api/v1/uploads/${this.state.profileImage}`,
              }}
            />
          </TouchableOpacity>
          <Text style={{fontSize: hp('1.6%'), color: 'black'}}>
            {this.props.item.writer}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  storyId: {
    width: wp('20%'),
    marginLeft: wp('1%'),
    marginRight: wp('3%'),
    marginBottom: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
