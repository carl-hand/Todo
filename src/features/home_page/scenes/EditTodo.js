import * as React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export class EditTodo extends React.Component {
  static navigationOptions = () => ({
    title: 'Edit Todo',
  });

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    const { task } = params;
    this.state = {
      value: task,
    };
  }

  handleChangeText = (text) => {
    this.setState({
      value: text,
    });
  }

  handleSave = () => {
    const { value } = this.state;
    if (value) {
      const { navigation } = this.props;
      const { params } = navigation.state;
      const { index, onSave } = params;

      navigation.goBack();
      onSave(value, index);
    }
  }

  render() {
    return (
      <View>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={1}
            value={this.state.value}
            onChangeText={this.handleChangeText}
          />
        </View>
        <Button style={styles.button} title="Save" onPress={this.handleSave} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
  button: {
    marginTop: 10,
    width: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
