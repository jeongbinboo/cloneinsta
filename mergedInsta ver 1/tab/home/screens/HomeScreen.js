import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//AXIOS
import axios from 'axios';

//SCREEN
import ModalScreen from '../modals/modalScreen';
import Story from '../components/Story';
import Content from '../components/Content';

let CONTENT_DATA = [
  //업로드 글 항목
  {
    id: '1',
    src: require('../images/1.jpg'),
    name: 'daaaayey',
  },
  {
    id: '2',
    src: require('../images/2.png'),
    name: 'yeri__k',
  },
  {
    id: '3',
    src: require('../images/3.jpg'),
    name: 'miseong_k',
  },
  {
    id: '4',
    src: require('../images/4.png'),
    name: 'm0ovie',
  },
  {
    id: '5',
    src: require('../images/5.jpg'),
    name: 'm0ovie',
  },
  {
    id: '6',
    src: require('../images/6.jpg'),
    name: 'm0ovie',
  },
  {
    id: '7',
    src: require('../images/7.jpg'),
    name: 'm0ovie',
  },
];

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {isModal: false};
  }

  toggleModal() {
    this.setState({
      isModal: !this.state.isModal,
    });
  }
  renderItem({item}) {
    return (
      <Content
        name={item.name}
        src={item.src}
        modalHandler={() => this.toggleModal()}
        navigation={this.props.navigation}
      />
    );
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.storyView}>
          <ScrollView horizontal={true}>
            <Story name="내 스토리" />
            <Story name="yeri__k" />
            <Story name="m0ovie" />
            <Story name="negative_bin" />
            <Story name="James_Jung" />
            <Story name="daaaayey" />
            <Story name="miseong_k" />
          </ScrollView>
        </View>
        <FlatList
          data={CONTENT_DATA}
          renderItem={({item}) => {
            return this.renderItem({item});
          }}
          keyExtractor={(item) => item.id}
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

export default HomeScreen;
