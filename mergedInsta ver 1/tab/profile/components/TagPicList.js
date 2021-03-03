import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

class TagPicList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AntDesign name="instagram" size={60} color="#3F3F3F" />
        <Text style={styles.tagText}>회원님이 나온 사진 및 동영상</Text>
        <Text>사람들이 회원님을 사진또는 동영상에 태그하면</Text>
        <Text>태그된 사진 또는 동영상이 여기에 표시됩니다.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  tagText: {
    fontSize: 20,
    padding: 30,
    fontWeight: 'bold',
  },
});

export default TagPicList;
