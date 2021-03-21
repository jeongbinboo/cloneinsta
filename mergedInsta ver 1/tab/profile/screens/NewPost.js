import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import axios from 'axios';
import {connect} from 'react-redux';
//import movie_pic1 from '../images/movie_pic1.PNG';

let plz;

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: 'gd',
      content: '',
      pd: [],
    };
  }

  componentDidMount() {
    this.props.TabNavigation.setOptions({tabBarVisible: false});
    this.getPosts();
  }

  createPost = (content) => {};

  getPosts = async () => {
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
        this.setState({
          pd: response.data.data[0],
        });
      })
      .catch((error) => {
        console.log(error);
        //console.log(this.props.user_id);
      });
  };

  postContent = (ctt) => {
    if (ctt === '') {
      alert('fill content');
      return;
    }

    // const fd = new FormData();
    // fd.append('image', {
    //   uri: 'D:mergedInsta\tabprofileimagesmovie_pic1.PNG',
    //   type: 'image/jpeg',
    //   name: 'movie_pic1.PNG',
    // });
    /*
    axios
      .post(
        `${axios.defaults.baseURL}/files`,
        {files: 'D:mergedInsta\tabprofileimagesmovie_pic1.PNG'},
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        console.log(response);
        pictureUrl = response.data.data[0];
      })
      .catch((error) => {
        console.log(error);
        console.log('pic upload error');
      });
      */

    axios
      .post(
        `${axios.defaults.baseURL}posts`,
        {content: ctt, image: ['1616328173560_movie_pic1.PNG']},
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log('post error');
      });
  };

  render() {
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
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>content List</Text>
          <ScrollView>
            <View style={{borderWidth: 1, padding: 5, margin: 10}}>
              <Text style={{color: 'black'}}>{this.state.pd.id}</Text>
              <Text>{this.state.pd.content}</Text>
              <Image
                style={{height: 100, width: 100}}
                source={{
                  uri: `http://34.64.201.219:8080/api/v1/uploads/${this.state.pd.image}`,
                }}
              />
              <Text>{this.props.user_id}</Text>
            </View>
          </ScrollView>
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

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  user_id: state.userReducer.user_id,
});

export default connect(mapStateToProps)(NewPost);
