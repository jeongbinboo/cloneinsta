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

//component
//import FollwerItem from '../components/FollowerItem';
//error while updating
const FollowList = ({route, navigation, user_id}) => {
  useEffect(() => {
    getFollowers();
  }, []);

  const {FollowFlag} = route.params;

  const [FollowerList, setFollowerList] = useState([]);

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

  //console.log(FollowerList);
  return (
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
      {/* <TopTab.Screen name="팔로워">{() => <Follower />}</TopTab.Screen>
      <TopTab.Screen name="팔로잉"> {() => <Following />}</TopTab.Screen> */}
      {/* children={() => <AdminPage userData={this.props.userSettings} />} */}
      <TopTab.Screen
        name="팔로워"
        children={() => <Follower FollowerList={FollowerList} />}
      />
      <TopTab.Screen name="팔로잉" children={() => <Following />} />
    </TopTab.Navigator>
  );
};

const FollowerData = [
  {
    id: '1',
    name: 'Jandi',
    image: require('../images/noProfile.png'),
  },
  {
    id: '2',
    name: 'James',
    image: require('../images/noProfile.png'),
  },
  {
    id: '3',
    name: 'daye',
    image: require('../images/noProfile.png'),
  },
  {
    id: '4',
    name: 'negative',
    image: require('../images/noProfile.png'),
  },
  {
    id: '5',
    name: 'misung',
    image: require('../images/noProfile.png'),
  },
];

const FollowingData = [
  {
    id: '1',
    name: 'Jandi',
    image: require('../images/noProfile.png'),
  },
  {
    id: '2',
    name: 'James',
    image: require('../images/noProfile.png'),
  },
];

const FollowerItem = ({item}) => (
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
);

const FollowingItem = (item) => (
  <View style={styles.FollowerItemView}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        style={{height: 70, width: 70}}
        source={require('../images/noProfile.png')}
      />
      <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 17}}>
        {item.name}
      </Text>
    </View>
    <View>
      <TouchableOpacity style={styles.deleteBtn}>
        <Text style={{fontWeight: 'bold'}}>팔로잉</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Follower = ({FollowerList}) => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <FlatList
        data={FollowerList}
        renderItem={({item, index}) => {
          //console.log(item);

          //return FollowerItem(item);
          return <FollowerItem item={item} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const Following = () => (
  <View style={{backgroundColor: 'white'}}>
    <FlatList
      data={FollowingData}
      renderItem={({item}) => {
        //return FollowingItem(item);
        return FollowingItem(item);
      }}
      keyExtractor={(item) => item.id}
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
