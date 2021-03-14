import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

class TouchBoxes extends React.Component {
  render() {
    return (
      <ScrollView
        horizontal={true}
        //showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <TouchableOpacity>
          <Text style={styles.scrollbox}>IGTV</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.scrollbox}>여행</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.scrollbox}>건축</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.scrollbox}>장식</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.scrollbox}>스타일</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.scrollbox}>음식</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.scrollbox}>예술</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.scrollbox}>DIY</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.scrollbox}>뷰티</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.scrollbox}>음악</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.scrollbox}>TV 및 영화</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.scrollbox}>스포츠</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  scrollbox: {
    margin: 10,
    marginRight: 0,
    width: 80,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 10,
  },
});
export default TouchBoxes;
