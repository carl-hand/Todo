/* eslint-disable global-require */
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { PropTypes } from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = (props) => {

  const handleRemoveTodo = (index) => {
    props.removeTodo(index);
  };

  const handlePostRemove = () => {
    props.handlePostRemove();
  };

  const renderWidget = ({ item, index }) => (
    <TodoItem
      isAdded={item.isAdded}
      index={index}
      removeTodo={handleRemoveTodo}
      isRemoved={item.isRemoved}
      onRemoving={handlePostRemove}
      navigation={props.navigation}
      task={item.task}
    />
  );

  // loading.json credit goes to https://lottiefiles.com/user/85394
  const data = props.isLoading && Platform.OS === 'ios' ? <LottieView style={style.placeholder} source={require('../animations/loading.json')} autoPlay loop /> : (
    <FlatList
      data={props.data}
      keyExtractor={item => `${item.uuid}`}
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
