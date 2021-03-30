import axios from 'axios';
import React from 'react';
import {PureComponent} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
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
  }
  render() {
    return (
      <View>
        <View style={styles.storyId}>
          <TouchableOpacity onPress={this.props.modalHandler}>
            <Ionicons
              name="ios-person-circle-outline"
              size={65}
              color="black"
            />
          </TouchableOpacity>
          <Text style={{fontSize: hp('1.6%'), color: 'black'}}>
            {this.props.name}
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
