import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';

//nav
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

//icon
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens
//import ProfileHome from '../screens/ProfileHome';
import ProfileEdit, {alr} from '../screens/ProfileEdit';
import PostList from '../screens/PostList';
import FollowList from '../screens/FollowList';
import NewPost from '../screens/NewPost';
import CommentScreen from '../screens/CommentScreen';
import ProfileHome from '../screens/ProfileHome';
import OtherProfile from '../screens/OtherProfile';

//modals
import MakeContent from '../modals/MakeContent';

//redux
import {connect} from 'react-redux';

class StackNav extends React.Component {
  state = {};
  render() {
    //mapStateToProps();
    return (
      <Stack.Navigator>
        <Stack.Screen //ProfileHome.js
          name="Home"
          options={{
            title: `${this.props.user_id}`,
            headerRight: () => (
              <View style={styles.headerBtn}>
                <TouchableOpacity
                  onPress={() => this.props.toggleMakeContentModal()}>
                  <AntDesign name={'plus'} size={30} color={'#3F3F3F'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.toggleSettingModal()}>
                  <EvilIcons
                    style={{marginLeft: '10%'}}
                    name="navicon"
                    size={30}
                    color="#3F3F3F"
                  />
                </TouchableOpacity>
              </View>
            ),
            headerLeft: () => {
              <View></View>;
            },
            //headerTitleAlign: 'center',  //타이틀 중앙정렬
            justifyContent: 'center',
          }}>
          {({navigation}) => (
            <ProfileHome
              TabNavigation={this.props.TabNavigation}
              navigation={navigation}
              settingModal={this.props.MakeContentModal}
            />
          )}
        </Stack.Screen>

        <Stack.Screen //ProfileEdit.js
          name="ProfileEdit"
          //component={ProfileEdit}
          options={({navigation}) => ({
            headerTitle: '프로필 편집',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity
                style={{marginRight: 5}}
                onPress={() => {
                  navigation.goBack();
                  this.props.TabNavigation.setOptions({
                    tabBarVisible: true,
                  });
                }}>
                <Text style={{fontSize: 19, color: '#058FFD'}}>완료</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => {
                  navigation.goBack();
                  this.props.TabNavigation.setOptions({
                    tabBarVisible: true,
                  });
                }}>
                <Text style={{fontSize: 19, color: '#058FFD'}}>취소</Text>
              </TouchableOpacity>
            ),
          })}>
          {() => <ProfileEdit TabNavigation={this.props.TabNavigation} />}
        </Stack.Screen>

        <Stack.Screen
          name="PostList"
          component={PostList}
          options={({}) => ({
            headerTitle: '게시물',
            headerTitleAlign: 'center',
          })}
        />

        <Stack.Screen
          name="FollowList"
          component={FollowList}
          options={{
            headerTitle: `${this.props.user_id}`,
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen name="MakeContent">{() => <MakeContent />}</Stack.Screen>

        <Stack.Screen
          name="NewPost"
          //component={NewPost}
          options={({navigation}) => ({
            headerTitle: '새 게시물',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerRight: () => (
              <TouchableOpacity style={{marginRight: 5}}>
                <Text style={{fontSize: 19, color: '#058FFD'}}>다음</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => {
                  navigation.goBack();
                  this.props.TabNavigation.setOptions({
                    tabBarVisible: true,
                  });
                }}>
                <AntDesign
                  name={'arrowleft'}
                  size={25}
                  color={'white'}
                  style={{margin: 5}}
                />
              </TouchableOpacity>
            ),
          })}>
          {() => <NewPost TabNavigation={this.props.TabNavigation} />}
        </Stack.Screen>

        <Stack.Screen
          name="CommentScreen"
          component={CommentScreen}
          options={({navigation}) => ({
            headerTitle: '댓글',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => {
                  navigation.goBack();
                  this.props.TabNavigation.setOptions({
                    tabBarVisible: true,
                  });
                }}>
                <AntDesign
                  name={'arrowleft'}
                  size={25}
                  color={'#3F3F3F'}
                  style={{margin: 5}}
                />
              </TouchableOpacity>
            ),
          })}
        />

        {/* TabNavigation={this.props.TabNavigation} */}

        <Stack.Screen
          name="OtherProfile"
          component={OtherProfile}
          options={{
            headerTitle: `otherprofile`,
            headerTitleAlign: 'center',
          }}
        />

        {/* <Stack.Screen
          name="CommentScreen"
          options={({navigation}) => ({
            headerTitle: '댓글',
            headerTitleAlign: 'center',
          })}>
          {() => <CommentScreen TabNavigation={this.props.TabNavigation} />}
        </Stack.Screen> */}
      </Stack.Navigator>
    );
  }
}

const HeaderIcon = (props) => {
  return (
    <TouchableOpacity>
      <Ionicons.Button
        name={props.name}
        size={35}
        color="black"
        backgroundColor="transparent"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
});

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
  user_id: state.userReducer.user_id,
  name: state.userReducer.name,
});

export default connect(mapStateToProps, mapDispatchToProps)(StackNav);
