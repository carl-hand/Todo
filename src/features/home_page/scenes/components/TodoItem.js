import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

export class TodoItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      updateValue: '',
    };
  }

  handleRemove = () => {
    // props.handleRemove
    console.log('remove icon pressed');
  };

  handlePress = () => {
    const { updatedValue } = this.state;
    const value = updatedValue || this.props.task;
    const { navigate } = this.props.navigation;
    navigate('Edit', { task: value, onSave: this.updateTodo });
  };

  updateTodo = (value) => {
    this.setState({
      updatedValue: value,
    });
  };

  render() {
    const { updatedValue } = this.state;
    const value = updatedValue || this.props.task;

    return (
      <Card>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={style.container}>
            <TouchableWithoutFeedback onPress={this.handleRemove}>
              <Icon name="minuscircleo" size={20} color="red" />
            </TouchableWithoutFeedback>
            <Text>{value}</Text>
          </View>
        </TouchableWithoutFeedback>
      </Card>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
