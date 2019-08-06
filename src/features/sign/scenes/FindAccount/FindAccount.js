import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { universalStyles } from '../../../../shared_styles/universalStyles';
import { ResetPasswordModal } from './components/ResetPasswordModal';
import { sendConfirmationCode } from '../../../../api/helper';
import { ErrorMessages, ErrorCodes } from '../../../../constants/constants';
import { Auth } from 'aws-amplify';

export class FindAccount extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Find Account',
  });

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userExists: false,
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
        const userEmail = await Auth.forgotPassword(email);
        if (userEmail) {
          this.setState({
            userExists: true,
          });
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

  renderView = () => {
    const { email, userExists } = this.state;
    if (userExists) {
      const { navigation } = this.props;
      return <ResetPasswordModal email={email} navigation={navigation} />;
    }

    return (
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
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
