import axios from 'axios';
import React, {Component} from 'react';
import {TouchableHighlight} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, View, ScrollView, Image, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default class Files extends React.Component {
  state = {
    data: [],
    page: 1,
    refreshing: false,
  };
  _renderItem = ({item}) => (
    <React.Fragment>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.touch}>
          <Image
            source={{
              uri: `http://34.64.201.219:8080/api/v1/uploads/${this.state.data[0]}`,
            }}
            style={styles.pict}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touch}>
          <Image
            source={{
              uri: `http://34.64.201.219:8080/api/v1/uploads/${this.state.data[1]}`,
            }}
            style={styles.pict}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touch}>
          <Image
            source={{
              uri: `http://34.64.201.219:8080/api/v1/uploads/${this.state.data[2]}`,
            }}
            style={styles.pict}
          />
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
  _getData = () => {
    axios
      .get(`${axios.defaults.baseURL}files`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        const rdn = Math.floor(Math.random() * 18);
        this.setState({
          data: this.state.data.concat(response.data.data[rdn].url),
          page: this.state.page + 1,
          refreshing: false,
        });
      });
  };
  _handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
        page: 1,
      },
      this._getData,
    );
  };
  componentDidMount() {
    this._getData();
  }
  _handleLoadMore = () => {
    this._getData();
  };
  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => item.id}
        onEndReached={this._handleLoadMore}
        onEndReachedThreshold={1}
        refreshing={this.state.refreshing}
        onRefresh={this._handleRefresh}
      />
    );
  }
}

const styles = StyleSheet.create({
  touch: {
    flex: 1,
  },
  pict: {
    width: '100%',
    height: 150,
    margin: 1,
  },
});
