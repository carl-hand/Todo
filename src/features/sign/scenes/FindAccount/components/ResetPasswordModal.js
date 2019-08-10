import React from 'react';
import {
  View,
  Modal,
} from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { universalStyles } from '../../../../../shared_styles/universalStyles';
import { sendConfirmationCode } from '../../../../../api/helper';
import { ErrorMessages, ErrorCodes } from '../../../../../constants/constants';

export class ResetPasswordModal extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const { params } = navigation.state;
    const { email } = params;

    this.state = {
      email,
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
        }).catch((err) => {
          if (err.code === ErrorCodes.invalidParameters) {
            errors.passwordError = ErrorMessages.passwordDoesNotMeetRequirements;
          } else if (err.code === ErrorCodes.codeMismatch) {
            errors.invalidCodeError = ErrorMessages.invalidVerificationCode;
          } else if (err.code === ErrorCodes.userNotFound) {
            errors.emailError = 'User not found. Is this the correct email address?';
          }
          this.setState({
            errors,
          });
        });
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
    this.props.navigation.goBack();
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
            inputContainerStyle={(this.state.errors.isEmailFieldEmpty || this.state.errors.emailError) && universalStyles.error}
            defaultValue={this.state.email}
            rightIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={this.handleChangeTextEmail}
          />
          <Input
            label="Confirmation Code"
            containerStyle={universalStyles.input}
            inputContainerStyle={(this.state.errors.isCodeFieldEmpty || this.state.errors.invalidCodeError) && universalStyles.error}
            rightIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={this.handleChangeTextCode}
          />
          <Input
            label="New Password"
            containerStyle={universalStyles.input}
            inputContainerStyle={(this.state.errors.isPasswordFieldEmpty || this.state.errors.passwordError) && universalStyles.error}
            rightIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={this.handleChangeTextPassword}
            placeholder="p@ssw0rd123"
            secureTextEntry
          />
          <Input
            label="Confirm Password"
            containerStyle={universalStyles.input}
            inputContainerStyle={(this.state.errors.isConfirmPasswordFieldEmpty || this.state.errors.passwordError) && universalStyles.error}
            errorMessage={this.state.errors.emptyFieldsError || this.state.errors.passwordError || this.state.errors.invalidCodeError || this.state.errors.emailError}
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
            <Text onPress={this.resendCode}>Resend code</Text>
          </View>
        </View>
      </Modal>
    );
  }
}
