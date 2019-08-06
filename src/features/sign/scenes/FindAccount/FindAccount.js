import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { universalStyles } from '../../../../shared_styles/universalStyles';
import { ResetPasswordModal } from './components/ResetPasswordModal';
import { sendConfirmationCode } from '../../../../api/helper';

export class FindAccount extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Find Account',
  });

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userExists: false,
    };
  }

  findAccount = () => {
    const { email } = this.state;
    sendConfirmationCode(email).then((data) => {
      if (data) {
        this.setState({
          userExists: true,
        });
      }
    });
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
