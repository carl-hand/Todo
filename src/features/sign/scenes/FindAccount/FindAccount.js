import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Auth } from 'aws-amplify';
import { Input, Button } from 'react-native-elements';
import { universalStyles } from '../../../../shared_styles/universalStyles';
import { ErrorMessages, ErrorCodes } from '../../../../constants/constants';

export class FindAccount extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Find Account',
  });

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {},
    };
  }

  findAccount = async () => {
    const { email } = this.state;
    const errors = {};
    if (!email) {
      errors.emptyFieldsError = ErrorMessages.emptyFields;
      this.setState({
        errors,
      });
    } else {
      try {
        const actualEmail = email.trim();
        const userEmail = await Auth.forgotPassword(actualEmail);
        if (userEmail) {
          this.props.navigation.navigate('ResetPasswordModal', { email: actualEmail });
        }
      } catch (err) {
        if (err.code === ErrorCodes.userNotFound) {
          errors.userNotFound = ErrorMessages.emailNotFound;
        } else if (err.code === ErrorCodes.limitExceeded) {
          errors.limitExceeded = ErrorMessages.limitExceededMessage;
        }

        this.setState({
          errors,
        });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={universalStyles.container}>
          <Input
            label="Email"
            containerStyle={universalStyles.input}
            inputContainerStyle={(this.state.errors.emptyFieldsError || this.state.errors.userNotFound || this.state.errors.limitExceeded) && universalStyles.error}
            errorMessage={this.state.errors.emptyFieldsError || this.state.errors.userNotFound || this.state.errors.limitExceeded}
            rightIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={
              value => this.setState({ email: value })
            }
            placeholder="my@email.com"
          />
          <Button
            containerStyle={universalStyles.button}
            title="Submit"
            onPress={this.findAccount}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
