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
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

const COMMENT_DATA = [
  //댓글 목록
  {
    id: '1',
    name: 'James_Jung',
    content: '와 정말 귀여워요~',
  },
  {
    id: '2',
    name: 'yeri__k',
    content: '우와~',
  },
  {
    id: '3',
    name: 'James_Jung',
    content: '와 정말 귀여워요~',
  },
  {
    id: '4',
    name: 'yeri__k',
    content: '우와~',
  },
  {
    id: '5',
    name: 'James_Jung',
    content: '와 정말 귀여워요~',
  },
  {
    id: '6',
    name: 'yeri__k',
    content: '우와~',
  },
  {
    id: '7',
    name: 'James_Jung',
    content: '와 정말 귀여워요~',
  },
  {
    id: '8',
    name: 'yeri__k',
    content: '우와~',
  },
  {
    id: '9',
    name: 'James_Jung',
    content: '와 정말 귀여워요~',
  },
  {
    id: '10',
    name: 'yeri__k',
    content: '우와~',
  },
  {
    id: '11',
    name: 'James_Jung',
    content: '와 정말 귀여워요~',
  },
  {
    id: '12',
    name: 'yeri__k',
    content: '우와~',
  },
];

const renderItem = ({item}) => (
  <CmtList name={item.name} content={item.content} />
);

const CommentScreen = () => {
  const [value, onChangeText] = React.useState('');
  return (
    <>
      <View style={styles.Cmtcontainer}>
        <KeyboardAwareFlatList
          data={COMMENT_DATA}
          renderItem={({item}) => {
            return renderItem({item});
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <KeyboardAwareScrollView style={styles.inputView} scrollEnabled={false}>
        <View style={styles.IconView}>
          <Emoji />
          <Emoji />
          <Emoji />
          <Emoji />
          <Emoji />
          <Emoji />
          <Emoji />
          <Emoji />
        </View>
        <View style={styles.inputTextView}>
          <Ionicons name="ios-person-circle-outline" size={60} />
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            placeholder={'댓글 달기...'}
            placeholderTextColor="grey"
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const Emoji = () => {
  return (
    <Ionicons
      name="ios-happy"
      size={33}
      style={{marginLeft: '2%', marginRight: '2%'}}
    />
  );
};

const CmtList = (props) => {
  return (
    <View style={styles.cmtView}>
      <View style={{marginRight: '1%'}}>
        <Ionicons name="ios-person-circle-outline" size={50} />
      </View>
      <View style={styles.cmt}>
        <View>
          <TouchableOpacity>
            <Text style={{fontWeight: 'bold', marginRight: '2%', fontSize: 16}}>
              {props.name}
            </Text>
          </TouchableOpacity>
          <Text style={{fontSize: 16}}>{props.content}</Text>
        </View>
        <View style={styles.cmtExtraView}>
          <Text style={{color: 'grey', marginRight: '8%', fontSize: 13}}>
            1시간
          </Text>
          <TouchableOpacity>
            <Text style={{fontWeight: 'bold', color: 'grey', fontSize: 13}}>
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
        size={20}
        color="grey"
        onPress={() => setIsLikes(!isLikes)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Cmtcontainer: {
    height: '83%',
    //backgroundColor: 'orange',
  },
  cmtView: {
    flex: 1,
    //height: '20%',
    marginTop: '1%',
    marginBottom: '1%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  cmt: {
    width: '75%',
    height: '100%',
    flexDirection: 'column',
  },
  cmtContent: {
    height: '60%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: '1%',
  },
  cmtExtraView: {
    height: '40%',
    //justifyContent: 'center',
    paddingLeft: '1%',
    flexDirection: 'row',
  },
  LikesIcon: {
    width: '11%',
    marginLeft: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  IconView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '1%',
    //height: '100%',
    width: '100%',
    //position: 'absolute',
    //bottom: 50,
  },
  inputTextView: {
    flex: 1,
    //height: '70%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    marginLeft: '1%',
  },
});

export default CommentScreen;
