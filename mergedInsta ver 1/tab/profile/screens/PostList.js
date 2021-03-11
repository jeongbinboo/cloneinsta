import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
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

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  /*
  handlePostFocus = () => {
    const {scrollHeight, clientHeight} = this.myRef;
    this.myRef.scrollTop = scrollHeight - clientHeight;
  };
*/
  /*
  toIndex = () => {
    this.myRef.scrollToIndex({
      index: 1,
    });
  };
*/

  toIndex = (idx) => {
    this.myRef.scrollToIndex({
      index: idx,
    });
  };

  render() {
    const {picId} = this.props.route.params;
    console.log(this.props.route.params.picId);
    return (
      <>
        {/* <Button
          title="밑으로"
          //onPress={() => this.myRef.current.scrollToEnd({animated: false})}
          //onPress={() => this.myRef.handlePostFocus()}
          //onPress={() => this.myRef.current.scrollTo(10, 10)}
          onPress={(idx) => this.toIndex(1)}
        /> */}
        <FlatList
          //ref={(ref) => (this.myRef = ref)}
          initialScrollIndex={picId}
          //onScrollToIndexFailed={0}
          onScrollToIndexFailed={() => {
            console.log('error');
          }}
          onContentSizeChange={() => {
            //this.myRef.current.scrollToEnd({animated: false}); //이거됨
          }}
          on
          style={{backgroundColor: 'white'}}
          data={PostData}
          renderItem={({item}) => {
            return <ClickedPic item={item} PostData={PostData} />;
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
