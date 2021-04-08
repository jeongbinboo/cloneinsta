import React, {PureComponent, useEffect, useRef, useState} from 'react';
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

//REDUX
import {connect} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';

class ContentIcon extends PureComponent {
  constructor(props) {
    super(props);
    this.btnName = this.props.name;
    this.tmpBtnName = '';
    this.state = {
      isClicked: false,
      isLiked: false,
    };
    //this.getLikes = this.getLikes.bind(this);
    this.setLikes = this.setLikes.bind(this);
    this.isFunc = this.isFunc.bind(this);
  }
  /*componentDidMount() {
    this.getLikes();
  }
  getLikes() {
    axios
      .post(`${axios.defaults.baseURL}/posts/${this.props.index + 1}/like`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        console.log(response.data.data[0]);
        if (response.data.data[0].likes !== 0) {
          this.setState({isLiked: true});
          console.log('hiz');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }*/
  setLikes(i) {
    this.setState({isClicked: !this.state.isClicked});
    axios
      .post(`${axios.defaults.baseURL}/posts/${i + 1}/like`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        this.setState({isLiked: !this.state.isLiked});
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  isFunc() {
    if (this.btnName === 'ios-chatbubble-outline') {
      this.props.navigation.navigate('CommentScreen');
      this.props.cmtOpen();
    } else {
      this.setState({isClicked: !this.state.isClicked});
    }
  }
  render() {
    if (this.btnName === 'ios-heart-outline') {
      this.tmpBtnName = 'ios-heart';
    } else if (this.btnName === 'ios-chatbubble-outline') {
      this.tmpBtnName = 'ios-chatbubble';
    } else if (this.btnName === 'ios-paper-plane-outline') {
      this.tmpBtnName = 'ios-paper-plane';
    } else {
      this.tmpBtnName = 'ios-bookmark';
    }
    return (
      <TouchableOpacity
        onPress={() => {
          this.btnName === 'ios-heart-outline' ||
          this.tmpBtnName === 'ios-heart'
            ? this.setLikes(this.props.index)
            : this.isFunc();
        }}>
        <Ionicons
          name={this.state.isClicked ? this.tmpBtnName : this.btnName}
          size={30}
          style={{paddingRight: wp('3%'), marginLeft: wp('1%')}}
        />
      </TouchableOpacity>
    );
  }
}

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

class Comment extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.cmt}>
        <TouchableOpacity>
          <Text style={styles.cmtID}>{this.props.name}</Text>
        </TouchableOpacity>
        <Text style={{color: 'black'}}>{this.props.content}</Text>
      </View>
    );
  }
}

const Input = (props) => {
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
        onFocus={() => props.func(props.index)}
        multiline
        placeholder={'댓글 달기..'}
        placeholderTextColor="grey"
      />
    </View>
  );
};

class Content extends PureComponent {
  constructor(props) {
    super(props);
    this.func = this.func.bind(this);
  }
  renderItem({item}) {
    return (
      <Image
        style={styles.imgView}
        source={{
          uri: `http://34.64.201.219:8080/api/v1/uploads/${item.item}`,
        }}
      />
    );
  }
  func() {
    this.props.navigation.navigate('CommentScreen');
    this.props.cmtOpen();
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
                {this.props.item.writer}
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
        <View style={styles.imgView}>
          <FlatList
            horizontal
            //showsHorizontalScrollIndicator
            data={this.props.item.image}
            renderItem={(item) => {
              return this.renderItem({item});
            }}
            keyExtractor={(index) => index.toString()}
          />
        </View>
        <View style={styles.iconView}>
          <View style={styles.mainIcon}>
            <ContentIcon name="ios-heart-outline" index={this.props.index} />
            <ContentIcon
              name="ios-chatbubble-outline"
              navigation={this.props.navigation}
              cmtOpen={this.props.cmtOpen}
            />
            <ContentIcon name="ios-paper-plane-outline" />
          </View>
          <ContentIcon name="ios-bookmark-outline" />
        </View>
        <LikesId />
        <View style={styles.cmtView}>
          <View style={styles.postContent}>
            <Text style={styles.cmtID}>{this.props.item.writer}</Text>
            <Text>{this.props.item.content}</Text>
          </View>
          <View style={styles.moreCmt}>
            <TouchableOpacity>
              <Text style={{color: 'grey'}} onPress={() => this.func()}>
                댓글 더보기
              </Text>
            </TouchableOpacity>
          </View>
          <Comment name="sleepy" content="ㅋ" />
          <Comment name="hungry" content="배고파" />
          <Input func={this.props.func} index={this.props.index} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentView: {
    height: hp('86%'),
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
  postContent: {
    height: hp('3%'),
    //backgroundColor: 'pink',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '3%',
    marginRight: '3%',
  },
  cmtInput: {
    height: hp('5%'),
    flexDirection: 'row',
    marginTop: hp(1),
  },
  cmtID: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: hp('2.2%'),
    marginRight: '3%',
  },
  moreCmt: {
    height: hp('3%'),
    //backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '3%',
    marginRight: '3%',
  },
});

export default Content;
