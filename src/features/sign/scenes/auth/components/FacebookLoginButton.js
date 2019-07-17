import React from 'react';
import {
  View,
  AsyncStorage,
} from 'react-native';
import FBSDK from 'react-native-fbsdk';
import { universalStyles } from '../../../../../shared_styles/universalStyles';
import { signIn } from '../../../../../api/helper';

export const FacebookLoginButton = (props) => {
  const {
    LoginButton,
    GraphRequest,
    GraphRequestManager,
  } = FBSDK;

  // TODO: probably don't need this method anymore
  const fetchProfile = (data) => {
    const request = new GraphRequest(
      '/me',
      {
        httpMethod: 'GET',
        parameters: {
          fields: {
            string: 'email,name',
          },
        },
      },
      (error, result) => {
        if (result) {
          signIn(data, result);
          console.log(`profile ${result}`);
        } else {
          console.log(`error ${error}`);
        }
      },
    );
    const requestManager = new GraphRequestManager();
    requestManager.addRequest(request).start();
  };

  const setAsyncAttributes = async () => {
    await AsyncStorage.setItem('isFacebookLogin', 'true');
  };

  return (
    <View style={universalStyles.socialButton}>
      <LoginButton
        readPermissions={['public_profile', 'email']}
        onLoginFinished={(loginError, result) => {
          if (loginError) {
            console.log('login error');
          } else if (result.isCancelled) {
            console.log('result cancelled');
          } else {
            setAsyncAttributes();
            props.navigate('Home');
          }
        }}
      />
    </View>
  );
};
