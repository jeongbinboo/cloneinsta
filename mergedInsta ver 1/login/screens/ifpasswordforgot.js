import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
export default class Ifpasswordforgot extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ marginTop: 20, fontWeight: "bold" }}>
            로그인에 문제가 있나요?
          </Text>
          <Text style={{ marginTop: 10 }}>
            사용자 이름 또는 이메일을 입력하면 다시 계정에
          </Text>
          <Text>로그인할 수 있는 링크를 보내드립니다.</Text>
        </View>
        <View style={styles.content}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={styles.nameortel}>
              <Text>사용자 이름</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nameortel}>
              <Text>전화번호</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="   사용자 이름 또는 이메일"
            style={styles.input}
          />
          <TouchableOpacity style={styles.next}>
            <Text style={{ color: "white" }}>다음</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.help}>도움이 더 필요하세요?</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", width: "90%", marginTop: 30 }}>
            <View style={styles.hr}></View>
            <Text style={{ color: "#AAAAAA" }}>또는</Text>
            <View style={styles.hr}></View>
          </View>
          <View style={{ flexDirection: "row", width: "50%", marginTop: 50 }}>
            <Image
              style={{ height: 25, width: 25 }}
              source={require("../images/facebook.png")}
            ></Image>
            <TouchableOpacity style={{ marginLeft: 10, color: "#0C98E2" }}>
              <Text>Facebook으로 로그인</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.backtologin}
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          >
            <Text>로그인으로 돌아가기</Text>
          </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 7,
    alignItems: "center",
  },
  footer: {
    flex: 1,
    borderTopColor: "#DDDDDD",
    borderTopWidth: 1,
    alignItems: "center",
  },
  backtologin: {
    color: "#0C98E2",
    fontSize: 15,
    marginTop: 10,
    fontWeight: "bold",
  },
  nameortel: {
    borderBottomWidth: 1,
    width: "45%",
    alignItems: "center",
    fontSize: 20,
  },
  input: {
    height: 40,
    width: "90%",
    borderColor: "#CCCCCC",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
  },
  next: {
    height: 40,
    width: "90%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "skyblue",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  help: {
    color: "#279FE7",
    paddingTop: 15,
  },
  hr: {
    flex: 1,
    width: "30%",
    marginTop: 10,
    borderTopColor: "#DDDDDD",
    borderTopWidth: 1,
  },
});
