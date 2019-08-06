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
import { ErrorMessages } from '../../../../../constants/constants';

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
      errors: {},
    };
  }

  handlePress = () => {
    const {
      email,
      password,
      confirmPassword,
      code,
    } = this.state;
    const errors = this.hasErrors(email, password, confirmPassword, code);
    if (errors.isEmailFieldEmpty || errors.isPasswordFieldEmpty || errors.isConfirmPasswordFieldEmpty || errors.isCodeFieldEmpty) {
      errors.emptyFieldsError = ErrorMessages.emptyFields;
      this.setState({
        errors,
      });
    } else if (password !== confirmPassword) {
      errors.passwordError = ErrorMessages.passwordsDoNotMatch;
      this.setState({
        errors,
      });
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

  hasErrors = (email, password, confirmPassword, code) => {
    return {
      isEmailFieldEmpty: email.length === 0,
      isPasswordFieldEmpty: password.length === 0,
      isConfirmPasswordFieldEmpty: confirmPassword.length === 0,
      isCodeFieldEmpty: code.length === 0,
    };
  }

  resendCode = () => {
    const { email } = this.state;
    sendConfirmationCode(email);
  }

  handleClose = () => {
    console.log('closed');
  }

  handleChangeTextEmail = (value) => {
    this.setState({ email: value });
  }

  handleChangeTextCode = (value) => {
    this.setState({
      code: value,
    });
  }

  handleChangeTextPassword = (value) => {
    this.setState({ password: value });
  }

  handleChangeTextConfirmPassword = (value) => {
    this.setState({ confirmPassword: value });
  }

  render() {
    return (
      <Modal onRequestClose={this.handleClose}>
        <View
          style={universalStyles.container}
        >
          <Input
            label="Email"
            containerStyle={universalStyles.input}
            inputContainerStyle={(this.state.errors.isEmailFieldEmpty) && universalStyles.error}
            defaultValue={this.props.email}
            rightIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={this.handleChangeTextEmail}
          />
          <Input
            label="Confirmation Code"
            containerStyle={universalStyles.input}
            inputContainerStyle={(this.state.errors.isCodeFieldEmpty) && universalStyles.error}
            rightIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={this.handleChangeTextCode}
          />
          <Input
            label="New Password"
            containerStyle={universalStyles.input}
            inputContainerStyle={(this.state.errors.isPasswordFieldEmpty) && universalStyles.error}
            rightIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={this.handleChangeTextPassword}
            placeholder="p@ssw0rd123"
            secureTextEntry
          />
          <Input
            label="Confirm Password"
            containerStyle={universalStyles.input}
            inputContainerStyle={(this.state.errors.isConfirmPasswordFieldEmpty) && universalStyles.error}
            errorMessage={this.state.errors.emptyFieldsError}
            rightIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={this.handleChangeTextConfirmPassword}
            placeholder="p@ssw0rd123"
            secureTextEntry
          />
          <Button
            title="Submit"
            containerStyle={universalStyles.button}
            onPress={this.handlePress}
          />
          <View style={universalStyles.textContainer}>
            <Text style={universalStyles.text} onPress={this.resendCode}>Resend code</Text>
          </View>
        </View>
      </Modal>
    );
  }
}
