import * as React from 'react';
import {
  findNodeHandle, View, StyleSheet, TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import TextInputReset from 'react-native-text-input-reset';

export class TextInputComponent extends React.Component {
  myRef;

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
  }

  handleAdd = () => {
    TextInputReset.resetKeyboardInput(findNodeHandle(this.myRef));
    this.props.addTodo(this.state.value);
    this.setState({
      value: '',
    });
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          ref={(ref) => { this.myRef = ref; }}
          style={styles.input}
          placeholder="Enter Todo"
          value={this.state.value}
          onChangeText={this.handleChange}
          rightIcon={(
            <TouchableWithoutFeedback onPress={this.handleAdd}>
              <Icon name="pluscircleo" size={20} color="green" />
            </TouchableWithoutFeedback>
          )}
        />
        <TouchableWithoutFeedback
          style={styles.iconContainer}
          onPress={this.handleAdd}
          hitSlop={{
            top: 20, bottom: 20, left: 40, right: 20,
          }}
        >
          <Icon name="pluscircleo" size={20} color="green" />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  textInput: {
    borderBottomColor: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderBottomColor: 'lightgrey',
  },
  input: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    color: '#424242',
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    paddingRight: 15,
    paddingTop: 25,
  },
});
