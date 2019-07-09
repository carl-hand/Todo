/* eslint-disable global-require */
import React from 'react';
import {
  FlatList,
  StyleSheet,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { PropTypes } from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = (props) => {

  const handleRemoveTodo = (task, index) => {
    props.removeTodo(task, index);
  };

  const renderWidget = ({ item, index }) => <TodoItem removeTodo={handleRemoveTodo} index={index} navigation={props.navigation} task={item.task} />;

  const data = props.isLoading ? <LottieView style={style.placeholder} source={require('./loading.json')} autoPlay loop /> : (
    <FlatList
      data={props.data}
      keyExtractor={item => item.task}
      renderItem={renderWidget}
    />
  );

  return (
    <>{data}</>
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

const style = StyleSheet.create({
  placeholder: {
    margin: 'auto',
  },
});
