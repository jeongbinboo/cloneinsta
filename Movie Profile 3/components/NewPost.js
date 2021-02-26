import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import axios from 'axios';

/*
axios
  .get('http://34.64.201.219:8080/api/v1')
  .then((Response) => {
    console.log(Response.data);
  })
  .catch((Error) => {
    console.log(Error);
  });
*/

//이거 됨

/*
axios({
  method: 'POST',
  url: 'http://34.64.201.219:8080/api/v1/signin',
  data: {
    user_id: 'movie',
    password: 'mooovie',
  },
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log('!!!!!!!!!!!!!ERROR!!!!!!!!!!!\n');
    console.log(error);
  });
*/

/*
axios({
  method: 'GET',
  url: 'http://34.64.201.219:8080/api/v1/users',
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log('!!!!!!!!!!!!!ERROR!!!!!!!!!!!\n');
    console.log(error);
  });

  */

class NewPost extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.current}>
          <Text>현재 항목</Text>
        </View>
        <View style={styles.recently}>
          <Text>최근 항목</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  current: {
    flex: 1,
  },
  recently: {
    flex: 1,
  },
});

export default NewPost;
