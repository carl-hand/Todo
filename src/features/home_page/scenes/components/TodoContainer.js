import * as React from 'react';
import { View } from 'react-native';
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
    console.log(response);
    this.setState({
      data: todoItems,
    });
  }

  fetchData = async () => {
    const id = '1';
    try {
      const response = await API.get('todoApi', `/items/${id}`);
      return response;
    } catch (err) {
      console.log(`error ------------ ${err}`);
      throw err;
    }
  }

  handleAddTodo = async (todoTask) => {
    const todoItem = {
      id: '1',
      task: todoTask,
    };
    // insert at first position
    // const newData = [todoItem].concat(this.state.data);
    // this.setState({ data: newData });
    this.setState(prevState => ({
      data: [...prevState.data, todoItem],
    }));

    try {
      await API.post('todoApi', '/items', {
        body: todoItem,
      });
    } catch (e) {
      console.log(`error ------------ ${e}`);
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
