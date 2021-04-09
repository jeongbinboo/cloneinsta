import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

//components
import Story from '../components/Story';
//import PictureList from '../components/PictureList';
//import TagPicList from '../components/TagPicList';

//icon
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//redux
import {connect} from 'react-redux';
//import {set_bio} from '../../../redux/action';

//axios
import axios from 'axios';
const OtherProfileContext = React.createContext();

import {useNavigation} from '@react-navigation/native';

class OtherProfile extends React.Component {
  constructor(props) {
    //const navigation = useNavigation();
    super(props);
    this.state = {
      switchPicListFlag: 1,
      profileImage: '',
      bio: '',
      postData: [],
      followFlag: true,
    };
    //console.log(props);
  }

  componentDidMount() {
    this.getProfile();
    this.getPosts();
  }

  mineToTag() {
    this.setState({
      switchPicListFlag: 2,
    });
    console.log('mineToTag');
  }

  tagToMine() {
    this.setState({
      switchPicListFlag: 1,
    });
    console.log('tagToMine');
  }

  getProfile = () => {
    axios
      .get(
        `${axios.defaults.baseURL}users/${this.props.route.params.other_id}`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
          params: {
            user_id: `${this.props.route.params.other_id}`,
          },
        },
      )
      .then((response) => {
        //console.log(response.data.data[0]);
        this.setState({
          profileImage: response.data.data[0].profile_image,
          bio: response.data.data[0].bio,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getPosts = () => {
    axios
      .get(
        `${axios.defaults.baseURL}posts/${this.props.route.params.other_id}`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
          params: {
            user_id: `${this.props.route.params.other_id}`,
          },
        },
      )
      .then((response) => {
        console.log('게시물');
        this.setState({
          postData: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  unFollow = (userId) => {
    axios
      .put(`${axios.defaults.baseURL}users/${userId}/unfollow`, '', {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
          'Content-Length': '0',
        },
        params: {
          user_id: `${userId}`,
        },
      })
      .then((response) => {
        console.log(`successfully unfollow #${userId}`);
        //getFollowees();
        this.setState({
          followFlag: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <OtherProfileContext.Provider
        value={{
          switchPicListFlag: this.state.switchPicListFlag,
          mineToTag: this.mineToTag,
          tagToMine: this.tagToMine,
          other_id: this.props.route.params.other_id,
          //profileImage: this.state.profileImage,
          bio: this.state.bio,
          postData: this.state.postData,
          unFollow: this.unFollow,
          followFlag: this.state.followFlag,
        }}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          {/* <HeaderProfile /> */}
          <PicListOfOther />
        </View>
      </OtherProfileContext.Provider>
    );
  }
}

const HeaderProfile = () => {
  return (
    <OtherProfileContext.Consumer>
      {(val) => (
        <View>
          <View style={styles.profileAndFollowView}>
            <View>
              <Image
                style={{margin: 10, height: 90, width: 90, borderRadius: 60}}
                //source={require('../images/noProfile.png')}
                source={{
                  uri:
                    'https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_ohc=NyXVWUpcBzMAX9SGJRm&edm=ANmP7GQAAAAA&ccb=7-4&oh=540c619fc854da05f400a2750451847d&oe=608E2CCF&_nc_sid=276363&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-4',
                }}
              />
            </View>

            <View style={styles.followTextView}>
              <TouchableOpacity>
                <Text style={styles.followNumText}>{/*postData.length*/}1</Text>
                <Text style={styles.followNumText}>게시물</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.followTextView}>
              <TouchableOpacity
              /*onPress={() => navigation.navigate('FollowList', {FollowFlag: 1})}*/
              >
                <Text style={styles.followNumText}>0</Text>
                <Text style={styles.followNumText}>팔로워</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.followTextView}>
              <TouchableOpacity
              /*
               onPress={() =>
                 navigation.navigate('FollowList', {
                   FollowFlag: 2,
                 })
               }*/
              >
                <Text style={styles.followNumText}>1</Text>
                <Text style={styles.followNumText}>팔로잉</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={styles.nameText}>
              {/*name*/}
              {val.other_id}
            </Text>
            <Text style={{marginLeft: 10}}>
              {/*bio2*/}
              {val.bio}
            </Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={val.followFlag ? styles.followAndMsg : styles.unFollow}
              onPress={() => val.unFollow(val.other_id)}>
              <Text style={{alignSelf: 'center'}}>팔로잉</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followAndMsg}>
              <Text style={{alignSelf: 'center'}}>메시지</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View style={{flexDirection: 'row'}}>
              <View style={val.switchPicListFlag === 1 ? styles.line : null}>
                <View style={styles.selectPicIconView}>
                  <TouchableOpacity /*onPress={() => val.tagToMine()}*/>
                    <FontAwesome5
                      name="grip-horizontal"
                      size={30}
                      color="#3F3F3F"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={val.switchPicListFlag === 2 ? styles.line : null}>
                <View style={styles.selectPicIconView}>
                  <TouchableOpacity /*onPress={() => val.mineToTag()}*/>
                    <Ionicons
                      name="person-circle-outline"
                      size={30}
                      color="#3F3F3F"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </OtherProfileContext.Consumer>
  );
};

const PicListOfOther = () => {
  const navigation = useNavigation();
  //navigation.setParams({headerTitle: 'gg'});
  //const edit = navigation.getParam('edit', false);

  return (
    <OtherProfileContext.Consumer>
      {(val) => (
        <FlatList
          ListHeaderComponent={HeaderProfile}
          numColumns={3}
          data={val.postData.reverse()}
          renderItem={({item, index}) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('PostList', {
                      picId: index,
                      // TabNavigation: TabNavigation,
                      user_id: val.other_id,
                    });
                  }}>
                  <View>
                    <Image
                      style={{height: 130, width: 130}}
                      source={{
                        uri: `http://34.64.201.219:8080/api/v1/uploads/${item.image[0]}`,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </OtherProfileContext.Consumer>
  );
};

const styles = StyleSheet.create({
  profileAndFollowView: {
    //프로필 사진과 숫자들 view
    flexDirection: 'row',
  },

  followNumText: {
    //게시물, 팔로워, 팔로잉 글자, 숫자
    fontSize: 17,
    textAlign: 'center',
  },

  followTextView: {
    //팔로우 숫자와 글자 묶는 view
    padding: '6%',
    justifyContent: 'center',
  },
  nameText: {
    //이름 글자
    marginLeft: '3%',
    fontSize: 17,
    margin: '3%',
  },
  followAndMsg: {
    margin: '1%',
    marginTop: '3%',
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: 1,
    padding: '2%',
    borderColor: '#3F3F3F',
    width: '45%',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  unFollow: {
    margin: '1%',
    marginTop: '3%',
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: 1,
    padding: '2%',
    borderColor: '#3F3F3F',
    width: '45%',
    // backgroundColor: 'blue',
  },
  selectPicIconView: {
    //각각 사진 폴더 icon담은 view
    alignSelf: 'center',
    marginLeft: '22%',
    marginRight: '22%',
    marginTop: '3%',
    marginBottom: '3%',
  },
  line: {
    borderBottomWidth: 2,
  },
  TagedPic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default OtherProfile;
