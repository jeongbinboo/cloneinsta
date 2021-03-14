import React from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';

class Files extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('../files/최준.jpg')} style={styles.pict} />
          <Image
            source={require('../files/사쿠란보.jpg')}
            style={styles.pict}
          />
          <Image source={require('../files/떡볶이.jpg')} style={styles.pict} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('../files/한지민.jpg')} style={styles.pict} />
          <Image
            source={require('../files/브랜드별치킨.jpg')}
            style={styles.pict}
          />
          <Image source={require('../files/쿠팡.jpg')} style={styles.pict} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('../files/돈까스.jpg')} style={styles.pict} />
          <Image source={require('../files/이특.jpg')} style={styles.pict} />
          <Image source={require('../files/polo.jpg')} style={styles.pict} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('../files/이종석.jpg')} style={styles.pict} />
          <Image source={require('../files/test.jpg')} style={styles.pict} />
          <Image source={require('../files/하윤철.jpg')} style={styles.pict} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('../files/최준.jpg')} style={styles.pict} />
          <Image
            source={require('../files/사쿠란보.jpg')}
            style={styles.pict}
          />
          <Image source={require('../files/떡볶이.jpg')} style={styles.pict} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('../files/한지민.jpg')} style={styles.pict} />
          <Image
            source={require('../files/브랜드별치킨.jpg')}
            style={styles.pict}
          />
          <Image source={require('../files/쿠팡.jpg')} style={styles.pict} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('../files/돈까스.jpg')} style={styles.pict} />
          <Image source={require('../files/이특.jpg')} style={styles.pict} />
          <Image source={require('../files/polo.jpg')} style={styles.pict} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('../files/이종석.jpg')} style={styles.pict} />
          <Image source={require('../files/test.jpg')} style={styles.pict} />
          <Image source={require('../files/하윤철.jpg')} style={styles.pict} />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  pict: {
    width: '33%',
    height: 150,
    margin: 1,
  },
});
export default Files;
