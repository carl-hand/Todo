import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

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

  // TODO: figure out how to send feedback to email address with serverless
  sendFeedback = () => {
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
            containerStyle={styles.button}
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
  button: {
    width: '50%',
  },
});
