
import React from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { PropTypes } from 'prop-types';
import { universalStyles } from '../../../../../shared_styles/universalStyles';
import { ErrorCodes, ErrorMessages } from '../../../../../constants/constants';

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
      errors: {},
    };
  }

  handleSignUp = () => {
    const { email, password, confirmPassword } = this.state;
    let hasEmptyFields = false;
    const errors = this.hasErrors(email, password, confirmPassword);
    if (errors.isEmailFieldEmpty || errors.isPasswordFieldEmpty || errors.isConfirmPasswordFieldEmpty) {
      hasEmptyFields = true;
      errors.emptyFieldsError = ErrorMessages.emptyFields;
    }

    if (!hasEmptyFields) {
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
          if (err.message.indexOf(ErrorMessages.invalidEmail) !== -1) {
            errors.emailError = ErrorMessages.invalidEmail;
          } else if (err.code === ErrorCodes.invalidParameters) {
            errors.passwordError = ErrorMessages.passwordDoesNotMeetRequirements;
          } else if (err.code === ErrorCodes.usernameExists) {
            errors.emailError = ErrorMessages.accountAlreadyExists;
          } else {
            console.log(err);
          }

          this.setState({
            errors,
          });
        });
      } else {
        errors.passwordError = ErrorMessages.passwordsDoNotMatch;
      }
    }

    if (errors) {
      this.setState({
        errors,
      });
    }
  }

  hasErrors = (email, password, confirmPassword) => {
    return { isEmailFieldEmpty: email.length === 0, isPasswordFieldEmpty: password.length === 0, isConfirmPasswordFieldEmpty: confirmPassword.length === 0 };
  }

  handleChangeTextEmail = (value) => {
    this.setState({ email: value });
  }

  handleChangeTextPassword = (value) => {
    this.setState({ password: value });
  }

  handleChangeTextConfirmPassword = (value) => {
    this.setState({ confirmPassword: value });
  }

  render() {
    return (
      <View style={universalStyles.container}>
        <Input
          label="Email"
          containerStyle={universalStyles.input}
          inputContainerStyle={(this.state.errors.isEmailFieldEmpty || this.state.errors.emailError) && universalStyles.error}
          rightIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={this.handleChangeTextEmail}
          placeholder="my@email.com"
        />
        <Input
          label="Password"
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
          errorMessage={this.state.errors.emptyFieldsError || this.state.errors.emailError || this.state.errors.passwordError}
          rightIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={this.handleChangeTextConfirmPassword}
          placeholder="p@ssw0rd123"
          secureTextEntry
        />
        <Button
          style={universalStyles.button}
          title="Submit"
          onPress={this.handleSignUp}
        />
      </View>
    );
  }
}
