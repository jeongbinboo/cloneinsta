import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ClickedPic from '../components/ClickedPic';

let PostNum = 2;

const PostData = [
  {
    id: '1',
    image: require('../images/pic7.jpg'),
    likeNum: '48명',
    writing: '졸업하고 싶다!',
    commmentNum: '3',
    commentPerson: ['Jandi', 'James', 'daye'],
    comment: ['고양이 좋아', '고양이 사랑해', '난 사실 강아지파'],
    timeStamp: '2021년 2월 22일',
  },
  {
    id: '2',
    image: require('../images/pic1.jpg'),
    likeNum: '48명',
    writing: '눈이 이렇게나 많이 왔다~',
    commmentNum: '2',
    commentPerson: ['Jandi', 'James'],
    comment: ['영화는 최고', '그거 맞아?'],
    timeStamp: '2021년 1월 05일',
  },
];

//console.log(PostData);
//console.log(PostData[0].comment);
//console.log(PostData[0].comment[0]);

/*
flatRef.current.scrollToIndex({
  animated: false,
  index: index,
  viewPosition: 0.5,
});*/

/*
const PostList = () => (
  <FlatList
    //ref={(list) => (this.myFlatList = list)}
    style={{backgroundColor: 'white'}}
    data={PostData}
    renderItem={({item}) => {
      return <ClickedPic item={item} PostData={PostData} />;
    }}
  />
);
*/

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return (
      <>
        <FlatList
          //ref={this.myRef}
          ref={this.myRef}
          onContentSizeChange={() => {
            //this.myRef.current.scrollToEnd({animated: false}); //이거됨
          }}
          style={{backgroundColor: 'white'}}
          data={PostData}
          renderItem={({item}) => {
            return (
              <ClickedPic item={item} PostData={PostData} myRef={this.myRef} />
            );
          }}
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

export default PostList;
export {PostData};
export {PostNum};
