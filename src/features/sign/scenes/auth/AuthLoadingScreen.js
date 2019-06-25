import React from 'react';
import { AsyncStorage } from 'react-native';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';

export class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this.loadScreen();
  }

  loadScreen = async () => {
    let isAuthenticated = false;
    try {
      // const userCredentials = await Auth.currentCredentials();
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        isAuthenticated = true;
      }
    } catch (err) {
      console.log(err);
    }
    const email = this.props.navigation.getParam('email', '');
    const hasUserResetPassword = this.props.navigation.getParam('hasUserResetPassword', false);

    this.props.navigation.navigate(isAuthenticated ? 'App' : 'Auth', {
      email,
      hasUserResetPassword,
    });
  }

  render() {
    return (
      <LoadingSpinner />
    );
  }
}
