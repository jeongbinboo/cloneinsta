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
        if (this.state.id === "" || this.state.passwd === "")
          alert("input ID or Password!");
        else {
          const tok = response.data.token;
          this.setState({ token: tok });
          this.gotohome();
        }
      })
      .catch((error) => {
        alert("wrong");
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
            <Text>비밀번호를 잊으셨나요?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.login}
            onPress={() => {
              this.signin(this.state.id, this.state.passwd);
            }}
          >
            <Text>로그인</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", width: "90%", marginTop: 30 }}>
            <View style={styles.hr}></View>
            <Text style={{ color: "#AAAAAA" }}>또는</Text>
            <View style={styles.hr}></View>
          </View>
          <View style={{ flexDirection: "row", width: "50%", marginTop: 30 }}>
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
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15 }}>계정이 없으신가요? </Text>
            <TouchableOpacity
              style={{ color: "#0C98E2" }}
              onPress={() => {
                this.props.navigation.navigate("Join");
              }}
            >
              <Text>가입하기</Text>
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
    marginBottom: 15,
  },
  footer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    borderTopColor: "#DDDDDD",
    borderTopWidth: 1,
  },
  input: {
    height: 40,
    width: "90%",
    borderColor: "#CCCCCC",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  forgot: {
    color: "#279FE7",
    paddingTop: 15,
    paddingLeft: "150",
  },
  login: {
    color: "white",
    height: 40,
    width: "90%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "skyblue",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
  },
  hr: {
    flex: 1,
    width: "30%",
    marginTop: 10,
    borderTopColor: "#DDDDDD",
    borderTopWidth: 1,
  },
});
