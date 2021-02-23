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
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
`;

export default class Join extends Component {
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>instagram</Text>
            <Text
              style={{ fontSize: "13px", marginTop: "10px", color: "gray" }}
            >
              친구들의 사진과 동영상을 보려면 가입하세요.
            </Text>
          </View>
          <View style={styles.content}>
            <TouchableOpacity style={styles.login}>
              <View style={{ flexDirection: "row", width: "50%" }}>
                <Image
                  style={{ height: "25px", width: "25px" }}
                  source={require("../../image/facebook2.png")}
                ></Image>
                <Text
                  style={{
                    marginLeft: "10px",
                    color: "white",
                    fontSize: "13px",
                    marginTop: "3px",
                  }}
                >
                  Facebook으로 로그인
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{ flexDirection: "row", width: "90%", marginTop: "30px" }}
            >
              <View style={styles.hr}></View>
              <Text style={{ color: "#AAAAAA" }}>또는</Text>
              <View style={styles.hr}></View>
            </View>
            <TouchableOpacity
              style={{ color: "#0C98E2", marginTop: "30px", fontSize: "13px" }}
            >
              휴대폰 번호 또는 이메일 주소로 가입
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
              <Text style={{ fontSize: "13px", color: "gray" }}>
                이미 계정이 있으신가요?{" "}
              </Text>
              <TouchableOpacity
                style={{ color: "#0C98E2", fontSize: "14px" }}
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
              >
                로그인
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
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
    fontFamily: "Georgia",
    marginTop: "50px",
  },
  content: {
    flex: 7,
    alignItems: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    borderTopColor: "#DDDDDD",
    borderTopWidth: "1px",
  },
  login: {
    height: 40,
    width: "90%",
    borderRadius: "5px",
    backgroundColor: "#0C98E2",
    marginTop: "30px",
    alignItems: "center",
    justifyContent: "center",
  },
  hr: {
    flex: 1,
    width: "30%",
    marginTop: "10px",
    borderTopColor: "#DDDDDD",
    borderTopWidth: 1,
  },
});
