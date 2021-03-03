import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const MakeContent = (props) => {
  const {toggleMakeContentModal} = props;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.background}
        activeOpacity={1}
        onPress={toggleMakeContentModal}
      />
      <View style={styles.modal}>
        <Text style={styles.titleText}>만들기</Text>

        <TouchableOpacity
          style={styles.listTouch}
          onPress={() => {
            navigation.navigate('NewPost');
            toggleMakeContentModal();
          }}>
          <Text style={styles.listItemText}>게시물</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listTouch}>
          <Text style={styles.listItemText}>스토리</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listTouch}>
          <Text style={styles.listItemText}>스토리 하이라이트</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listTouch}>
          <Text style={styles.listItemText}>IGTV 동영상</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listTouch}>
          <Text style={styles.listItemText}>릴스</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listTouch}>
          <Text style={styles.listItemText}>가이드</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    marginHorizontal: 0,
    //borderRadius: 10,
    alignItems: 'center',
    marginTop: '85%',
    //marginBottom: '10%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
  },
  listItemText: {
    fontSize: 20,
    margin: 15,
  },
  listTouch: {
    borderTopWidth: 1,
    borderTopColor: '#d2d2d2',
    width: '100%',
  },

  titleText: {
    fontSize: 20,
    margin: 15,
    fontWeight: 'bold',
  },
});

export default MakeContent;
