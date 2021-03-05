import React from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
//meh
const Story = () => (
  <View style={styles.container}>
    <AntDesign name={'meh'} size={70} color={'#3F3F3F'} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default Story;
