//if click picture, this component is loaded
import React from 'react';
import {StyleSheet, FlatList} from 'react-native';

//component
import ClickedPic from '../components/ClickedPic';

//axios
import axios from 'axios';

//redux
import {connect} from 'react-redux';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      postData: [],
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = async () => {
    axios
      .get(`${axios.defaults.baseURL}posts/${this.props.user_id}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
        params: {
          user_id: `${this.props.user_id}`,
        },
      })
      .then((response) => {
        this.setState({
          postData: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  toIndex = (idx) => {
    this.myRef.scrollToIndex({
      index: idx,
    });
  };

  render() {
    const {picId, TabNavigation} = this.props.route.params;

    return (
      <>
        <FlatList
          ref={(ref) => (this.myRef = ref)}
          initialScrollIndex={picId} //
          //inverted //순서 바꿈
          onScrollToIndexFailed={(error) => {
            this.myRef.scrollToOffset({
              offset: error.averageItemLength * error.index,
              animated: false,
            });
            setTimeout(() => {
              this.myRef.scrollToIndex({
                index: error.index,
                animated: false,
              });
            }, 100);
          }}
          /*
          onScrollToIndexFailed={(error) => {
            console.log(error);
            //this.toIndex(picId);
          }}*/
          style={{backgroundColor: 'white'}}
          data={this.state.postData.reverse()}
          renderItem={({item}) => {
            return <ClickedPic item={item} TabNavigation={TabNavigation} />;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  user_id: state.userReducer.user_id,
});

export default connect(mapStateToProps)(PostList);
