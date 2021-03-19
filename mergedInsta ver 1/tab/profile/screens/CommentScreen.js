import * as React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {Component} from 'react';
import {Keyboard} from 'react-native';
import {connect} from 'react-redux';

const renderItem = ({item}, func1) => (
  <CmtList
    name="test"
    content={item.content}
    time={item.created_at}
    func1={func1}
  />
);

class CommentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      DATA: [],
      page: 1,
    };
    this.flatListRef = React.createRef();
    this.myRef = React.createRef();
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
    const {id} = this.props.route.params;
    //console.log(this.props.token);
    axios
      .get(
        `http://34.64.201.219:8080/api/v1/comments/${id}?page=${this.state.page}`,
        {
          headers: {
            //this.props.token,

            Authorization: this.props.token,
            //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjE2MTIzNTc1LCJleHAiOjE2MTYxNjY3NzV9.C8ImSasuC6B4U1jDuKRA89udL1uMUvEqrxGOttNYDxA',
          },
        },
      )
      .then((response) => {
        this.setState({
          DATA: this.state.DATA.concat(response.data.data),
          value: '',
          page: this.state.page + 1,
        });
      })
      .catch((error) => {
        //console.log(this.props.token);
        console.log(error);
      });
  }
  postComments() {
    const {id} = this.props.route.params;
    Keyboard.dismiss();
    //아직 댓글을 추가 해야만 댓글 나옴.
    if (this.state.value === '') {
      alert('내용을 입력하세요.');
      return;
    }
    axios
      .post(
        `http://34.64.201.219:8080/api/v1/comments/${id}`,
        {content: this.state.value},
        {
          headers: {
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjE2MTIzNTc1LCJleHAiOjE2MTYxNjY3NzV9.C8ImSasuC6B4U1jDuKRA89udL1uMUvEqrxGOttNYDxA',
          },
        },
      )
      .then((response) => {
        //console.log(response.data.data);
        //console.log(this.state.DATA);
        //this.getComments();
        this.setState({
          DATA: this.state.DATA.concat(response.data.data),
          value: '',
          //page: this.state.page + 1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  scrollScreen() {
    this.flatListRef.current.scrollToOffset({animated: true, offset: 0});
  }
  focusInput() {
    this.myRef.current.focus();
  }
  loadMore() {
    this.getComments();
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <FlatList
            ref={this.flatListRef}
            data={this.state.DATA}
            renderItem={({item}) => {
              return renderItem({item}, this.focusInput);
            }}
            keyExtractor={(item) => item.id}
            onEndReached={this.loadMore}
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
                onFocus={this.scrollScreen}
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

const CmtList = (props) => {
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
              {props.name}
            </Text>
          </TouchableOpacity>
          <Text style={{fontSize: hp('2.3%')}}>{props.content}</Text>
        </View>
        <View style={styles.cmtExtraView}>
          <Text
            style={{
              color: 'grey',
              marginRight: wp('8%'),
              fontSize: hp('1.8%'),
            }}>
            {props.time}시간 전
          </Text>
          <TouchableOpacity onPress={props.func1}>
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
};

const CmtLikes = () => {
  const [isLikes, setIsLikes] = React.useState(true);
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

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(CommentScreen);
