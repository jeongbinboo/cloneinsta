import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import ClickedPic from './ClickedPic';

const PostList = () => (
  <ScrollView style={styles.container}>
    <ClickedPic />
  </ScrollView>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PostList;
