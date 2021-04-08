import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
} from 'react-native';

//redux
import {connect} from 'react-redux';

//aixos
import axios from 'axios';

//image-picker
import * as ImagePicker from 'react-native-image-picker';

let plz;

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: {uri: 'https://pbs.twimg.com/media/EGR6H_dXkAE9Pu8.jpg'},
      resourcePath: '',
      content: '',
      picUrl: '',
      filename: '',
      data: {},
    };
  }

  /*
  showPicker = () => {
    // PickerDialog의 옵션 객체
    const options = {
      title: 'Select Picker', //다이얼로그의 제목
      takePhotoButtonTitle: '카메라',
      chooseFromLibraryButtonTitle: '이미지 선택',
      cancelButtonTitle: '취소',
      customButtons: [
        {name: 'fb', title: '페이스북 이미지 선택'},
        {name: 'kb', title: '카카오 이미지 선택'},
      ],
    };

    //위에서 만든 옵션을 기준으로 다이얼로그 보이기
    ImagePicker.showImagePicker(options, () => {});
  };
*/
  componentDidMount() {
    this.props.TabNavigation.setOptions({tabBarVisible: false});
  }

  postContent = (data) => {
    axios
      .post(`${axios.defaults.baseURL}files`, data, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
          'Content-Type':
            'multipart/form-data; charset=utf-8;boundary=${image_boundary}',
        },
      })
      .then((response) => {
        console.log(response);
        console.log('성공');
        //pictureUrl = response.data.data[0];
        this.setState({picUrl: response.data.data[0]});
        console.log(this.state.picUrl);
      })
      .catch((error) => {
        //console.log(this.state.filename);
        //console.log(this.state.img.uri);
        //console.log(data);
        console.log(error);
        console.log('pic upload error');
      });
  };

  /*
  postContent = () => {
    // const fd = new FormData();
    // fd.append('image', {
    //   uri: 'D:mergedInsta\tabprofileimagesmovie_pic1.PNG',
    //   type: 'image/jpeg',
    //   name: 'movie_pic1.PNG',
    // });

    axios
      .post(
        `${axios.defaults.baseURL}/files`,
        {files: `D:\mergedInsta\tab\profile\images\movie_pic1.PNG`},
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        console.log(response);
        console.log('성공');
      })
      .catch((error) => {
        console.log(error);
        console.log('pic upload error');
      });
  };
*/
  render() {
    return (
      <View style={{flex: 1, padding: 16}}>
        <Button
          onPress={() =>
            ImagePicker.launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              (response) => {
                //console.log(response);
                this.setState({resourcePath: response});
                const uri = {uri: response.uri};
                const data = new FormData();

                /*
                data.append('fileName', response.fileName);
                data.append('fileSize', response.fileSize);
                data.append('height', response.height);
                data.append('type', response.type);
                data.append('uri', response.uri);
                data.append('width', response.width);
                */
                const img = {
                  /*
                  fieldname: 'files',
                  originalname: response.fileName,
                  encoding: '7bit',
                  mimetype: response.type,
                  destination: 'uploads',
                  filename: response.fileName,
                  path: response.uri,
                  size: response.fileSize,
*/
                  fileName: response.fileName,
                  fileSize: response.fileSize,
                  height: response.height,
                  type: response.type,
                  uri: response.uri,
                  width: response.width,
                };

                data.append('files', {
                  fileName: response.fileName,
                  fileSize: response.fileSize,
                  height: response.height,
                  type: response.type,
                  uri: response.uri.replace('file://', ''),
                  width: response.width,
                  //name: response.fileName,
                });

                console.log(response);
                this.setState({data: data});
                this.setState({img: uri});
                this.setState({filename: response.fileName});
                //console.log(this.state.data);

                this.postContent(data);
              },
            )
          }
          title="Select Image"
        />
        <Text style={{margin: 8}}> {this.state.img.uri}</Text>
        <Image
          source={this.state.img}
          style={{margin: 8, width: 350, height: 350}}
        />
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
