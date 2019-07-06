import * as React from 'react';
import { View, AsyncStorage } from 'react-native';
import { API } from 'aws-amplify';
import { TodoList } from './TodoList';
import { TextInputComponent } from './TextInputComponent';

export class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const response = await this.fetchData();
    const todoItems = (response[0] && response[0].tasks) || [];

    this.setState({
      data: todoItems,
    });
  }

  fetchData = async () => {
    const id = await AsyncStorage.getItem('clientId');
    console.log(`access ${id}`);

    try {
      const response = await API.get('todoApi', `/items/${id}`);
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
      await API.post('todoApi', '/items', {
        body: todoItem,
      });
    } catch (e) {
      console.log(`error adding todo item: ${e}`);
    }
  }

  handleRemoveTodo = () => {
    // const newData = this.state.data.filter((item) => {
    //   return item.task !==
    // });

    // this.setState({
    //   data: newData
    // });
  }

  render() {
    return (
      <View>
        <TextInputComponent addTodo={this.handleAddTodo} />
        <TodoList data={this.state.data} navigation={this.props.navigation} />
      </View>
    );
  }
}
