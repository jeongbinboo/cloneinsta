import axios from 'axios';
import {Button} from 'native-base';
import React from 'react';
import {PureComponent} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//ICON
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class StoryScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {story: []};
    this.getStory = this.getStory.bind(this);
  }
  componentDidMount() {
    this.getStory();
  }
  getStory() {
    axios
      .get(`${axios.defaults.baseURL}/stories/james`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        //console.log(response.data);
        this.setState({
          story: response.data.data,
        });
        console.log(this.state.story);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.background}
          onPress={this.props.modalHandler}
        />
        <View style={styles.modalView}>
          <Image
            style={styles.imgView}
            source={{
              uri: `http://34.64.201.219:8080/api/v1/uploads/1617113394286_5.jpg`,
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
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
  modalView: {
    display: 'flex',
    marginHorizontal: wp('5%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('80%'),
  },
  imgView: {
    height: hp('50%'),
    width: wp('100%'),
    //backgroundColor: 'blue',
  },
});
