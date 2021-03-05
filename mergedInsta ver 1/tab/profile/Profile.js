import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';

//navigation
import StackNav from './navigation/StackNav';

//modals
import MakeContent from './modals/MakeContent';
import Settings from './modals/Settings';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MakeContentModal: false,
      SettingModal: false,
    };
  }

  toggleMakeContentModal() {
    this.setState({
      MakeContentModal: !this.state.MakeContentModal,
    });
    console.log(this.state.MakeContentModal);
  }

  toggleSettingModal() {
    this.setState({
      SettingModal: !this.state.SettingModal,
    });
  }

  render() {
    return (
      <>
        <StackNav
          TabNavigation={this.props.TabNavigation}
          MakeContentModal={this.state.MakeContentModal}
          toggleMakeContentModal={() => this.toggleMakeContentModal()}
          toggleSettingModal={() => this.toggleSettingModal()}
        />
        {this.state.MakeContentModal ? (
          <MakeContent
            toggleMakeContentModal={() => this.toggleMakeContentModal()}
          />
        ) : (
          <></>
        )}
        {this.state.SettingModal ? (
          <Settings toggleSettingModal={() => this.toggleSettingModal()} />
        ) : (
          <></>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default Profile;
