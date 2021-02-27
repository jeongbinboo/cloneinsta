import axios from "axios";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

export default class Login extends Component {
  state = {
    text: "",
    id: "",
    passwd: "",
    token: "",
  };
  gotohome = () => {
    this.props.navigation.navigate("Home");
  };
  signin = (id, passwd) => {
    axios
      .post("http://34.64.201.219:8080/api/v1/signin", {
        user_id: id,
        password: passwd,
      })
      .then((response) => {
        if (response.data.status === "200 OK") {
          this.setState({ token: response.data.token });
          this.gotohome();
        } else alert("wrong!");
      })
      .catch((error) => {
        alert(error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.content}>
          <Text style={styles.title}>instagram</Text>
          <TextInput
            onChangeText={(text) => {
              this.setState({ id: text });
            }}
            placeholder="   전화번호, 사용자 이름 또는 이메일"
            style={styles.input}
          />
          <TextInput
            placeholder="   비밀번호"
            style={styles.input}
            onChangeText={(text) => {
              this.setState({ passwd: text });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Ifpasswordforgot");
            }}
            style={styles.forgot}
          >
            비밀번호를 잊으셨나요?
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.login}
            onPress={() => {
              this.signin(this.state.id, this.state.passwd);
            }}
          >
            로그인
          </TouchableOpacity>
          <View
            style={{ flexDirection: "row", width: "90%", marginTop: "30px" }}
          >
            <View style={styles.hr}></View>
            <Text style={{ color: "#AAAAAA" }}>또는</Text>
            <View style={styles.hr}></View>
          </View>
          <View
            style={{ flexDirection: "row", width: "50%", marginTop: "30px" }}
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
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: "15px" }}>계정이 없으신가요? </Text>
            <TouchableOpacity
              style={{ color: "#0C98E2" }}
              onPress={() => {
                this.props.navigation.navigate("Join");
              }}
            >
              가입하기
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
    backgroundColor: "white",
  },
  content: {
    flex: 7,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontFamily: "Georgia",
    marginBottom: "15px",
  },
  footer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    borderTopColor: "#DDDDDD",
    borderTopWidth: "1px",
  },
  input: {
    height: 40,
    width: "90%",
    borderColor: "#CCCCCC",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderRadius: "5px",
    marginTop: "10px",
  },
  forgot: {
    color: "#279FE7",
    paddingTop: "15px",
    paddingLeft: "150px",
  },
  login: {
    color: "white",
    height: 40,
    width: "90%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: "5px",
    backgroundColor: "skyblue",
    marginTop: "30px",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
  },
  hr: {
    flex: 1,
    width: "30%",
    marginTop: "10px",
    borderTopColor: "#DDDDDD",
    borderTopWidth: 1,
  },
});
