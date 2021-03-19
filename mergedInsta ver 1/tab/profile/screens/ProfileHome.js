import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

//components
import Story from '../components/Story';
import PictureList from '../components/PictureList';
import MakeContent from '../modals/MakeContent';
import TagPicList from '../components/TagPicList';

//icon
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';

class ProfileHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchPicListFlag: 1,
    };
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

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View>
          <ProfileAndFollow navigation={this.props.navigation} />

          <Name name={this.props.name} />

          <ProfileEditBtn navigation={this.props.navigation} />

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

          <PictureDisplay
            TabNavigation={this.props.TabNavigation}
            navigation={this.props.navigation}
            switchPicListFlag={this.state.switchPicListFlag}
            mineToTag={() => this.mineToTag()}
            tagToMine={() => this.tagToMine()}
          />
        </View>
      </ScrollView>
    );
  }
}

const ProfileAndFollow = ({navigation}) => (
  //프로필 사진과 팔로우 표시
  <View style={styles.profileAndFollowView}>
    <Image
      style={{height: 100, width: 100}}
      source={require('../images/profilePicture.jpg')}
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
);

const Name = ({name}) => (
  <View>
    <Text style={styles.nameText}>{name}</Text>
  </View>
);

const ProfileEditBtn = ({navigation}) => (
  <View>
    <TouchableOpacity
      style={styles.profileEditBtn}
      onPress={() => navigation.push('ProfileEdit')}>
      <Text style={{alignSelf: 'center'}}>프로필 편집</Text>
    </TouchableOpacity>
  </View>
);

const PictureDisplay = ({
  navigation,
  switchPicListFlag,
  mineToTag,
  tagToMine,
  TabNavigation,
}) => (
  <View>
    <View style={{flexDirection: 'row'}}>
      <View style={switchPicListFlag === 1 ? styles.line : null}>
        <View style={styles.selectPicIconView}>
          <TouchableOpacity onPress={tagToMine}>
            <FontAwesome5 name="grip-horizontal" size={30} color="#3F3F3F" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={switchPicListFlag === 2 ? styles.line : null}>
        <View style={styles.selectPicIconView}>
          <TouchableOpacity onPress={mineToTag}>
            <Ionicons name="person-circle-outline" size={30} color="#3F3F3F" />
          </TouchableOpacity>
        </View>
      </View>
    </View>

    {switchPicListFlag === 1 ? (
      <PictureList navigation={navigation} TabNavigation={TabNavigation} />
    ) : (
      <TagPicList />
    )}
    {/*<PictureList navigation={navigation} />*/}
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
});

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
});

export default connect(mapStateToProps)(ProfileHome);
