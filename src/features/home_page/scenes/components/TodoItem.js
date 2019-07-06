import * as React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Text, Card } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { API } from 'aws-amplify';
import { Api } from '../../../../constants/constants';

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
    const { index, navigation, task } = this.props;
    const { navigate } = navigation;
    const value = updatedValue || task;

    navigate('Edit', { task: value, index, onSave: this.updateTodo });
  };

  updateTodo = async (value, index) => {
    this.setState({
      updatedValue: value,
    });

    const id = await AsyncStorage.getItem('clientId');
    const params = {
      body: {
        id,
        task: value,
        indexToRemove: index,
      },
    };
    try {
      await API.put(Api.apiName, Api.path, params);
    } catch (err) {
      console.log('error updating todo item: ', err);
    }
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
