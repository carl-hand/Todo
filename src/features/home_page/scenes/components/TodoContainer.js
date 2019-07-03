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

  componentDidMount() {
    const response = this.fetchData();
    console.log(response);
    this.setState({
      data: response,
    });
    // for (let i = 4; i >= 0; i--) {
    //   const todoItemData = {
    //     task: `todo item ${i + 1}`,
    //     status: 'complete',
    //   };
    //   newData.push(todoItemData);
    // }

    // this.setState({
    //   data: newData,
    // });
  }

  fetchData = () => {
    API.get('todoApi', '/items?id=0').then((response) => {
      console.log(response);

      return response.json();
    }).catch((err) => {
      console.log(`error ------------ ${err}`);
    });
  }

  handleAddTodo = async (todoTask) => {
    const todoItem = {
      id: `${Math.random()}`,
      task: todoTask,
    };
    // insert at first position
    // const newData = [todoItem].concat(this.state.data);
    // this.setState({ data: newData });
    const newData = [];
    newData.push(todoItem);
    this.setState({ data: newData });

    try {
      await API.post('todoApi', '/items', {
        body: todoItem,
      });
    } catch (e) {
      console.log(`error ------------ ${e}`);
    }
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