import React from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';

const Story = () => (
  /*
  <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator={true}
    onMomentumScrollEnd={() => {
      console.log('Scrolling is End');
    }}>
    <View>
      <Image
        style={{height: 100, width: '90%', margin: 5}}
        source={require('../images/story.jpg')}
      />
    </View>
  </ScrollView>
  */
  <View>
    <Image
      style={{height: 100, width: '90%', margin: 5}}
      source={require('../images/story.jpg')}
    />
  </View>
);

const styles = StyleSheet.create({});

export default Story;
