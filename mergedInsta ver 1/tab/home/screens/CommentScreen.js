import React, {PureComponent, createRef, useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//AXIOS
import axios from 'axios';

//REDUX
import {connect, useSelector} from 'react-redux';

//댓글 FlatList RenderItem
const renderItem = ({item, index}, func1) => (
  <CmtList
    name={item.writer}
    content={item.content}
    time={item.created_at}
    func1={func1}
    index={index}
  />
);

export default class CommentScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      DATA: [], //댓글 list
      REPLY: [], //답글 list
      page: 1,
      isLoading: true,
      isReplyInput: false, //답글다는중 flag
      replyIndex: 0,
    };
    this.flatListRef = createRef();
    this.myRef = createRef();
    this.focusInput = this.focusInput.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.setTime = this.setTime.bind(this);
    this.cancelReply = this.cancelReply.bind(this);
  }

  componentDidMount() {
    //CommentScreen 들어왔을때 딱 한번만 실행
    this.getComments();
  }
  setTime(time) {
    //계산하기 귀찮아서 일단 이렇게만 해둠.
    const today = new Date();
    const postedTime = new Date(time);
    const postedHour = postedTime.getHours();
    const now = today.getHours();
    const TIME = now - postedHour;
    if (TIME < 0) {
      return 1;
    } else {
      return 2;
    }
  }
  getComments() {
    //댓글 불러오기
    axios
      .get(
        `${axios.defaults.baseURL}/comments/${
          this.props.route.params.index + 1 //navigate할 때 넘겨준 포스트 id
        }?page=${this.state.page}`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        response.data.data.map((ele) => {
          ele.created_at = this.setTime(ele.created_at);
        });
        this.setState({
          DATA: this.state.DATA.concat(response.data.data),
          value: '',
          page: this.state.page + 1,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({isLoading: false});
        console.log(error);
      });
  }
  postComments(i) {
    //댓글 or 답글 작성하기
    Keyboard.dismiss();
    if (this.state.value === '') {
      alert('내용을 입력하세요.');
      return;
    }
    if (this.state.isReplyInput) {
      //답글 달기
      axios
        .post(
          `${axios.defaults.baseURL}/comments/${i + 1}/reply`,
          {content: this.state.value},
          {
            headers: {
              Authorization: axios.defaults.headers.common['Authorization'],
            },
          },
        )
        .then((response) => {
          this.setState({
            value: '',
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //댓글 달기
      axios
        .post(
          `${axios.defaults.baseURL}/comments/${
            this.props.route.params.index + 1
          }`,
          {content: this.state.value},
          {
            headers: {
              Authorization: axios.defaults.headers.common['Authorization'],
            },
          },
        )
        .then((response) => {
          this.setState({
            DATA: this.state.DATA.concat(response.data.data),
            value: '',
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  focusInput(index) {
    //답글달기를 눌렀을 때 그 댓글에 focus
    this.myRef.current.focus();
    this.setState({isReplyInput: true, replyIndex: index});
    if (index >= 3) index = index - 3;
    this.flatListRef.current.scrollToIndex({index: index});
  }
  loadMore() {
    //무한스크롤
    if (this.state.isLoading) {
      return;
    } else {
      //this.getComments(); 자꾸 오류남
    }
  }
  cancelReply() {
    //답글달기 취소하기
    Keyboard.dismiss();
    this.setState({isReplyInput: false});
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.contentView}>
          <View style={{marginRight: wp('1%')}}>
            {/*<Ionicons name="ios-person-circle-outline" size={hp('7%')} />*/}
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 60,
              }}
              source={{
                uri: `http://34.64.201.219:8080/api/v1/uploads/${this.props.route.params.profile}`,
              }}
            />
          </View>
          <View style={styles.cmt}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginRight: wp('2%'),
                    fontSize: hp('2.3%'),
                  }}>
                  {this.props.route.params.writer}
                </Text>
              </TouchableOpacity>
              <Text style={{fontSize: hp('2.3%')}}>
                {this.props.route.params.content}
              </Text>
            </View>
            <View style={styles.cmtExtraView}>
              <Text
                style={{
                  color: 'grey',
                  marginRight: wp('8%'),
                  fontSize: hp('1.8%'),
                }}>
                5시간 전
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <FlatList
            ref={this.flatListRef}
            data={this.state.DATA}
            renderItem={({item, index}) => {
              return renderItem({item, index}, this.focusInput);
            }}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.6}
            ListFooterComponent={
              this.state.isLoading && (
                <ActivityIndicator size="large" color="black" />
              )
            }
          />
        </View>
        <View style={styles.inputView}>
          {this.state.isReplyInput ? (
            <View style={styles.reply}>
              <Text>답글 남기는 중...</Text>
              <TouchableOpacity onPress={this.cancelReply}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
          <View style={styles.inputTextView}>
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 60,
                marginRight: 6,
                marginLeft: 8,
                marginTop: 5,
                marginBottom: 3,
              }}
              source={{
                uri: `http://34.64.201.219:8080/api/v1/uploads/${this.props.route.params.profile}`,
              }}
            />
            <View style={styles.submitView}>
              <TextInput
                ref={this.myRef}
                style={styles.textInput}
                onChangeText={(value) => this.setState({value})}
                value={this.state.value}
                placeholder={'댓글 달기...'}
                placeholderTextColor="grey"
              />
              <TouchableOpacity
                onPress={() => this.postComments(this.state.replyIndex)}>
                <Text style={{color: 'skyblue', fontSize: hp('2%')}}>게시</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

class CmtList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {profileImage: '', page: 1, DATA: [], replyFlag: false};
    this.getUserProfile = this.getUserProfile.bind(this);
    this.getReply = this.getReply.bind(this);
    this.renderReply = this.renderReply.bind(this);
  }
  componentDidMount() {
    this.getUserProfile();
    this.getReply();
  }
  getReply() {
    //답글 불러오기
    axios
      .get(
        `${axios.defaults.baseURL}/comments/${
          this.props.index + 1
        }/reply?page=${this.state.page}`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        this.setState({
          DATA: this.state.DATA.concat(response.data.data),
          page: this.state.page + 1,
          replyFlag: true,
        });
        console.log(this.state.DATA);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getUserProfile() {
    //프로필 사진 불러오기
    axios
      .get(`${axios.defaults.baseURL}/users/${this.props.name}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        this.setState({profileImage: response.data.data[0].profile_image});
      })
      .catch((error) => {
        console.log(error);
      });
  }
  renderReply({item, index}) {
    return <ReplyList item={item} index={index} />;
  }
  render() {
    return (
      <>
        <View style={styles.cmtView}>
          <View style={{marginRight: wp('1%')}}>
            {this.state.profileImage ? (
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
            ) : (
              <Ionicons name="ios-person-circle-outline" size={hp('8%')} />
            )}
          </View>
          <View style={styles.cmt}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginRight: wp('2%'),
                    fontSize: hp('2.3%'),
                  }}>
                  {this.props.name}
                </Text>
              </TouchableOpacity>
              <Text style={{fontSize: hp('2.3%')}}>{this.props.content}</Text>
            </View>
            <View style={styles.cmtExtraView}>
              <Text
                style={{
                  color: 'grey',
                  marginRight: wp('8%'),
                  fontSize: hp('1.8%'),
                }}>
                {this.props.time}시간 전
              </Text>
              <TouchableOpacity
                onPress={() => this.props.func1(this.props.index)}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'grey',
                    fontSize: hp('1.8%'),
                  }}>
                  답글 달기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <CmtLikes index={this.props.index} />
        </View>
        {this.state.replyFlag ? (
          <FlatList
            data={this.state.DATA}
            renderItem={({item, index}) => {
              return this.renderReply({item, index});
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

class ReplyList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {profileImage: ''};
    this.getUserProfile = this.getUserProfile.bind(this);
  }
  componentDidMount() {
    this.getUserProfile();
  }
  getUserProfile() {
    //프로필 사진 불러오기
    axios
      .get(`${axios.defaults.baseURL}/users/${this.props.item.writer}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        this.setState({profileImage: response.data.data[0].profile_image});
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.replyView}>
        <View style={{marginRight: wp('1%')}}>
          {this.state.profileImage ? (
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
          ) : (
            <Ionicons name="ios-person-circle-outline" size={hp('8%')} />
          )}
        </View>
        <View style={styles.replyCmt}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginRight: wp('2%'),
                  fontSize: hp('2.3%'),
                }}>
                {this.props.item.writer}
              </Text>
            </TouchableOpacity>
            <Text style={{fontSize: hp('2.3%')}}>
              {this.props.item.content}
            </Text>
          </View>
          <View style={styles.cmtExtraView}>
            <Text
              style={{
                color: 'grey',
                marginRight: wp('8%'),
                fontSize: hp('1.8%'),
              }}>
              1시간 전
            </Text>
          </View>
        </View>
        <CmtLikes index={this.props.item.id - 1} />
      </View>
    );
  }
}

export class CmtLikes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {isLikes: false}; //댓글 좋아요 flag
    this.setIsLikes = this.setIsLikes.bind(this);
  }
  componentDidMount() {
    this.getIsLikes();
  }
  setIsLikes(i) {
    //댓글 좋아요 누르기
    axios
      .post(`${axios.defaults.baseURL}/comments/${i + 1}/like`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        this.setState({isLikes: !this.state.isLikes});
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getIsLikes() {
    //댓글 좋아요 가져오기
    axios
      .get(`${axios.defaults.baseURL}/comments/${this.props.index + 1}/like`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        response.data.data.map((ele) => {
          if (ele.user_id === 'test') {
            //로그인한 사용자 user_id에 따라 바꿔야됨. (아직 안됨 redux 사용해야함)
            this.setState({isLikes: true});
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    //console.log(this.props.user_id);
    return (
      <View style={styles.LikesIcon}>
        <Ionicons
          name={this.state.isLikes ? 'ios-heart' : 'ios-heart-outline'}
          size={hp('3%')}
          color="grey"
          style={{marginRight: wp('1%')}}
          onPress={() => {
            this.setIsLikes(this.props.index);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
  },
  reply: {
    backgroundColor: 'lightgrey',
    height: hp(4),
    display: 'flex',
    paddingLeft: wp(2),
    paddingRight: wp(2),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cmtView: {
    height: hp(7),
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
  },
  replyView: {
    height: hp(7),
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: wp('14%'),
    paddingRight: wp('1%'),
  },
  contentView: {
    height: hp(7),
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  cmt: {
    width: wp('74%'),
    height: hp('6.5%'),
    flexDirection: 'column',
  },
  replyCmt: {
    width: wp('61%'),
    height: hp('6.5%'),
    flexDirection: 'column',
  },
  cmtExtraView: {
    height: hp('2.5%'),
    //justifyContent: 'center',
    paddingLeft: '1%',
    flexDirection: 'row',
  },
  LikesIcon: {
    width: wp('11%'),
    marginLeft: wp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    flex: 0.1,
    width: wp('100%'),
    //height: hp('15%'),
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
  },
  IconView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('1%'),
    //height: '100%',
    width: wp('100%'),
    //position: 'absolute',
    //bottom: 50,
  },
  inputTextView: {
    flex: 1,
    //height: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'grey',
  },
  submitView: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'flex-end',
    width: wp('82%'),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  submitBtn: {
    width: wp('10%'),
    color: 'red',
    alignItems: 'center',
  },
  textInput: {
    height: hp('5%'),
    width: wp('70%'),
    marginLeft: wp('1%'),
  },
});

const mapStateToProps = (state) => {
  return {
    user_id: state.userReducer.user_id,
  };
};

connect(mapStateToProps)(CmtLikes);
