import * as React from 'react';
import { View } from 'react-native';
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
    const newData = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 5; i++) {
      const todoItemData = {
        task: `todo item ${i + 1}`,
        status: 'complete',
      };
      newData.push(todoItemData);
    }

    this.setState({
      data: newData,
    });
  }

  handleAddTodo = (todoTask) => {
    const todoItem = {
      task: todoTask,
    };
    // eslint-disable-next-line react/no-access-state-in-setstate
    const newData = this.state.data.slice();
    newData.push(todoItem);

    this.setState({ data: newData });
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
