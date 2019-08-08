import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup, Text } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { ConfirmationModal } from './components/ConfirmationModal';
import { Register } from './components/Register';
import { SignIn } from './components/SignIn';

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationCode: '',
      modalVisible: false,
      email: '',
      password: '',
      selectedIndex: 0,
    };
    this.buttons = ['Sign In', 'Sign Up'];
  }

  setupConfirmSignUp = (email, password, modalVisible) => {
    this.setState({
      email,
      password,
      modalVisible,
    });
  }

  submitConfirmationCode = () => {
    const { email, password, confirmationCode } = this.state;
    Auth.confirmSignUp(email, confirmationCode, password)
      .then(() => {
        const { navigate } = this.props.navigation;
        this.setState({ modalVisible: false });
        navigate('Home', {
          email,
          password,
        });
      }).catch(err => console.log(err));
  }

  updateConfirmationCode = value => this.setState({ confirmationCode: value });

  getRegisterComponent = () => {
    const { modalVisible } = this.state;
    if (modalVisible) {
      return (
        <ConfirmationModal
          handleConfirmationCode={this.submitConfirmationCode}
          updateConfirmationCode={this.updateConfirmationCode}
          isVisible={modalVisible}
        />
      );
    }

    return <Register setupConfirmSignUp={this.setupConfirmSignUp} />;
  }

  updateIndex = () => {
    const { selectedIndex } = this.state;
    const newIndex = selectedIndex === 0 ? 1 : 0;
    this.setState({ selectedIndex: newIndex });
  }

  render() {
    const email = this.props.navigation.getParam('email', '');
    const hasUserResetPassword = this.props.navigation.getParam('hasUserResetPassword', false);

    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={this.state.selectedIndex}
          buttons={this.buttons}
        />
        {hasUserResetPassword ? <Text style={styles.text}>Log in with your new password</Text> : null}
        {this.state.selectedIndex === 0
          ? <SignIn navigate={this.props.navigation.navigate} defaultEmail={email} />
          : this.getRegisterComponent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 20,
  },
});
