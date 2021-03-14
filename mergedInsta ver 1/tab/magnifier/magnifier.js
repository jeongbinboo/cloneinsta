import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Files from './components/Files';
import TouchBoxes from './components/touchboxes';
class Magnifier extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={styles.input}>
            <Icon name="search-outline" size={20} />
            <TextInput placeholder="검색" style={styles.input2}></TextInput>
            <Icon name="scan-outline" size={40} />
          </View>
          <TouchBoxes />
        </View>
        <View style={styles.body}>
          <Files />
        </View>
      </View>
    );
  }
}
export default Magnifier;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    flex: 1,
  },
  body: {
    flex: 5,
  },
  input: {
    width: '85%',
    height: '40%',
    backgroundColor: 'lightgray',
    marginLeft: 10,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input2: {
    width: '96%',
  },
});
