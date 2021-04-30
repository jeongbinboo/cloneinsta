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
import {FlatList} from 'react-native-gesture-handler';

//ICON
import Ionicons from 'react-native-vector-icons/Ionicons';

//AXIOS
import axios from 'axios';

//REDUX
import {connect} from 'react-redux';

class HeartIcon extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {isLiked: false, page: 1};
    this.setLikes = this.setLikes.bind(this);
    this.getLikesID = this.getLikesID.bind(this);
  }
  componentDidMount() {
    this.getLikesID();
  }
  getLikesID() {
    axios
      .get(
        `${axios.defaults.baseURL}/posts/${this.props.index + 1}/like?page=${
          this.state.page
        }`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        //console.log(response.data.data);
        response.data.data.map((ele) => {
          if (ele.user_id === 'test') {
            //로그인한 사용자 user_id에 따라 바꿔야됨.
            this.setState({isLiked: true, page: this.state.page + 1});
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setLikes(i) {
    axios
      .post(`${axios.defaults.baseURL}/posts/${i + 1}/like`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        this.setState({isLiked: !this.state.isLiked});
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setLikes(this.props.index);
        }}>
        <Ionicons
          name={this.state.isLiked ? 'ios-heart' : 'ios-heart-outline'}
          size={30}
          style={{paddingRight: wp('3%'), marginLeft: wp('1%')}}
        />
      </TouchableOpacity>
    );
  }
}

export class ContentIcon extends PureComponent {
  constructor(props) {
    super(props);
    this.btnName = this.props.name;
    this.tmpBtnName = '';
    this.state = {
      isClicked: false,
      isLiked: false,
    };
    this.isFunc = this.isFunc.bind(this);
  }
  isFunc() {
    if (this.btnName === 'ios-chatbubble-outline') {
      this.props.navigation.navigate('CommentScreen', {
        index: this.props.index,
        writer: this.props.writer,
        content: this.props.content,
        profile: this.props.profile,
      }); //params 넘겨줄때 stackNavigation에서 component로 넘겨줘야 params 넘어감
      this.props.cmtOpen();
    } else {
      this.setState({isClicked: !this.state.isClicked});
    }
  }
  render() {
    if (this.btnName === 'ios-chatbubble-outline') {
      this.tmpBtnName = 'ios-chatbubble';
    } else if (this.btnName === 'ios-paper-plane-outline') {
      this.tmpBtnName = 'ios-paper-plane';
    } else {
      this.tmpBtnName = 'ios-bookmark';
    }
    return (
      <TouchableOpacity
        onPress={() => {
          this.isFunc();
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

class LikesId extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {likes: 0, page: 1, likedId: '', likedProfileImg: ''};
    this.getLikes = this.getLikes.bind(this);
    this.getLikesID = this.getLikesID.bind(this);
  }
  componentDidMount() {
    this.getLikes();
    this.getLikesID();
  }
  getLikes() {
    //좋아요 개수
    if (this.props.index !== undefined) {
      axios
        .get(`${axios.defaults.baseURL}/posts/${this.props.index + 1}/likes`, {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        })
        .then((response) => {
          this.setState({likes: response.data.data[0].likes});
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  getLikesID() {
    axios
      .get(
        `${axios.defaults.baseURL}/posts/${this.props.index + 1}/like?page=${
          this.state.page
        }`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        if (response.data.data[0]) {
          this.setState({
            page: this.state.page + 1,
            likedId: response.data.data[0].user_id,
            likedProfileImg: response.data.data[0].profile_image,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <>
        <View style={styles.likesId}>
          {this.state.likedProfileImg ? (
            <Image
              style={{
                height: hp('3'),
                width: wp('6'),
                borderRadius: 60,
                marginRight: '1%',
              }}
              source={{
                uri: `http://34.64.201.219:8080/api/v1/uploads/${this.state.likedProfileImg}`,
              }}
            />
          ) : (
            <Ionicons
              name="ios-people-circle-outline"
              size={25}
              color="black"
              style={{
                marginRight: wp('1%'),
              }}
            />
          )}

          {this.state.likes ? (
            <>
              <Text style={{fontWeight: 'bold', fontSize: hp('1.9%')}}>
                {this.state.likedId}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: hp('1.9%'),
                }}>
                님 외{' '}
              </Text>
            </>
          ) : (
            <></>
          )}

          <Text
            style={{
              color: 'black',
              fontSize: hp('1.9%'),
            }}>
            {this.state.likes}명이 좋아합니다.
          </Text>
        </View>
      </>
    );
  }
}

class Comment extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.cmt}>
        <TouchableOpacity>
          <Text style={styles.cmtID}>{this.props.data.writer}</Text>
        </TouchableOpacity>
        <Text style={{color: 'black'}}>{this.props.data.content}</Text>
      </View>
    );
  }
}

class Content extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {users: [], profileImage: [], page: 1, cmt1: [], cmt2: []};
    this.func = this.func.bind(this);
    this.getUsersBio = this.getUsersBio.bind(this);
    this.getComments = this.getComments.bind(this);
  }
  componentDidMount() {
    this.getUsersBio();
    this.getComments();
  }
  getComments() {
    axios
      .get(
        `${axios.defaults.baseURL}/comments/${this.props.index + 1}?page=${
          this.state.page
        }`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        this.setState({
          cmt1: response.data.data[0],
          cmt2: response.data.data[1],
          page: this.state.page + 1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
    this.props.navigation.navigate('CommentScreen', {
      index: this.props.index,
      writer: this.props.item.writer,
      content: this.props.item.content,
      profile: this.state.profileImage,
    });
    this.props.cmtOpen();
  }
  getUsersBio() {
    axios
      .get(`${axios.defaults.baseURL}/users/${this.props.item.writer}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        this.setState({
          users: response.data.data,
          profileImage: response.data.data[0].profile_image,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.contentView}>
        <View style={styles.contentId}>
          <View style={styles.contentIcon}>
            {this.state.profileImage === '' ? (
              <Ionicons
                name="ios-person-circle-outline"
                size={60}
                color="black"
              />
            ) : (
              <Image
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 60,
                }}
                source={{
                  uri: `http://34.64.201.219:8080/api/v1/uploads/${this.state.profileImage}`,
                }}
              />
            )}
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
            <HeartIcon name="ios-heart-outline" index={this.props.index} />
            <ContentIcon
              writer={this.props.item.writer}
              content={this.props.item.content}
              name="ios-chatbubble-outline"
              navigation={this.props.navigation}
              cmtOpen={this.props.cmtOpen}
              index={this.props.index}
              profile={this.state.profileImage}
            />
            <ContentIcon name="ios-paper-plane-outline" />
          </View>
          <ContentIcon name="ios-bookmark-outline" />
        </View>
        <LikesId index={this.props.index} />
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
          {this.state.cmt1 ? <Comment data={this.state.cmt1} /> : <></>}
          {this.state.cmt2 ? <Comment data={this.state.cmt2} /> : <></>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentView: {
    height: hp('81%'),
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
