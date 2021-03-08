import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class ModalContent extends Component {
  render() {
    return (
      <View style={styles.content}>
        <TouchableOpacity>
          <Text style={styles.titleText}>{this.props.content}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class ModalScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.background}
          onPress={this.props.modalHandler}
        />
        <View style={styles.modalView}>
          <View style={styles.content}>
            <TouchableOpacity>
              <Text
                style={{color: 'firebrick', fontSize: hp(2.5), margin: hp(2)}}>
                신고
              </Text>
            </TouchableOpacity>
          </View>
          <ModalContent content="링크 복사" />
          <ModalContent content="공유 대상..." />
          <ModalContent content="게시물 알림 설정" />
          <ModalContent content="숨기기" />
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={styles.doneContent}>
            <TouchableOpacity onPress={this.props.modalHandler}>
              <Text style={styles.doneText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    marginHorizontal: wp('5%'),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: hp('33%'),
    backgroundColor: 'white',
  },
  content: {
    alignItems: 'center',
    width: wp('90%'),
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  doneContent: {
    alignItems: 'center',
    width: wp('90%'),
    marginTop: hp('3%'),
    backgroundColor: 'white',
    borderRadius: 10,
  },
  doneText: {
    fontSize: hp(2.5),
    margin: hp(2),
  },
  titleText: {
    fontSize: hp(2.5),
    margin: hp(2),
  },
});

export default ModalScreen;
