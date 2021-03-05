import React from 'react';
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

//component
//import FollwerItem from '../components/FollowerItem';

const FollowList = ({route, navigation}) => {
  const {FollowFlag} = route.params;
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
      <TopTab.Screen name="팔로워" component={Follower} />
      <TopTab.Screen name="팔로잉" component={Following} />
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

const FollowerItem = (item) => (
  <View style={styles.FollowerItemView}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image style={{height: 70, width: 70}} source={item.image} />
      <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 17}}>
        {item.name}
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
      <Image style={{height: 70, width: 70}} source={item.image} />
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

const Follower = () => (
  <View style={{backgroundColor: 'white'}}>
    <FlatList
      data={FollowerData}
      renderItem={({item}) => {
        return FollowerItem(item);
      }}
      keyExtractor={(item) => item.id}
    />
  </View>
);

const Following = () => (
  <View style={{backgroundColor: 'white'}}>
    <FlatList
      data={FollowingData}
      renderItem={({item}) => {
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

export default FollowList;
