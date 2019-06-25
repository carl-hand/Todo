import React from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { universalStyles } from '../../../../shared_styles/universalStyles';

export class EditEmail extends React.Component {
  static navigationOptions = {
    title: 'Update Email',
  }

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.navigation.getParam('email', ''),
    };
  }

  updateEmail = async () => {
    // TODO: should I try verify something like password before
    // allowing the user to update their email address???
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: this.state.email });
      alert('email updated');
    } catch (err) {
      alert(err.message);
    }
  }

  render() {
    return (
      <View style={universalStyles.container}>
        <Input
          defaultValue={this.state.email}
          label="Email"
          rightIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={
            value => this.setState({ email: value })
          }
          placeholder="my@email.com"
        />
        <Button title="Update Email" onPress={this.updateEmail} />
      </View>
    );
  }
}
