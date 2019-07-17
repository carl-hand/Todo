import React from 'react';
import {
  AsyncStorage,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Auth } from 'aws-amplify';
import FBSDK from 'react-native-fbsdk';
import { universalStyles } from '../shared_styles/universalStyles';

export const LogoutButton = (props) => {
  const handleLogout = async () => {
    try {
      const isFacebookLogin = await AsyncStorage.getItem('isFacebookLogin');
      if (isFacebookLogin) {
        await AsyncStorage.setItem('isFacebookLogin', '');
        const { LoginManager } = FBSDK;
        LoginManager.logOut();
      }
      // By doing this, you are revoking all the auth tokens(id token, access token
      // and refresh token) which means the user is signed out from all the devices
      // Note: although the tokens are revoked, the AWS credentials will remain
      // valid until they expire (which by default is 1 hour)
      await Auth.signOut({ global: true });
      await AsyncStorage.setItem('accessToken', '');
      await AsyncStorage.setItem('clientId', '');
      props.navigate('Auth');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Icon name="logout" style={universalStyles.navbarImage} size={20} color="blue" />
      <StatusBar backgroundColor="#004387" barStyle="light-content" />
    </TouchableOpacity>
  );
};
