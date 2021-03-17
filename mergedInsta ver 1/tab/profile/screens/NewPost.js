import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import axios from 'axios';

//let token;

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
  constructor(props) {
    super(props);
    this.state = {
      postList: 'gd',
      content: '',
    };
  }

  componentDidMount() {
    this.props.TabNavigation.setOptions({tabBarVisible: false});
    //this.getPosts();
  }

  createPost = (content) => {};

  getPosts = () => {
    //다예가 수정 하고 쓸 것
    axios
      .get('http://34.64.201.219:8080/api/v1/posts', {
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjE1OTc5MjU2LCJleHAiOjE2MTYwMjI0NTZ9.PMipEJkxGrSNpFF6sizN7ECCC1qhCjQrxLkDSaPGDs4',
        },
        body: {
          target_user: 'test',
        },
      })
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  postContent = (ctt) => {
    if (ctt === '') {
      alert('fill content');
      return;
    }
    axios
      .post(
        'http://34.64.201.219:8080/api/v1/posts',
        {content: ctt},
        {
          headers: {
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjE1OTc5MjU2LCJleHAiOjE2MTYwMjI0NTZ9.PMipEJkxGrSNpFF6sizN7ECCC1qhCjQrxLkDSaPGDs4',
          },
        },
      )
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  render() {
    //this.props.TabNavigation.setOptions({tabBarVisible: false});

    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            post content beta
          </Text>
          <TextInput
            style={{height: 150, width: '90%', borderWidth: 0.7, margin: 10}}
            placeholder="content"
            //style={styles.input}
            onChangeText={(text) => {
              this.setState({content: text});
            }}
          />
          <TouchableOpacity
            // style={styles.login}
            onPress={() => {
              this.postContent(this.state.content);
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>입력</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20, alignItems: 'center', borderWidth: 1}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>content List</Text>
          <ScrollView>{/*(val) => <Text>{val.token}</Text>*/}</ScrollView>
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

/*
//POST signin
{
    "user_id": "4432",
    "password": "4432"
}

//POST posts
{
    "title": "hi",
    "content": "movie"
}
*/
