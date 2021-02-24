import React, { Component, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalScreen from "./modalScreen";

const CONTENT_DATA = [
  //업로드 글 항목
  {
    id: "1",
    src: require("../images/1.jpg"),
    name: "daaaayey",
  },
  {
    id: "2",
    src: require("../images/2.png"),
    name: "yeri__k",
  },
  {
    id: "3",
    src: require("../images/3.jpg"),
    name: "miseong_k",
  },
  {
    id: "4",
    src: require("../images/4.png"),
    name: "m0ovie",
  },
];

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isModal: false };
  }
  toggleModal() {
    this.setState({
      isModal: !this.state.isModal,
    });
  }
  renderItem({ item }) {
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
            <Story name="M0ovie" />
            <Story name="negative_bin" />
            <Story name="James_Jung" />
          </ScrollView>
        </View>
        <FlatList
          data={CONTENT_DATA}
          renderItem={({ item }) => {
            return this.renderItem({ item });
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

const ContentIcon = (props) => {
  const btnName = props.name;
  let tmpBtnName = "";
  const [isClicked, setIsClicked] = useState(true);
  if (btnName === "ios-heart-outline") {
    tmpBtnName = "ios-heart";
  } else if (btnName === "ios-chatbubble-outline") {
    tmpBtnName = "ios-chatbubble";
  } else if (btnName === "ios-paper-plane-outline") {
    tmpBtnName = "ios-paper-plane";
  } else {
    tmpBtnName = "ios-bookmark";
  }
  const isChat = () => {
    if (btnName === "ios-chatbubble-outline") {
      props.navigation.navigate("CommentScreen");
    } else {
      setIsClicked(!isClicked);
    }
  };
  return (
    <Ionicons.Button
      name={isClicked ? btnName : tmpBtnName}
      size={30}
      color="white"
      backgroundColor="transparent"
      onPress={() => {
        isChat();
      }}
      style={{ paddingRight: "1%" }}
    />
  );
};

const LikesId = () => {
  return (
    <View style={styles.likesId}>
      <Ionicons
        name="ios-people-circle-outline"
        size={25}
        color="white"
        style={{
          marginRight: "1%",
        }}
      />
      <Text
        style={{
          color: "white",
        }}
      >
        M0ovie 님 외 여러명이 좋아합니다.
      </Text>
    </View>
  );
};

const Comment = (props) => {
  return (
    <View style={styles.cmt}>
      <TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 17,
            paddingRight: "2%",
          }}
        >
          {props.name}
        </Text>
      </TouchableOpacity>
      <Text style={{ color: "white" }}>{props.text}</Text>
    </View>
  );
};

class Content extends HomeScreen {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.contentView}>
        <View style={styles.contentId}>
          <View style={styles.contentIcon}>
            <Ionicons
              name="ios-person-circle-outline"
              size={60}
              color="white"
            />
          </View>
          <View style={styles.content}>
            <TouchableOpacity>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {this.props.name}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentIcon}>
            <TouchableOpacity>
              <Ionicons.Button
                name="ios-ellipsis-horizontal"
                size={22}
                color="white"
                backgroundColor="transparent"
                onPress={this.props.modalHandler}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Image style={styles.imgView} source={this.props.src} />
        <View style={styles.iconView}>
          <View style={styles.mainIcon}>
            <ContentIcon name="ios-heart-outline" />
            <ContentIcon
              name="ios-chatbubble-outline"
              navigation={this.props.navigation}
            />
            <ContentIcon name="ios-paper-plane-outline" />
          </View>
          <ContentIcon name="ios-bookmark-outline" />
        </View>
        <LikesId />
        <View style={styles.cmtView}>
          <Comment name="daaaayey" text="배고프다" />
          <Comment name="miseongk_" text="나두나두~" />
        </View>
      </View>
    );
  }
}

const Story = (props) => (
  <View style={styles.storyId}>
    <TouchableOpacity>
      <Ionicons name="ios-person-circle-outline" size={65} color="white" />
    </TouchableOpacity>
    <Text style={{ fontSize: 13, color: "white" }}>{props.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  storyView: {
    height: "15%",
    alignItems: "center",
    flexDirection: "row",
  },
  storyId: {
    width: "20%",
    marginLeft: "1%",
    marginRight: "3%",
    marginBottom: "1%",
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    height: 400,
    marginVertical: 10,
  },
  contentId: {
    height: "13%",
    //marginTop: '1%',
    flexDirection: "row",
  },
  contentIcon: {
    width: "15%",
    marginLeft: "1%",
    marginRight: "1%",
    justifyContent: "center",
    alignItems: "center",
  },
  mainIcon: {
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: "1%",
  },
  content: {
    width: "66%",
    flexDirection: "column",
    justifyContent: "center",
    //alignItems:'center'
    paddingLeft: "2%",
  },
  imgView: {
    height: "50%",
    width: "100%",
    //backgroundColor: 'blue',
  },
  iconView: {
    height: "6%",
    flexDirection: "row",
    marginTop: "3%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  likesId: {
    marginTop: "2%",
    height: "7%",
    paddingLeft: "2%",
    flexDirection: "row",
    alignItems: "center",
  },
  cmtView: {
    height: "22%",
  },
  cmt: {
    height: "30%",
    paddingLeft: "2%",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default HomeScreen;
