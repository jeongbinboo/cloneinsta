import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
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
import {set_bio} from '../../../redux/action';

//axios
import axios from 'axios';

class ProfileHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchPicListFlag: 1,

      postData: [],
      profileImage: '',
    };
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

  setBio = (bio) => {
    this.props.dispatchSetBio(bio);
  };

  getProfile = async () => {
    axios
      .get(`${axios.defaults.baseURL}users/${this.props.user_id}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
        params: {
          user_id: `${this.props.user_id}`,
        },
      })
      .then((response) => {
        this.setState({
          profileImage: response.data.data[0].profile_image,
        });

        this.setBio(response.data.data[0].bio);
        if (response.data.data[0].bio == null) {
          this.setBio('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getPosts = async () => {
    axios
      .get(`${axios.defaults.baseURL}posts/${this.props.user_id}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
        params: {
          user_id: `${this.props.user_id}`,
        },
      })
      .then((response) => {
        this.setState({
          postData: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    //console.log(this.state.postData);
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <MyPicList
          navigation={this.props.navigation}
          TabNavigation={this.props.TabNavigation}
          switchPicListFlag={this.state.switchPicListFlag}
          mineToTag={() => this.mineToTag()}
          tagToMine={() => this.tagToMine()}
          profileImage={this.state.profileImage}
          name={this.props.name}
          postData={this.state.postData}
          bio2={this.props.bio2}
        />
      </View>
    );
  }
}

const HeaderProfile = ({
  name,
  navigation,
  switchPicListFlag,
  mineToTag,
  tagToMine,
  TabNavigation,
  profileImage,
  postData,
  bio2,
}) => {
  //console.log(profileImage);
  return (
    <View>
      {/* profile picture + follow list */}
      <View style={styles.profileAndFollowView}>
        <View>
          <Image
            style={{margin: 10, height: 90, width: 90, borderRadius: 60}}
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
        </View>

        <View style={styles.followTextView}>
          <TouchableOpacity>
            <Text style={styles.followNumText}>{postData.length}</Text>
            <Text style={styles.followNumText}>게시물</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.followTextView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('FollowList', {FollowFlag: 1})}>
            <Text style={styles.followNumText}>152</Text>
            <Text style={styles.followNumText}>팔로워</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.followTextView}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FollowList', {
                FollowFlag: 2,
              })
            }>
            <Text style={styles.followNumText}>161</Text>
            <Text style={styles.followNumText}>팔로잉</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* name + bio*/}
      <View>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={{marginLeft: 10}}>{bio2}</Text>
      </View>

      {/* profile edit */}
      <View>
        <TouchableOpacity
          style={styles.profileEditBtn}
          onPress={() => navigation.push('ProfileEdit')}>
          <Text style={{alignSelf: 'center'}}>프로필 편집</Text>
        </TouchableOpacity>
      </View>

      {/* story */}

      {/* <ScrollView
        horizontal={true}
        //showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </ScrollView> */}

      {/* picture display */}
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={switchPicListFlag === 1 ? styles.line : null}>
            <View style={styles.selectPicIconView}>
              <TouchableOpacity onPress={tagToMine}>
                <FontAwesome5
                  name="grip-horizontal"
                  size={30}
                  color="#3F3F3F"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={switchPicListFlag === 2 ? styles.line : null}>
            <View style={styles.selectPicIconView}>
              <TouchableOpacity onPress={mineToTag}>
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
  );
};

const MyPicList = ({
  name,
  navigation,
  switchPicListFlag,
  mineToTag,
  tagToMine,
  TabNavigation,
  postData,
  profileImage,
  bio2,
}) => {
  //console.log(postData.length);
  return (
    <FlatList
      ListHeaderComponent={() => (
        <HeaderProfile
          name={name}
          navigation={navigation}
          switchPicListFlag={switchPicListFlag}
          mineToTag={mineToTag}
          tagToMine={tagToMine}
          TabNavigation={TabNavigation}
          profileImage={profileImage}
          postData={postData}
          bio2={bio2}
        />
      )}
      //style={{flexDirection: 'row'}}
      numColumns={3}
      data={postData.reverse()}
      //inverted

      renderItem={({item, index}) => {
        //여기 수정
        //console.log(item[0]);
        if (switchPicListFlag === 1) {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('PostList', {
                    picId: index,
                    TabNavigation: TabNavigation,
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
        }
      }}
      //inverted
      //stickyHeaderIndices={[0]}
    />
  );
};

const TaggedPicList = () => (
  <View style={styles.TagedPic}>
    <AntDesign name="instagram" size={60} color="#3F3F3F" />
    <Text style={{fontSize: 20, padding: 30, fontWeight: 'bold'}}>
      회원님이 나온 사진 및 동영상
    </Text>
    <Text>사람들이 회원님을 사진또는 동영상에 태그하면</Text>
    <Text>태그된 사진 또는 동영상이 여기에 표시됩니다.</Text>
  </View>
);

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
  profileEditBtn: {
    //프로필 편집 버튼
    margin: '3%',
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: 1,
    padding: '2%',
    borderColor: '#3F3F3F',
    width: '90%',
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

const mapDispatchToProps = {
  dispatchSetBio: (bio) => set_bio(bio),
};

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  user_id: state.userReducer.user_id,
  bio2: state.userReducer.bio,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHome);
