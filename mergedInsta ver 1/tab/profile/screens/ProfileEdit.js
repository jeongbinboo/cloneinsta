import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

//redux
import {connect} from 'react-redux';
import {change_info} from '../../../redux/action';

//axios
import axios from 'axios';

let changeUserId;
let changeName;

export const alr = () => {
  //user_id, name
  //this.props.dispatchChangeInfo(changeUserId, changeName);

  mapDispatchToProps.dispatchChangeInfo(changeUserId, changeName);

  //mapDispatchToProps.dispatchChangeInfo(changeUserId, changeName);
  mapDispatchToProps.hi();
  //mapStateToProps();
};

const ProfileEdit = ({TabNavigation, name, user_id}) => {
  //TabNavigation.setOptions({tabBarVisible: false});
  useEffect(() => {
    TabNavigation.setOptions({tabBarVisible: false});
    changeUserId = user_id;
    changeName = name;
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <Image
          style={{height: 150, width: 150, margin: 5, alignSelf: 'center'}}
          source={require('../images/profileChange.jpg')}
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
          <TextInput style={styles.input} />
        </View>
      </View>
      {/* 바꿀 정보 입력하는 부분 */}

      <View>
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
  hi: () => console.log('click ok'),
};

const mapStateToProps = (state) => {
  return {
    token: state.userReducer.token,
    user_id: state.userReducer.user_id,
    name: state.userReducer.name,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
