import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

//redux
import {connect} from 'react-redux';
import {change_info, init_user, set_bio} from '../../../redux/action';

//axios
import axios from 'axios';

let changeUserId;
let changeName;
let changeBio;

const ProfileEdit = ({
  TabNavigation,
  name,
  user_id,
  dispatchInitUser,
  dispatchChangeInfo,
  bio2,
  dispatchSetBio,
}) => {
  useEffect(() => {
    TabNavigation.setOptions({tabBarVisible: false});
    getProfile();
    changeUserId = user_id;
    changeName = name;
  });

  const [profileImage, setProfileImage] = useState('');

  const profileEditOk = () => {
    dispatchChangeInfo(changeUserId, changeName);
    resetBio();
    Alert.alert('', '변경되었습니다.');
  };

  const editBio = (bio_) => {
    dispatchSetBio(bio_);
  };

  const resetBio = () => {
    axios
      .put(
        `${axios.defaults.baseURL}users/bio`,
        {bio: changeBio},
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        editBio(response.data.data[0].bio);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProfile = () => {
    axios
      .get(`${axios.defaults.baseURL}users/${user_id}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
        params: {
          user_id: `${user_id}`,
        },
      })
      .then((response) => {
        //setBio(response.data.data[0].bio);
        setProfileImage(response.data.data[0].profile_image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <Image
          style={{
            height: 140,
            width: 140,
            margin: 5,
            alignSelf: 'center',
            borderRadius: 70,
          }}
          //source={require('../images/profileChange.jpg')}
          source={{
            uri:
              profileImage ===
              ('' ||
                'https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_ohc=NyXVWUpcBzMAX9SGJRm&edm=ANmP7GQAAAAA&ccb=7-4&oh=540c619fc854da05f400a2750451847d&oe=608E2CCF&_nc_sid=276363&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-4')
                ? 'https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_ohc=NyXVWUpcBzMAX9SGJRm&edm=ANmP7GQAAAAA&ccb=7-4&oh=540c619fc854da05f400a2750451847d&oe=608E2CCF&_nc_sid=276363&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-4'
                : `http://34.64.201.219:8080/api/v1/uploads/${profileImage}`,
          }}
        />
        <TouchableOpacity>
          <Text style={{alignSelf: 'center', color: '#058FFD', fontSize: 15}}>
            {' '}
            프로필 사진 바꾸기{' '}
          </Text>
        </TouchableOpacity>
      </View>
      {/* 프로필 사진 바꾸기 */}

      {/* name */}
      <View style={{marginTop: '3%'}}>
        <View style={styles.changeInfoView}>
          <View style={{width: '40%'}}>
            <Text style={styles.categoryText}>이름</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              changeName = text;
              //console.log(changeName);
            }}>
            {name}
          </TextInput>
        </View>

        {/* user_id */}
        <View style={styles.changeInfoView}>
          <View style={{width: '40%'}}>
            <Text style={styles.categoryText}>사용자 이름</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              changeUserId = text;
              //console.log(changeName);
            }}>
            {user_id}
          </TextInput>
        </View>

        <View style={styles.changeInfoView}>
          <View style={{width: '40%'}}>
            <Text style={styles.categoryText}>웹사이트</Text>
          </View>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.changeInfoView}>
          <View style={{width: '40%'}}>
            <Text style={styles.categoryText}>소개</Text>
          </View>
          <TextInput
            onChangeText={(text) => {
              changeBio = text;
            }}
            style={styles.input}>
            {bio2}
          </TextInput>
        </View>
      </View>
      {/* 바꿀 정보 입력하는 부분 */}

      <View>
        <View style={styles.changeInfoView}>
          <View>
            <TouchableOpacity onPress={() => profileEditOk()}>
              <Text style={{color: 'gray', fontSize: 20}}>
                프로필 편집 저장
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.changeInfoView}>
          <View>
            <TouchableOpacity>
              <Text style={styles.changeBtnText}>프로페셔널 계정으로 전환</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.changeInfoView}>
          <View>
            <TouchableOpacity>
              <Text style={styles.changeBtnText}>개인 정보 설정</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* 전환 버튼 */}
    </View> //container
  );
};

const styles = StyleSheet.create({
  changeInfoView: {
    borderTopWidth: 1,
    borderColor: '#dcdcdc',
    padding: '5%',
    flexDirection: 'row',
  },

  input: {
    //marginLeft: '20%',
    height: 35,
    width: '60%',
    padding: 0,
    fontSize: 20,
  },

  changeBtnText: {
    fontSize: 20,
    color: '#058FFD',
  },

  categoryText: {
    fontSize: 20,
  },
});

//export default ProfileEdit;

//redux code

const mapDispatchToProps = {
  //dispatchInitUser: (token, user_id, name) => init_user(token, user_id, name),
  dispatchChangeInfo: (user_id, name) => change_info(user_id, name),
  dispatchInitUser: (token, user_id, name) => init_user(token, user_id, name),
  dispatchSetBio: (bio) => set_bio(bio),
};

const mapStateToProps = (state) => {
  return {
    token: state.userReducer.token,
    user_id: state.userReducer.user_id,
    name: state.userReducer.name,
    bio2: state.userReducer.bio,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
