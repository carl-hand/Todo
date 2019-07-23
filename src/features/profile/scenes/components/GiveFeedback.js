import React from 'react';
import { API } from 'aws-amplify';
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
    const feedback = {
      email: 'todo.helpme@gmail.com',
      message: this.state.feedback,
    };
    

    try {
      axios.post('https://4uea4pxcp1.execute-api.eu-west-1.amazonaws.com/Prod/send', {
        email: 'todo.helpme@gmail.com',
        message: this.state.feedback,
      }).then((response) => {
        console.log(`give feedback response ${response}`);
      }).catch((error) => {
        console.log(error);
      });
      // const response = await API.post('emailApi', '/send', {
      //   body: feedback,
      // });
      // console.log(`give feedback response ${response}`);
    } catch (e) {
      console.log(`error sending feedback: ${e}`);
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
