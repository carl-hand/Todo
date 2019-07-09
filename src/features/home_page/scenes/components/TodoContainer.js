import * as React from 'react';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import { API } from 'aws-amplify';
import { TodoList } from './TodoList';
import { TextInputComponent } from './TextInputComponent';
import { Api } from '../../../../constants/constants';

export class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const response = await this.fetchData();
    const todoItems = (response[0] && response[0].tasks) || [];

    this.setState({
      data: todoItems,
      isLoading: false,
    });
  }

  fetchData = async () => {
    const id = await AsyncStorage.getItem('clientId');
    console.log(`access ${id}`);

    try {
      const response = await API.get(Api.apiName, `${Api.path}/${id}`);
      return response;
    } catch (err) {
      console.log(`error fetching todo data: ${err}`);
      throw err;
    }
  }

  handleAddTodo = async (todoTask) => {
    const id = await AsyncStorage.getItem('clientId');

    const todoItem = {
      id,
      task: todoTask,
    };
    // insert at first position
    const newData = [todoItem].concat(this.state.data);
    this.setState({ data: newData });

    try {
      await API.post(Api.apiName, Api.path, {
        body: todoItem,
      });
    } catch (e) {
      console.log(`error adding todo item: ${e}`);
    }
  }

  handleRemoveTodo = async (task, index) => {
    const newData = this.state.data.filter((item, indexOfItem) => item.task !== task && index !== indexOfItem);

    this.setState({
      data: newData,
    });

    const id = await AsyncStorage.getItem('clientId');
    const params = {
      body: {
        index,
      },
    };
    try {
      await API.patch(Api.apiName, `${Api.path}/${id}`, params);
    } catch (err) {
      console.log('error removing todo item: ', err);
    }
  }

  render() {
    return (
      <View style={style.container}>
        <TextInputComponent addTodo={this.handleAddTodo} />
        <TodoList isLoading={this.state.isLoading} data={this.state.data} navigation={this.props.navigation} removeTodo={this.handleRemoveTodo} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
  },
});
