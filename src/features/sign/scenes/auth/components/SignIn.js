import React from 'react';
import {
  View,
  AsyncStorage,
  Text,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { universalStyles } from '../../../../../shared_styles/universalStyles';
import { signIn } from '../../../../../api/helper';
import { FacebookLoginButton } from './FacebookLoginButton';
import { ErrorCodes } from '../../../../../constants/constants';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  handleSignIn = () => {
    const { email, password } = this.state;

    const { defaultEmail } = this.props;
    let actualEmail = email;
    // if there is a default email but the email in the state is empty
    // then we know we have navigated from the reset password modal screen
    // so use the default email instead to prevent user having to type
    // in their email again
    if (defaultEmail && !email) {
      actualEmail = defaultEmail;
    }

    const errors = this.hasErrors(actualEmail, password);
    let hasEmptyFields = false;
    if (errors.isEmailFieldEmpty || errors.isPasswordFieldEmpty) {
      hasEmptyFields = true;
      errors.signInError = 'Please enter a value for all fields';
    }

    if (!hasEmptyFields) {
      signIn(actualEmail, password).then((credentials) => {
        const { accessToken, clientId } = credentials;
        if (accessToken && clientId) {
          this.setAccessToken(accessToken, clientId);
          const { navigate } = this.props;
          navigate('Home');
        }
      }).catch((err) => {
        if (err.code === ErrorCodes.userNotFound || err.code === ErrorCodes.notAuthorized) {
          errors.signInError = 'Incorrect username or password';
        } else {
          alert(err.message);
        }

        this.setState({
          errors,
        });
      });
    }

    this.setState({
      errors,
    });
  }

  setAccessToken = async (accessToken, clientId) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('clientId', clientId);
    } catch (error) {
      console.log(`setAccessToken: error setting credentials on sign in: ${error}`);
    }
  }

  hasErrors = (email, password) => {
    return { isEmailFieldEmpty: email.length === 0, isPasswordFieldEmpty: password.length === 0 };
  }

  displayFindAccountScreen = () => {
    this.props.navigate('FindAccount');
  }

  handleChangeTextEmail = (value) => {
    this.setState({ email: value });
  }

  handleChangeTextPassword = (value) => {
    this.setState({ password: value });
  }

  render() {
    const { defaultEmail } = this.props;

    return (
      <View style={universalStyles.container}>
        <Input
          label="Email"
          inputContainerStyle={this.state.errors.signInError && universalStyles.error}
          defaultValue={defaultEmail}
          rightIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={this.handleChangeTextEmail}
          placeholder="my@email.com"
        />
        <Input
          label="Password"
          inputContainerStyle={this.state.errors.signInError && universalStyles.error}
          errorMessage={this.state.errors.signInError}
          rightIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={this.handleChangeTextPassword}
          placeholder="p@ssw0rd123"
          secureTextEntry
        />
        <Button
          title="Submit"
          onPress={this.handleSignIn}
        />
        {/* <FacebookLoginButton navigate={this.props.navigate} /> */}
        <Text
          style={universalStyles.text}
          onPress={this.displayFindAccountScreen}
        >
          Forgot password?
        </Text>
      </View>
    );
  }
}
