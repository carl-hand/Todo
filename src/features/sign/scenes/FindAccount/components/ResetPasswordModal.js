import React from 'react';
import {
  View,
  Modal,
} from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Auth } from 'aws-amplify';
import { universalStyles } from '../../../../../shared_styles/universalStyles';
import { ErrorMessages, ErrorCodes } from '../../../../../constants/constants'

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
    Auth.forgotPassword(email)
      .then(data => data)
      .catch((err) => {
        const errors = {};
        if (err.code === ErrorCodes.userNotFound) {
          errors.userNotFound = ErrorMessages.emailNotFound;
        } else if (err.code === ErrorCodes.limitExceeded) {
          errors.limitExceededError = ErrorMessages.limitExceededMessage;
        }

        this.setState({
          errors,
        });
      });
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

    const {
      isEmailFieldEmpty,
      emailError,
      isCodeFieldEmpty,
      invalidCodeError,
      isPasswordFieldEmpty,
      passwordError,
      isConfirmPasswordFieldEmpty,
      emptyFieldsError,
      limitExceededError,
    } = this.state.errors;
    return (
      <Modal onRequestClose={this.handleClose}>
        <View
          style={universalStyles.container}
        >
          <Input
            label="Email"
            containerStyle={universalStyles.input}
            inputContainerStyle={(isEmailFieldEmpty || emailError) && universalStyles.error}
            defaultValue={this.state.email}
            rightIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={this.handleChangeTextEmail}
          />
          <Input
            label="Confirmation Code"
            containerStyle={universalStyles.input}
            inputContainerStyle={(isCodeFieldEmpty || invalidCodeError) && universalStyles.error}
            rightIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={this.handleChangeTextCode}
          />
          <Input
            label="New Password"
            containerStyle={universalStyles.input}
            inputContainerStyle={(isPasswordFieldEmpty || passwordError) && universalStyles.error}
            rightIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={this.handleChangeTextPassword}
            placeholder="p@ssw0rd123"
            secureTextEntry
          />
          <Input
            label="Confirm Password"
            containerStyle={universalStyles.input}
            inputContainerStyle={(isConfirmPasswordFieldEmpty || passwordError) && universalStyles.error}
            errorMessage={emptyFieldsError || passwordError || invalidCodeError || emailError || limitExceededError}
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
            <TouchableOpacity>
              <Text onPress={this.resendCode}>Resend code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
