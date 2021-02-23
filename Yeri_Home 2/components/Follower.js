import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();

const Follow = ({route, navigation}) => {
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

const Follower = () => (
  <View>
    <Text>팔로워</Text>
  </View>
);

const Following = () => (
  <View>
    <Text>팔로잉</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Follow;
