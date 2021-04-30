import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//AXIOS
import axios from 'axios';

//REDUX
import {connect} from 'react-redux';

//SCREEN
import ModalScreen from '../modals/modalScreen';
import Story from '../components/Story';
import Content from '../components/Content';

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      isStory: false,
      posts: [],
      story: [{writer: this.props.user_id, url: ''}],
    };
    this.cmtRef = React.createRef();
    this.scrollTo = this.scrollTo.bind(this);
  }
  componentDidMount() {
    this.getContent();
    this.getStory();
    this.props.TabNavigation.setOptions({tabBarVisible: true});
  }
  getContent() {
    axios
      .get(`${axios.defaults.baseURL}/posts/${this.props.user_id}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        //console.log(response.data.data);
        this.setState({
          posts: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getStory() {
    axios
      .get(`${axios.defaults.baseURL}/stories/${this.props.user_id}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        this.setState({
          story: this.state.story.concat(response.data.data),
        });
        //console.log(this.state.story);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  toggleModal() {
    this.setState({
      isModal: !this.state.isModal,
    });
  }
  renderContent({item, index}, func) {
    return (
      <Content
        item={item}
        modalHandler={() => this.toggleModal()}
        navigation={this.props.StackNavi}
        cmtOpen={this.props.cmtOpen}
        func={func}
        index={index}
      />
    );
  }
  renderStory({item}) {
    return (
      <Story
        item={item}
        storyHandler={this.props.storyHandler}
        navigation={this.props.StackNavi}
      />
    );
  }
  scrollTo(index) {
    index = (index + 1) * 400 + index * 250; //..흑흑..
    this.cmtRef.current.scrollToOffset({offset: index});
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.storyView}>
          <FlatList
            horizontal
            data={this.state.story}
            renderItem={({item}) => {
              return this.renderStory({item});
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <FlatList
          ref={this.cmtRef}
          data={this.state.posts}
          renderItem={({item, index}) => {
            return this.renderContent({item, index}, this.scrollTo);
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        {this.state.isModal ? (
          <ModalScreen modalHandler={() => this.toggleModal()} />
        ) : (
          <></>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  storyView: {
    height: hp('12%'),
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'lightgray',
    borderBottomWidth: 1,
  },
});

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  user_id: state.userReducer.user_id,
});

export default connect(mapStateToProps)(HomeScreen);
