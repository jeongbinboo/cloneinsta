//PostList's post
//
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

//nav
import {useNavigation} from '@react-navigation/native';

//Icon
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

//comment
import CommentScreen from '../screens/CommentScreen';

//redux
import {connect} from 'react-redux';

//axios
import axios from 'axios';

const ClickedPic = ({item, TabNavigation, user_id, id}) => {
  const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState('');

  const getProfile = async () => {
    axios
      .get(`${axios.defaults.baseURL}users/${id}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
        params: {
          user_id: `${id}`,
        },
      })
      .then((response) => {
        setProfileImage(response.data.data[0].profile_image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getProfile();

  return (
    <View style={styles.container}>
      <View>
        {/* post by ----*/}
        <View style={styles.PostedByView}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 40, width: 40, margin: 9, borderRadius: 70}}
                //source={require('../images/noProfile.png')}
                source={{
                  uri:
                    profileImage ===
                    ('' ||
                      'https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_ohc=NyXVWUpcBzMAX9SGJRm&edm=ANmP7GQAAAAA&ccb=7-4&oh=540c619fc854da05f400a2750451847d&oe=608E2CCF&_nc_sid=276363&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-4')
                      ? 'https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_ohc=NyXVWUpcBzMAX9SGJRm&edm=ANmP7GQAAAAA&ccb=7-4&oh=540c619fc854da05f400a2750451847d&oe=608E2CCF&_nc_sid=276363&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-4'
                      : `http://34.64.201.219:8080/api/v1/uploads/${profileImage}`,
                }}
              />
              <Text style={styles.PostedByText}>{id}</Text>
            </View>
          </TouchableOpacity>

          <View style={{marginRight: 10}}>
            <TouchableOpacity>
              <Feather name={'more-horizontal'} size={30} color={'#3F3F3F'} />
            </TouchableOpacity>
          </View>
        </View>
        {/* image ----*/}

        {/* <Image
          style={{height: 400, width: '100%', marginTop: 5}}
          source={item.image}
        /> */}
        <Image
          style={{height: 400, width: '100%'}}
          source={{
            uri: `http://34.64.201.219:8080/api/v1/uploads/${item.image[0]}`,
          }}
        />

        {/* button to express ----*/}
        <View style={styles.BtnExpView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.Btn}>
                <AntDesign name={'hearto'} size={30} color={'#3F3F3F'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Btn}
                onPress={() => {
                  navigation.navigate('CommentScreen', {
                    id: item.id,
                    pd: item,
                  });
                  TabNavigation.setOptions({tabBarVisible: false});
                }}>
                <Ionicons
                  name={'chatbubble-outline'}
                  size={30}
                  color={'#3F3F3F'}
                />
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
          {/* people who like my post */}
          <View style={{marginTop: 10, marginLeft: 10, flexDirection: 'row'}}>
            <Text style={styles.toBold}>{item.likes}</Text>
            <Text style={styles.defaultTextSize}>명이 좋아합니다</Text>
          </View>
        </View>

        {/* posted text ----*/}
        <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 5}}>
          <Text style={styles.toBold}>{id}</Text>
          <Text style={[styles.defaultTextSize, {marginLeft: 10}]}>
            {item.content}
          </Text>
        </View>

        {/* comment */}
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CommentScreen', {id: item.id, pd: item})
            }>
            <Text style={{marginLeft: 10, marginTop: 5, color: '#6e6e6e'}}>
              댓글 10개 모두 보기
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 5}}>
            <Text style={styles.toBold}>글쓴이</Text>
            <Text style={[styles.defaultTextSize, {marginLeft: 10}]}>댓글</Text>
          </View>
          <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 5}}>
            <Text style={styles.toBold}>글쓴이</Text>
            <Text style={[styles.defaultTextSize, {marginLeft: 10}]}>댓글</Text>
          </View>
        </View>

        {/* timestamp */}
        <Text style={{marginLeft: 10, marginTop: 5, color: '#6e6e6e'}}>
          {item.created_at}
        </Text>
      </View>
    </View>
  );
};

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

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  user_id: state.userReducer.user_id,
});

export default connect(mapStateToProps)(ClickedPic);
