
import React from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { PropTypes } from 'prop-types';
import { universalStyles } from '../../../../../shared_styles/universalStyles';
import { ErrorCodes } from '../../../../../constants/constants';

export class Register extends React.Component {
  static propTypes = {
    setupConfirmSignUp: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSignUp = () => {
    const { email, password, confirmPassword } = this.state;
    if (password && password === confirmPassword) {
      Auth.signUp({
        username: email,
        password,
        attributes: { email },
      }).then((result) => {
        console.log(result);
        // On success, show Confirmation Code Modal
        this.props.setupConfirmSignUp(email, password, true);
      }).catch((err) => {
        if (err.code === ErrorCodes.usernameExists) {
          alert('An account already exists with this email');
        } else {
          console.log(err);
        }
      });
    } else {
      alert('Passwords do not match.');
    }
  }

  render() {
    return (
      <View style={universalStyles.container}>
        <Input
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
        <Input
          label="Confirm Password"
          rightIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={
            value => this.setState({ confirmPassword: value })
          }
          placeholder="p@ssw0rd123"
          secureTextEntry
        />
        <Button
          title="Submit"
          onPress={this.handleSignUp}
        />
      </View>
    );
  }
}
