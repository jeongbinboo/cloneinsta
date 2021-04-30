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
        <Image
          style={styles.imgView}
          source={{
            uri: `http://34.64.201.219:8080/api/v1/uploads/${this.state.story}`,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'black',
  },
  imgView: {
    height: hp('50%'),
    width: wp('100%'),
  },
});
