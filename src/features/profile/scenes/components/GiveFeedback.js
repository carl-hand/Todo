import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { universalStyles } from '../../../../shared_styles/universalStyles';

const axios = require('axios');

export class GiveFeedback extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Give Feedback',
  });

  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
    };
  }

  sendFeedback = async () => {
    if (this.state.feedback) {
      this.props.navigation.goBack();
      const feedback = {
        email: 'todo.helpme@gmail.com',
        message: this.state.feedback,
      };

      try {
        await axios.post('https://4uea4pxcp1.execute-api.eu-west-1.amazonaws.com/Prod/send', feedback);
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          onChangeText={value => this.setState({ feedback: value })}
          value={this.state.text}
        />
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={universalStyles.button}
            title="Send feedback"
            onPress={this.sendFeedback}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textArea: {
    height: 150,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    margin: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
