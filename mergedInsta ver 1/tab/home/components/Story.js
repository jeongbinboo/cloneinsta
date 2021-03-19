import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//ICON
import Ionicons from 'react-native-vector-icons/Ionicons';

const Story = (props) => (
  <View style={styles.storyId}>
    <TouchableOpacity>
      <Ionicons name="ios-person-circle-outline" size={65} color="black" />
    </TouchableOpacity>
    <Text style={{fontSize: hp('1.6%'), color: 'black'}}>{props.name}</Text>
  </View>
);

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

export default Story;
