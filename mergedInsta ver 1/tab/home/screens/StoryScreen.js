import axios from 'axios';
//import {Button} from 'native-base';
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
    this.getStory = this.getStory.bind(this);
    this.state = {story: ''};
  }
  componentDidMount() {
    this.getStory();
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
          story: response.data.data[0].url,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.idView}>
          <Image
            style={{
              height: 55,
              width: 55,
              borderRadius: 60,
              marginBottom: 7,
              marginTop: 5,
              marginLeft: 5,
            }}
            source={{
              uri: `http://34.64.201.219:8080/api/v1/uploads/${this.props.route.params.profileImage}`,
            }}
          />
          <Text
            style={{
              fontSize: 25,
              marginLeft: 10,
              color: 'white',
              fontWeight: 'bold',
            }}>
            {this.props.route.params.writer}
          </Text>
        </View>
        <View style={styles.storyView}>
          {this.state.story ? (
            <Image
              style={styles.imgView}
              source={{
                uri: `http://34.64.201.219:8080/api/v1/uploads/${this.state.story}`,
              }}
            />
          ) : (
            <Text style={{color: 'white'}}>스토리를 추가하세요.</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  imgView: {
    height: hp('50%'),
    width: wp('100%'),
  },
  storyView: {
    height: hp('80%'),
    width: wp('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  idView: {
    display: 'flex',
    alignItems: 'center',
    height: hp('8%'),
    width: wp('100%'),
    flexDirection: 'row',
  },
});
