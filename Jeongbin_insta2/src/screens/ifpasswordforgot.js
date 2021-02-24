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
          <Image
            style={{ height: "90px", width: "90px" }}
            source={{
              uri:
                "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-lock-22.png&r=0&g=0&b=0",
            }}
          ></Image>
          <Text style={{ marginTop: "20px", fontWeight: "bold" }}>
            로그인에 문제가 있나요?
          </Text>
          <Text style={{ marginTop: "10px" }}>
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
              사용자 이름
            </TouchableOpacity>
            <TouchableOpacity style={styles.nameortel}>
              {" "}
              전화번호
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
          <View
            style={{ flexDirection: "row", width: "90%", marginTop: "30px" }}
          >
            <View style={styles.hr}></View>
            <Text style={{ color: "#AAAAAA" }}>또는</Text>
            <View style={styles.hr}></View>
          </View>
          <View
            style={{ flexDirection: "row", width: "50%", marginTop: "50px" }}
          >
            <Image
              style={{ height: "25px", width: "25px" }}
              source={require("../../image/facebook.png")}
            ></Image>
            <TouchableOpacity style={{ marginLeft: "10px", color: "#0C98E2" }}>
              Facebook으로 로그인
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
            로그인으로 돌아가기
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
    borderTopWidth: "1px",
    alignItems: "center",
  },
  backtologin: {
    color: "#0C98E2",
    fontSize: "15px",
    marginTop: "10px",
    fontWeight: "bold",
  },
  nameortel: {
    borderBottomWidth: 1,
    width: "45%",
    alignItems: "center",
    fontSize: "20px",
  },
  input: {
    height: 40,
    width: "90%",
    borderColor: "#CCCCCC",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderRadius: "5px",
    marginTop: "20px",
  },
  next: {
    height: 40,
    width: "90%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: "5px",
    backgroundColor: "skyblue",
    marginTop: "20px",
    alignItems: "center",
    justifyContent: "center",
  },
  help: {
    color: "#279FE7",
    paddingTop: "15px",
  },
  hr: {
    flex: 1,
    width: "30%",
    marginTop: "10px",
    borderTopColor: "#DDDDDD",
    borderTopWidth: 1,
  },
});
