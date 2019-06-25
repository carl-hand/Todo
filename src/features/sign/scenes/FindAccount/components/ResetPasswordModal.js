import React from 'react';
import {
  View,
  Modal,
} from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { universalStyles } from '../../../../../shared_styles/universalStyles';
import { sendConfirmationCode } from '../../../../../api/helper';

export class ResetPasswordModal extends React.Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      password: '',
      confirmPassword: '',
      code: '',
    };
  }

  handlePress = () => {
    const {
      email,
      password,
      confirmPassword,
      code,
    } = this.state;
    if (!email || !password || !confirmPassword || !code) {
      alert('Please enter a value for all fields');
    } else if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      Auth.forgotPasswordSubmit(email, code, password)
        .then(() => {
          // TODO: figure out how I can naviagte back to Auth screen instead and pass back params
          // rather than navigating to AuthLoading and having to pass around these params twice
          this.props.navigation.navigate('Authentication', {
            email,
            hasUserResetPassword: true,
          });
        }).catch(err => console.log(err));
    }
  }

  resendCode = () => {
    const { email } = this.state;
    sendConfirmationCode(email);
  }

  handleClose = () => {
    console.log('closed');
  }

  render() {
    return (
      <Modal onRequestClose={this.handleClose}>
        <View
          style={universalStyles.container}
        >
          <Input
            label="Email"
            defaultValue={this.props.email}
            rightIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={value => this.setState({ email: value })}
          />
          <Input
            label="Confirmation Code"
            rightIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={value => this.setState({ code: value })}
          />
          <Input
            label="New Password"
            rightIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={value => this.setState({ password: value })}
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
            onPress={this.handlePress}
          />
          <Text style={universalStyles.text} onPress={this.resendCode}>Resend code</Text>
        </View>
      </Modal>
    );
  }
}
