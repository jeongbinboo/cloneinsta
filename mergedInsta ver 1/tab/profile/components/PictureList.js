import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import axios from 'axios';

const PictureList = ({navigation, toIndex, TabNavigation}) => {
  useEffect(() => {
    getPosts();
  }, []);

  const [postData, setPostData] = useState([]);

  const getPosts = async () => {
    axios
      .get(`${axios.defaults.baseURL}posts/movie`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
        params: {
          user_id: 'movie',
        },
      })
      .then((response) => {
        setPostData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //console.log(postData.length);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('PostList', {
              picId: 0,
              TabNavigation: TabNavigation,
            });
          }}>
          <View>
            <Image
              style={{height: 130, width: 130}}
              source={require('../images/pic7.jpg')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.push('PostList', {
              picId: 1,
              TabNavigation: TabNavigation,
            });
          }}>
          <View>
            <Image
              style={{height: 130, width: 130}}
              source={require('../images/pic1.jpg')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexWrap: 'nowrap',
  },
});

export default PictureList;
