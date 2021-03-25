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

const ClickedPic = ({item, TabNavigation, user_id}) => {
  const navigation = useNavigation();

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
                style={{height: 60, width: 60, marginLeft: 5}}
                source={require('../images/noProfile.png')}
              />
              <Text style={styles.PostedByText}>{user_id}</Text>
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
            <Text style={styles.toBold}>Jandi</Text>
            <Text style={styles.defaultTextSize}>님 외 </Text>
            <Text style={styles.toBold}>{item.likes}</Text>
            <Text style={styles.defaultTextSize}>명이 좋아합니다</Text>
          </View>
        </View>

        {/* posted text ----*/}
        <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 5}}>
          <Text style={styles.toBold}>{user_id}</Text>
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
