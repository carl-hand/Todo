import React from 'react';
import {
  FlatList,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = (props) => {
  const renderWidget = ({ item }) => <TodoItem task={item.task} />;

  return (
    <FlatList
      data={props.data}
      keyExtractor={item => item.title}
      renderItem={renderWidget}
    />
  );
};

TodoList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  iconName: PropTypes.string,
  buttonTitle: PropTypes.string,
  buttonColor: PropTypes.string,
};

TodoList.defaultProps = {
  iconName: 'code',
  buttonTitle: 'View More',
  buttonColor: '#03A9F4',
};
