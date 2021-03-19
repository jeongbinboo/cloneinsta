import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//ICON
import Ionicons from 'react-native-vector-icons/Ionicons';

//AXIOS
import axios from 'axios';

const ContentIcon = (props) => {
  const btnName = props.name;
  let tmpBtnName = '';
  const [isClicked, setIsClicked] = useState(true);
  if (btnName === 'ios-heart-outline') {
    tmpBtnName = 'ios-heart';
  } else if (btnName === 'ios-chatbubble-outline') {
    tmpBtnName = 'ios-chatbubble';
  } else if (btnName === 'ios-paper-plane-outline') {
    tmpBtnName = 'ios-paper-plane';
  } else {
    tmpBtnName = 'ios-bookmark';
  }
  const isChat = () => {
    if (btnName === 'ios-chatbubble-outline') {
      props.navigation.navigate('CommentScreen');
    } else {
      setIsClicked(!isClicked);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        isChat();
      }}>
      <Ionicons
        name={isClicked ? btnName : tmpBtnName}
        size={30}
        style={{paddingRight: wp('3%'), marginLeft: wp('1%')}}
      />
    </TouchableOpacity>
  );
};

const LikesId = () => {
  return (
    <View style={styles.likesId}>
      <Ionicons
        name="ios-people-circle-outline"
        size={25}
        color="black"
        style={{
          marginRight: wp('1%'),
        }}
      />
      <Text style={{fontWeight: 'bold', fontSize: hp('1.9%')}}>m0ovie</Text>
      <Text
        style={{
          color: 'black',
          fontSize: hp('1.9%'),
        }}>
        님 외 여러명이 좋아합니다.
      </Text>
    </View>
  );
};

class Comment extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.cmt}>
        <TouchableOpacity>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: hp('2.2%'),
              marginRight: '3%',
            }}>
            {this.props.name}
          </Text>
        </TouchableOpacity>
        <Text style={{color: 'black'}}>{this.props.content}</Text>
      </View>
    );
  }
}

const Input = () => {
  return (
    <View style={styles.cmtInput}>
      <Ionicons
        name="ios-person-circle-outline"
        size={35}
        color="black"
        style={{
          marginRight: wp(1),
          marginLeft: wp(1),
        }}
      />
      <TextInput
        multiline
        placeholder={'댓글 달기..'}
        placeholderTextColor="grey"
      />
    </View>
  );
};

class Content extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.contentView}>
        <View style={styles.contentId}>
          <View style={styles.contentIcon}>
            <Ionicons
              name="ios-person-circle-outline"
              size={60}
              color="black"
            />
          </View>
          <View style={styles.content}>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: hp('2.7%'),
                }}>
                {this.props.name}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentIcon}>
            <TouchableOpacity onPress={this.props.modalHandler}>
              <Ionicons
                name="ios-ellipsis-horizontal"
                size={22}
                color="black"
                backgroundColor="transparent"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Image style={styles.imgView} source={this.props.src} />
        <View style={styles.iconView}>
          <View style={styles.mainIcon}>
            <ContentIcon name="ios-heart-outline" />
            <ContentIcon
              name="ios-chatbubble-outline"
              navigation={this.props.navigation}
            />
            <ContentIcon name="ios-paper-plane-outline" />
          </View>
          <ContentIcon name="ios-bookmark-outline" />
        </View>
        <LikesId />
        <View style={styles.cmtView}>
          <Comment name="sleepy" content="졸려" />
          <Comment name="hungry" content="배고파" />
          <Input />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentView: {
    height: hp('80%'),
    marginVertical: hp('1%'),
  },
  contentId: {
    height: hp('7%'),
    //marginTop: '1%',
    flexDirection: 'row',
  },
  contentIcon: {
    width: wp('15%'),
    marginLeft: wp('1%'),
    marginRight: wp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: wp('1%'),
  },
  content: {
    width: wp('68%'),
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems:'center'
    paddingLeft: wp('2%'),
  },
  imgView: {
    height: hp('50%'),
    width: wp('100%'),
    //backgroundColor: 'blue',
  },
  iconView: {
    height: hp('3%'),
    flexDirection: 'row',
    marginTop: hp('2%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likesId: {
    marginTop: '2%',
    height: hp('4%'),
    paddingLeft: wp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  cmtView: {
    height: hp('14%'),
  },
  cmt: {
    height: hp('3.5%'),
    paddingLeft: wp('2%'),
    alignItems: 'center',
    flexDirection: 'row',
  },
  cmtInput: {
    height: hp('5%'),
    flexDirection: 'row',
    marginTop: hp(1),
  },
});

export default Content;