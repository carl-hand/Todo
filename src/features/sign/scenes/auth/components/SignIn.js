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

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

    signIn(actualEmail, password).then((token) => {
      if (token) {
        this.setAccessToken(token);
        const { navigate } = this.props;
        navigate('Home');
      }
    });
  }

  setAccessToken = async (accessToken) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
    } catch (error) {
      console.log(error);
    }
  }

  displayFindAccountScreen = () => {
    this.props.navigate('FindAccount');
  }

  render() {
    const { defaultEmail } = this.props;

    return (
      <View style={universalStyles.container}>
        <Input
          defaultValue={defaultEmail}
          label="Email"
          rightIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={
            value => this.setState({ email: value })
          }
          placeholder="my@email.com"
        />
        <Input
          label="Password"
          rightIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={
            value => this.setState({ password: value })
          }
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
