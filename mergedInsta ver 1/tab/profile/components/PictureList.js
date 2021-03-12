import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

const PictureList = ({navigation, toIndex, TabNavigation}) => (
  <View style={styles.container}>
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.push('PostList', {picId: 0, TabNavigation: TabNavigation});
        }}>
        <View>
          <Image
            style={{height: 130, width: 130}}
            source={require('../images/pic7.jpg')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.push('PostList', {picId: 1, TabNavigation: TabNavigation});
        }}>
        <View>
          <Image
            style={{height: 130, width: 130}}
            source={require('../images/pic1.jpg')}
          />
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexWrap: 'nowrap',
  },
});

export default PictureList;
