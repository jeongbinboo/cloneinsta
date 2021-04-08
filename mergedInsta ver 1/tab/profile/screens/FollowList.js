import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

//TopTab
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const TopTab = createMaterialTopTabNavigator();

//axios
import axios from 'axios';

//redux
import {connect} from 'react-redux';

const FollowContext = React.createContext();

//component
//import FollwerItem from '../components/FollowerItem';
//error while updating
const FollowList = ({route, navigation, user_id}) => {
  useEffect(() => {
    getFollowers();
    getFollowees();
  }, []);

  const {FollowFlag} = route.params;

  const [FollowerList, setFollowerList] = useState([]);
  const [FolloweeList, setFolloweeList] = useState([]);

  const getFollowers = () => {
    axios
      .get(`${axios.defaults.baseURL}users/${user_id}/followers`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
        params: {
          user_id: `${user_id}`,
        },
      })
      .then((response) => {
        setFollowerList(response.data.data);
        //console.log(FollowerList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFollowees = () => {
    axios
      .get(`${axios.defaults.baseURL}users/${user_id}/followees`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
        params: {
          user_id: `${user_id}`,
        },
      })
      .then((response) => {
        setFolloweeList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unFollow = (userId) => {
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
        getFollowees();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //console.log(FollowerList);
  return (
    <FollowContext.Provider
      value={{
        unFollow: unFollow,
      }}>
      <TopTab.Navigator
        initialRouteName={FollowFlag === 1 ? '팔로워' : '팔로잉'}
        tabBarOptions={{
          pressColor: 'black',
          style: {
            backgroundColor: 'white',
          },
          indicatorStyle: {
            backgroundColor: 'black',
          },
          activeTintColor: '#000',
          inactiveTintColor: '#d1cece',
        }}>
        <TopTab.Screen
          name="팔로워"
          children={() => <Follower FollowerList={FollowerList} />}
        />
        <TopTab.Screen
          name="팔로잉"
          children={() => <Following FolloweeList={FolloweeList} />}
        />
      </TopTab.Navigator>
    </FollowContext.Provider>
  );
};

const FollowerItem = ({item}) => (
  <FollowContext.Consumer>
    {(val) => (
      <View style={styles.FollowerItemView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{height: 70, width: 70}}
            source={require('../images/noProfile.png')}
          />
          <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 17}}>
            {item.user_id}
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.deleteBtn}>
            <Text style={{fontWeight: 'bold'}}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
  </FollowContext.Consumer>
);

const FollowingItem = ({item}) => (
  <FollowContext.Consumer>
    {(val) => (
      <View style={styles.FollowerItemView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{height: 70, width: 70}}
            source={require('../images/noProfile.png')}
          />
          <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 17}}>
            {item.user_id}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => val.unFollow(item.user_id)}>
            <Text style={{fontWeight: 'bold'}}>팔로잉</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
  </FollowContext.Consumer>
);

const Follower = ({FollowerList}) => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <FlatList
        data={FollowerList}
        renderItem={({item, index}) => {
          return <FollowerItem item={item} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const Following = ({FolloweeList}) => (
  <View style={{backgroundColor: 'white'}}>
    <FlatList
      data={FolloweeList}
      renderItem={({item}) => {
        //return FollowingItem(item);
        return <FollowingItem item={item} />;
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  FollowerItemView: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteBtn: {
    marginRight: 23,
    borderWidth: 1,
    padding: 7,
    borderColor: '#d1cece',
    borderRadius: 4,
  },
});

const mapStateToProps = (state) => ({
  //name: state.userReducer.name,
  user_id: state.userReducer.user_id,
});

export default connect(mapStateToProps)(FollowList);
