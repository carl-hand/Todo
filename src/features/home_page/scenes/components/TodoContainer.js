import * as React from 'react';
import { TodoList } from './TodoList';

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

  render() {
    return (
      <TodoList data={this.state.data} navigation={this.props.navigation} />
    );
  }
}
