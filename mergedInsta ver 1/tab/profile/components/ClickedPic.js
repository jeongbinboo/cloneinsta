import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

//nav
import {useNavigation} from '@react-navigation/native';

//Icon
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

//comment
import CommentScreen from '../screens/CommentScreen';

//재사용할 컴포넌트

const ClickedPic = ({item, PostData, myRef}) => {
  const navigation = useNavigation();
  return (
    <View
      style={styles.container}
      /*
      onContentSizeChange={() => {
        //myRef.current.scrollTo({index: item.id, animated: false});
        myRef.current.scrollToEnd({animated: false});
      }}*/
    >
      <View>
        <PostedBy />
        <Image
          style={{height: 400, width: '100%', marginTop: 5}}
          source={item.image}
        />
        <BtnToExpression
          navigation={navigation}
          item={item}
          PostData={PostData}
        />
        <PostedText item={item} />
        <Comment item={item} />
        <Text style={{marginLeft: 10, marginTop: 5, color: '#6e6e6e'}}>
          {item.timeStamp}
        </Text>
      </View>
    </View>
  );
};

const PostedBy = () => (
  <View style={styles.PostedByView}>
    <TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{height: 60, width: 60, marginLeft: 5}}
          source={require('../images/profileChange.jpg')}
        />
        <Text style={styles.PostedByText}>m0ovie</Text>
      </View>
    </TouchableOpacity>

    <View style={{marginRight: 10}}>
      <TouchableOpacity>
        <Feather name={'more-horizontal'} size={30} color={'#3F3F3F'} />
      </TouchableOpacity>
    </View>
  </View>
);

const BtnToExpression = ({navigation, item, PostData}) => {
  //console.log(PostData);
  return (
    <View style={styles.BtnExpView}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.Btn}>
            <AntDesign name={'hearto'} size={30} color={'#3F3F3F'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() =>
              navigation.navigate('CommentScreen', {id: item.id, pd: PostData})
            }>
            <Ionicons name={'chatbubble-outline'} size={30} color={'#3F3F3F'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Btn}>
            <Image
              style={{height: 30, width: 30}}
              source={require('../images/send.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.Btn}>
            <Feather name={'bookmark'} size={30} color={'#3F3F3F'} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop: 10, marginLeft: 10, flexDirection: 'row'}}>
        <Text style={styles.toBold}>Jandi</Text>
        <Text style={styles.defaultTextSize}>님 외 </Text>
        <Text style={styles.toBold}>{item.likeNum}</Text>
        <Text style={styles.defaultTextSize}>이 좋아합니다</Text>
      </View>
    </View>
  );
};

const PostedText = ({item}) => (
  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 5}}>
    <Text style={styles.toBold}>M0ovie</Text>
    <Text style={[styles.defaultTextSize, {marginLeft: 10}]}>
      {item.writing}
    </Text>
  </View>
);

const Comment = ({item}) => (
  <View>
    <TouchableOpacity>
      <Text style={{marginLeft: 10, marginTop: 5, color: '#6e6e6e'}}>
        댓글 {item.commmentNum}개 모두 보기
      </Text>
    </TouchableOpacity>
    <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 5}}>
      <Text style={styles.toBold}>{item.commentPerson[0]}</Text>
      <Text style={[styles.defaultTextSize, {marginLeft: 10}]}>
        {item.comment[0]}
      </Text>
    </View>
    <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 5}}>
      <Text style={styles.toBold}>{item.commentPerson[1]}</Text>
      <Text style={[styles.defaultTextSize, {marginLeft: 10}]}>
        {item.comment[1]}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 30,
  },
  PostedByView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  PostedByText: {
    fontWeight: 'bold',
    //textAlign: 'center',
    fontSize: 17,
    marginLeft: 10,
  },
  BtnExpView: {
    //marginTop: 10,
  },
  Btn: {
    margin: 10,
  },
  toBold: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  defaultTextSize: {
    fontSize: 15,
  },
});

export default ClickedPic;
