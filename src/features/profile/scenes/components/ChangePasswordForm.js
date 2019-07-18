import React from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { universalStyles } from '../../../../shared_styles/universalStyles';
import { ErrorCodes } from '../../../../constants/constants';

export class ChangePasswordForm extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Change Password',
  });

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
    };
  }

  handlePress = () => {
    const { oldPassword, newPassword } = this.state;
    if (!oldPassword || !newPassword) {
      alert('Please enter a value for all fields');
    } else {
      Auth.currentAuthenticatedUser().then((user) => {
        return Auth.changePassword(user, oldPassword, newPassword);
      }).then((data) => {
        this.props.navigation.goBack();
        alert('Password changed');
      }).catch((err) => {
        if (err.code === ErrorCodes.notAuthorized) {
          alert('Old password is incorrect');
        } else if (err.code === ErrorCodes.invalidParameters) {
          alert('Password does not meet requirements');
        } else if (err.code === ErrorCodes.limitExceeded) {
          alert('Limit exceeded please wait a while before trying again');
        }
      });
    }
  }

  render() {
    return (
      <View
        style={universalStyles.container}
      >
        <Input
          label="Old Password"
          rightIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={value => this.setState({ oldPassword: value })}
          placeholder="p@ssw0rd123"
          secureTextEntry
        />
        <Input
          label="New Password"
          rightIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={value => this.setState({ newPassword: value })}
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
