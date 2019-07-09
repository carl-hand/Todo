import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export class TextInputComponent extends React.Component {
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
    this.props.addTodo(this.state.value);
    this.setState({
      value: '',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Enter Todo"
          value={this.state.value}
          onChangeText={this.handleChange}
          rightIcon={(
            <TouchableWithoutFeedback onPress={this.handleAdd}>
              <Icon name="pluscircleo" size={20} color="green" />
            </TouchableWithoutFeedback>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
