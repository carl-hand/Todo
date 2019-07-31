import React from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { universalStyles } from '../../../../shared_styles/universalStyles';
import { ErrorCodes, ErrorMessages } from '../../../../constants/constants';

export class EditEmail extends React.Component {
  static navigationOptions = {
    title: 'Update Email',
  }

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.navigation.getParam('email', ''),
      errors: {},
    };
  }

  updateEmail = async () => {
    const errors = { isEmailFieldEmpty: this.state.email.length === 0 };
    if (errors.isEmailFieldEmpty) {
      errors.emptyFieldsError = ErrorMessages.emptyFields;
      this.setState({
        errors,
      });
    } else {
      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(user, { email: this.state.email });
      } catch (err) {
        if (err.code === ErrorCodes.invalidParameters) {
          errors.invalidEmail = ErrorMessages.invalidEmail;
        } else {
          alert(err.message);
        }
        this.setState({
          errors,
        });
      }
    }
  }

  handleChangeTextEmail = (value) => {
    this.setState({ email: value });
  }

  render() {
    return (
      <View style={universalStyles.container}>
        <Input
          defaultValue={this.state.email}
          label="Email"
          containerStyle={universalStyles.input}
          inputContainerStyle={(this.state.errors.invalidEmail || this.state.errors.emptyFieldsError) && universalStyles.error}
          errorMessage={this.state.errors.invalidEmail || this.state.errors.emptyFieldsError}
          rightIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={this.handleChangeTextEmail}
          placeholder="my@email.com"
        />
        <Button style={universalStyles.button} title="Update Email" onPress={this.updateEmail} />
      </View>
    );
  }
}
