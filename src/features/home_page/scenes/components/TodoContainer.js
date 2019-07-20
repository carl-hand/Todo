import * as React from 'react';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import FBSDK from 'react-native-fbsdk';
import { API } from 'aws-amplify';
import { TodoList } from './TodoList';
import { TextInputComponent } from './TextInputComponent';
import { Api } from '../../../../constants/constants';
import { federatedSignIn } from '../../api/helper';
import { signIn } from '../../../../api/helper';

const uuidv1 = require('uuid/v1');

export class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    await this.setupAccessToken();

    const response = await this.fetchData();
    const todoItems = (response[0] && response[0].tasks) || [];

    this.setState({
      data: todoItems,
      isLoading: false,
    });
  }

  setupAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      try {
        const { AccessToken } = FBSDK;
        const fbAccessToken = await AccessToken.getCurrentAccessToken();
        if (fbAccessToken) {
          await federatedSignIn(fbAccessToken, 'facebook');
        } else {
          await this.signInUser();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  signInUser = async () => {
    const { navigation } = this.props;
    // accessToken will be null after sign UP and only way to update
    // the storage used in amplify library is by calling sign IN. For sign IN cases,
    // access token will have a value
    const email = navigation.getParam('email', 'NO-EMAIL');
    const password = navigation.getParam('password', 'NO-PASSWORD');
    const credentials = await signIn(email, password);
    const { accessToken, clientId } = credentials;
    if (accessToken && clientId) {
      this.setAccessToken(accessToken, clientId);
    }
  }

  setAccessToken = async (accessToken, clientId) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('clientId', clientId);
    } catch (error) {
      console.log(error);
    }
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
    if (!todoTask) {
      return;
    }

    const id = await AsyncStorage.getItem('clientId');

    const todoItem = {
      id,
      uuid: uuidv1(),
      task: todoTask,
      isAdded: true,
    };
    // insert at first position
    const newData = [{ ...todoItem }, ...this.state.data];
    this.setState({ data: newData });

    try {
      await API.post(Api.apiName, Api.path, {
        body: todoItem,
      });
    } catch (e) {
      console.log(`error adding todo item: ${e}`);
    }
  }

  handleRemoveTodo = async (index) => {
    const newData = this.state.data.slice();
    newData[index].isRemoved = true;

    this.setState({
      data: newData,
      rowToDelete: index,
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

  handlePostRemove = () => {
    const newData = this.state.data.filter((item, indexOfItem) => indexOfItem !== this.state.rowToDelete);
    this.setState({
      data: newData,
    });
  }

  render() {
    return (
      <View style={style.container}>
        <TextInputComponent addTodo={this.handleAddTodo} />
        <TodoList isLoading={this.state.isLoading} data={this.state.data} navigation={this.props.navigation} removeTodo={this.handleRemoveTodo} handlePostRemove={this.handlePostRemove} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
  },
});
