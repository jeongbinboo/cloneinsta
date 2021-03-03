import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const Settings = (props) => {
  const {toggleSettingModal} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.background}
        onPress={toggleSettingModal}
        activeOpacity={1}
      />
      <View style={styles.modal}>
        <TouchableOpacity style={styles.listTouch}>
          <Text style={styles.listText}>설정</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listTouch}>
          <Text style={styles.listText}>보관</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listTouch}>
          <Text style={styles.listText}>내 활동</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listTouch}>
          <Text style={styles.listText}>QR 코드</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listTouch}>
          <Text style={styles.listText}>저장됨</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listTouch}>
          <Text style={styles.listText}>친한 친구</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listTouch}>
          <Text style={styles.listText}>사람 찾아보기</Text>
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
    alignItems: 'center',
    marginTop: '85%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  listText: {
    fontSize: 20,
    margin: 15,
  },
  listTouch: {
    borderTopWidth: 1,
    borderTopColor: '#d2d2d2',
    width: '100%',
  },
});

export default Settings;
