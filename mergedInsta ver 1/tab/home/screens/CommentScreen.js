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
      page: 1,
      isLoading: true,
    };
    this.flatListRef = createRef();
    this.myRef = createRef();
    this.focusInput = this.focusInput.bind(this);
    this.scrollScreen = this.scrollScreen.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.setTime = this.setTime.bind(this);
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
    //아직 댓글을 추가 해야만 댓글 나옴.
    if (this.state.value === '') {
      alert('내용을 입력하세요.');
      return;
    }
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
  scrollScreen() {
    //this.flatListRef.current.scrollToOffset({animated: true, offset: 1});
  }
  focusInput(index) {
    this.myRef.current.focus();
    if (index >= 3) index = index - 3;
    this.flatListRef.current.scrollToIndex({index: index}); //flatlist index 넣으면 됨
  }
  loadMore() {
    if (this.state.isLoading) {
      return;
    } else {
      this.getComments();
    }
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
                //onFocus={this.scrollScreen}
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
  }
  render() {
    return (
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
        <CmtLikes />
      </View>
    );
  }
}

const CmtLikes = () => {
  const [isLikes, setIsLikes] = useState(true);
  return (
    <View style={styles.LikesIcon}>
      <Ionicons
        name={isLikes ? 'ios-heart-outline' : 'ios-heart'}
        size={hp('3%')}
        color="grey"
        style={{marginRight: wp('1%')}}
        onPress={() => setIsLikes(!isLikes)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
  },
  Cmtcontainer: {
    //flex: 1,
    //justifyContent: 'flex-end',
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
    borderTopWidth: 1,
    borderColor: 'grey',
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
