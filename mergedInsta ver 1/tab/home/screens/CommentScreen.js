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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//AXIOS
import axios from 'axios';

//REDUX
import {connect} from 'react-redux';

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
      DATA: [],
      REPLY: [],
      page: 1,
      isLoading: true,
      isReplyInput: false,
    };
    this.flatListRef = createRef();
    this.myRef = createRef();
    this.focusInput = this.focusInput.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.setTime = this.setTime.bind(this);
    this.cancelReply = this.cancelReply.bind(this);
    //this.props.TabNavigation.setOptions({tabBarVisible: false});
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
    axios
      .get(`${axios.defaults.baseURL}/comments/1?page=${this.state.page}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
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
  postComments() {
    Keyboard.dismiss();
    if (this.state.value === '') {
      alert('내용을 입력하세요.');
      return;
    }
    if (this.state.isReplyInput) {
      //답글
      //답글 확인하는 api 아직 없어서 아직 확인 못함
      axios
        .post(
          `${axios.defaults.baseURL}/comments/1`,
          {content: this.state.value},
          {
            headers: {
              Authorization: axios.defaults.headers.common['Authorization'],
            },
          },
        )
        .then((response) => {
          this.setState({
            REPLY: this.state.REPLY.concat(response.data.data),
            value: '',
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //댓글
      axios
        .post(
          `${axios.defaults.baseURL}/comments/1`,
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
    this.myRef.current.focus();
    this.setState({isReplyInput: true});
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
    Keyboard.dismiss();
    this.setState({isReplyInput: false});
  }
  render() {
    return (
      <View style={{flex: 1}}>
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
            <Ionicons name="ios-person-circle-outline" size={hp('8%')} />
            <View style={styles.submitView}>
              <TextInput
                ref={this.myRef}
                style={styles.textInput}
                onChangeText={(value) => this.setState({value})}
                value={this.state.value}
                placeholder={'댓글 달기...'}
                placeholderTextColor="grey"
              />
              <TouchableOpacity onPress={() => this.postComments()}>
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
    this.state = {reply: false};
  }
  render() {
    return (
      <>
        <View style={styles.cmtView}>
          <View style={{marginRight: wp('1%')}}>
            <Ionicons name="ios-person-circle-outline" size={hp('7%')} />
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
        {this.state.reply ? ( //renderItem으로 reply..?
          <View>
            <Text>하이</Text>
          </View>
        ) : (
          <></>
        )}
      </>
    );
  }
}

class CmtLikes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {isLikes: false};
    this.setIsLikes = this.setIsLikes.bind(this);
  }
  componentDidMount() {
    this.getIsLikes();
  }
  setIsLikes(i) {
    //this.setState({isLikes: !this.state.isLikes});
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
    axios
      .get(`${axios.defaults.baseURL}/comments/${this.props.index + 1}/like`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        response.data.data.map((ele) => {
          if (ele.user_id === 'james') {
            //로그인한 사용자 user_id에 따라 바꿔야됨.
            this.setState({isLikes: true});
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
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
  cmt: {
    width: wp('74%'),
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

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  user_id: state.userReducer.user_id,
});

connect(mapStateToProps)(CmtLikes);
