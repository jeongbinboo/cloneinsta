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

//redux
import {connect} from 'react-redux';

//axios
import axios from 'axios';

class ProfileHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchPicListFlag: 1,
      bio: '',
      postData: [],
    };
    //this.getProfile();
    //this.getPosts();
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

  getProfile = async () => {
    //console.log(this.props.user_id);
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
          bio: response.data.data[0].bio,
        });
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
          bio={this.state.bio}
          name={this.props.name}
          postData={this.state.postData}
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
  bio,
}) => {
  return (
    <View>
      {/* profile picture + follow list */}
      <View style={styles.profileAndFollowView}>
        <Image
          style={{height: 100, width: 100}}
          source={require('../images/noProfile.png')}
        />

        <View style={styles.followTextView}>
          <TouchableOpacity>
            <Text style={styles.followNumText}>3</Text>
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
        <Text style={{marginLeft: 10}}>{bio}</Text>
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
      <ScrollView
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
      </ScrollView>

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
  bio,
  postData,
}) => {
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
          bio={bio}
        />
      )}
      //style={{flexDirection: 'row'}}
      numColumns={3}
      data={postData}
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
    />
  );
};

const TaggedPicList = () => {};

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
});

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  user_id: state.userReducer.user_id,
});

export default connect(mapStateToProps)(ProfileHome);
