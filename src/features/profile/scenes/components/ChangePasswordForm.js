import React from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { universalStyles } from '../../../../shared_styles/universalStyles';
import { ErrorCodes, ErrorMessages } from '../../../../constants/constants';

export class ChangePasswordForm extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Change Password',
  });

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      errors: {},
    };
  }

  handlePress = () => {
    const { oldPassword, newPassword } = this.state;
    const errors = this.getErrors(oldPassword, newPassword);
    if (errors.isOldPasswordFieldEmpty || errors.isNewPasswordFiledEmpty) {
      errors.emptyFieldsError = ErrorMessages.emptyFields;
      this.setState({
        errors,
      });
    } else {
      Auth.currentAuthenticatedUser().then((user) => {
        return Auth.changePassword(user, oldPassword, newPassword);
      }).then((data) => {
        this.props.navigation.goBack();
        alert('Password changed');
      }).catch((err) => {
        if (err.code === ErrorCodes.notAuthorized) {
          errors.oldPasswordIncorrect = ErrorMessages.oldPasswordIncorrect;
        } else if (err.code === ErrorCodes.invalidParameters) {
          errors.passwordError = ErrorMessages.passwordDoesNotMeetRequirements;
        } else if (err.code === ErrorCodes.limitExceeded) {
          errors.limitExceededError = ErrorMessages.limitExceeded;
        }

        this.setState({
          errors,
        });
      });
    }
  }

  getErrors = (oldPassword, newPassword) => {
    return { isOldPasswordFieldEmpty: oldPassword.length === 0, isNewPasswordFiledEmpty: newPassword.length === 0 };
  }

  handleChangeTextOldPassword = (value) => {
    this.setState({
      oldPassword: value,
    });
  }

  handleChangeTextNewPassword = (value) => {
    this.setState({
      newPassword: value,
    });
  }

  render() {
    return (
      <View
        style={universalStyles.container}
      >
        <Input
          label="Old Password"
          containerStyle={universalStyles.input}
          inputContainerStyle={(this.state.errors.emptyFieldsError || this.state.errors.oldPasswordIncorrect) && universalStyles.error}
          rightIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={this.handleChangeTextOldPassword}
          placeholder="p@ssw0rd123"
          secureTextEntry
        />
        <Input
          label="New Password"
          containerStyle={universalStyles.input}
          inputContainerStyle={(this.state.errors.emptyFieldsError || this.state.errors.passwordError) && universalStyles.error}
          errorMessage={this.state.errors.emptyFieldsError || this.state.errors.oldPasswordIncorrect || this.state.errors.passwordError || this.state.errors.limitExceededError}
          rightIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={this.handleChangeTextNewPassword}
          placeholder="p@ssw0rd123"
          secureTextEntry
        />
        <Button
          style={universalStyles.button}
          title="Change Password"
          onPress={this.handlePress}
        />
      </View>
    );
  }
}
