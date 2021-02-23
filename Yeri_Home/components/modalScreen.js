import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

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
              <Text style={{color: 'firebrick', fontSize: 18, margin: 10}}>
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
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '97%',
    backgroundColor: 'dimgrey',
  },
  content: {
    alignItems: 'center',
    width: '90%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  doneContent: {
    alignItems: 'center',
    width: '90%',
    marginTop: '5%',
    backgroundColor: 'dimgrey',
    borderRadius: 10,
  },
  doneText: {
    color: 'white',
    fontSize: 15,
    margin: 10,
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    margin: 10,
  },
});

export default ModalScreen;
