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

let COMMENT_DATA = [
  //댓글 목록
  {
    id: '0',
    name: 'yeri__k',
    content: '첫번째 댓글',
  },
];

const renderItem = ({item}, func) => (
  <CmtList name={item.name} content={item.content} func={func} />
);

const CommentScreen = ({TabNavigation}) => {
  //TabNavigation.setOptions({tabBarVisible: false});
  const [value, onChangeText] = React.useState('');
  const [id, setId] = React.useState(1);
  const flatListRef = React.useRef();
  const myRef = React.useRef();
  const scrollScreen = () => {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };
  const focusInput = () => {
    myRef.current.focus();
  };
  const addCmt = () => {
    const newCmt = COMMENT_DATA.concat({
      id: id,
      name: 'anonymous',
      content: value,
    });
    COMMENT_DATA = newCmt;
    setId(id + 1);
    onChangeText('');
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={COMMENT_DATA}
          renderItem={({item}) => {
            return renderItem({item}, focusInput);
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.inputView}>
        <View style={styles.inputTextView}>
          <Ionicons name="ios-person-circle-outline" size={hp('8%')} />
          <View style={styles.submitView}>
            <TextInput
              ref={myRef}
              style={styles.textInput}
              onChangeText={(text) => onChangeText(text)}
              value={value}
              placeholder={'댓글 달기...'}
              placeholderTextColor="grey"
              onFocus={scrollScreen}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={addCmt}>
              <Text style={{color: 'skyblue', fontSize: hp('2%')}}>게시</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

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
            1시간
          </Text>
          <TouchableOpacity onPress={props.func}>
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
    color: 'transparent',
    alignItems: 'center',
  },
  textInput: {
    height: hp('5%'),
    width: wp('70%'),
    marginLeft: wp('1%'),
  },
});

export default CommentScreen;
