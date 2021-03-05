import React, { Component, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";

export default class Join extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>instagram</Text>
          <Text style={{ fontSize: 13, marginTop: 10, color: "gray" }}>
            친구들의 사진과 동영상을 보려면 가입하세요.
          </Text>
        </View>
        <View style={styles.content}>
          <TouchableOpacity style={styles.login}>
            <View style={{ flexDirection: "row", width: "50%" }}>
              <Image
                style={{ height: 25, width: 25 }}
                source={require("../images/facebook2.png")}
              ></Image>
              <Text
                style={{
                  marginLeft: 10,
                  color: "white",
                  fontSize: 13,
                  marginTop: 3,
                }}
              >
                Facebook으로 로그인
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", width: "90%", marginTop: 30 }}>
            <View style={styles.hr}></View>
            <Text style={{ color: "#AAAAAA" }}>또는</Text>
            <View style={styles.hr}></View>
          </View>
          <TouchableOpacity
            style={{ color: "#0C98E2", marginTop: 30, fontSize: 13 }}
            onPress={() => {
              this.props.navigation.navigate("Signup");
            }}
          >
            <Text>휴대폰 번호 또는 이메일 주소로 가입</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 13, color: "gray" }}>
              이미 계정이 있으신가요?{" "}
            </Text>
            <TouchableOpacity
              style={{ color: "#0C98E2", fontSize: 14 }}
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
            >
              <Text>로그인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  header: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    //fontFamily: 'Georgia',
    marginTop: 50,
  },
  content: {
    flex: 7,
    alignItems: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    borderTopColor: "#DDDDDD",
    //borderTopWidth: 1,
  },
  login: {
    height: 40,
    width: "90%",
    borderRadius: 5,
    backgroundColor: "#0C98E2",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  hr: {
    flex: 1,
    width: "30%",
    marginTop: 10,
    borderTopColor: "#DDDDDD",
    borderTopWidth: 1,
  },
});
