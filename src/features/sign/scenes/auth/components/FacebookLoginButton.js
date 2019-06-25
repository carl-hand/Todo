import React from 'react';
import FBSDK from 'react-native-fbsdk';

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
          // signIn(data, result);
          console.log(`profile ${result}`);
        } else {
          console.log(`error ${error}`);
        }
      },
    );
    const requestManager = new GraphRequestManager();
    requestManager.addRequest(request).start();
  };

  return (
    <LoginButton
      readPermissions={['public_profile', 'email']}
      onLoginFinished={(loginError, result) => {
        if (loginError) {
          console.log('login error');
        } else if (result.isCancelled) {
          console.log('result cancelled');
        } else {
          props.navigate('Home');
        }
      }}
    />
  );
};
