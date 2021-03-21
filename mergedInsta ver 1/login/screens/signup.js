import axios from 'axios';
import React, {Component} from 'react';
import {TextInput, Button, View, StyleSheet} from 'react-native';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpId: '',
      signUpPassword: '',
      eMail: '',
      userName: '',
    };
  }
  handleId = (text) => {
    this.setState({signUpId: text});
  };
  handlePassWord = (text) => {
    this.setState({signUpPassword: text});
  };
  handleEMail = (text) => {
    this.setState({eMail: text});
  };
  handleName = (text) => {
    this.setState({userName: text});
  };
  gotologin = () => {
    this.props.navigation.navigate('Login');
  };
  signup = (signUpId, signUpPassword, eMail, userName) => {
    axios
      .post('http://34.64.201.219:8080/api/v1/signup', {
        user_id: signUpId,
        password: signUpPassword,
        email: eMail,
        name: userName,
      })
      .then((response) => {
        alert('Signed up!!');
        this.gotologin();
      })
      .catch((error) => {
        alert('wrong!');
        console.log(error);
        this.gotologin();
      });
  };
  render() {
    return (
      <View>
        <TextInput
          placeholder="input your ID"
          style={styles.input}
          onChangeText={this.handleId}></TextInput>
        <TextInput
          placeholder="input your password"
          style={styles.input}
          onChangeText={this.handlePassWord}></TextInput>
        <TextInput
          placeholder="input your e-mail"
          style={styles.input}
          onChangeText={this.handleEMail}></TextInput>
        <TextInput
          placeholder="input your name"
          style={styles.input}
          onChangeText={this.handleName}></TextInput>
        <Button
          title="submit"
          onPress={() =>
            this.signup(
              this.state.signUpId,
              this.state.signUpPassword,
              this.state.eMail,
              this.state.userName,
            )
          }></Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
});
