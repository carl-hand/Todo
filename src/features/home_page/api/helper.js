import { Auth, API } from 'aws-amplify';
import { AsyncStorage } from 'react-native';

/**
 * need to call federatedSignIn to sign in user so the user will then be
 * authenticated for subsequent calls to AWS services without the need
 * to pass the access token in every request after signing in. This method is
 * called automatically behind the scenes in a normal login flow using Auth.signIn()
 * @param {object} currentAccessToken - object containing properties for using Facebook services
 */
export async function federatedSignIn(currentAccessToken, provider) {
  const { accessToken: token, expirationTime } = currentAccessToken;
  const expiresAt = expirationTime * 1000 + new Date().getTime();
  // const { email } = userInfo;
  // const user = { email };

  try {
    const credentials = await Auth.federatedSignIn(
      provider,
      {
        token,
        expires_at: expiresAt,
      },
      null,
    );
    console.log(`user credentials ${credentials}`);

    const accessTokenPromise = AsyncStorage.setItem('accessToken', credentials.sessionToken);
    const isFacebookLoginPromise = AsyncStorage.setItem('isFacebookLogin', 'true');
    await Promise.all([accessTokenPromise, isFacebookLoginPromise]);
  } catch (err) {
    console.log(err);
  }
}

// DynamoDB
export async function saveUser() {
  const updateUser = {
    body: {
      userId: 'ID01',
      pickMeUpTime: '19:57:00',
    },
  };
  const path = '/users';

  // Use the API module to save the note to the database
  try {
    // ? Provide a friendly name for your resource to be used as a label
    // for this category in the project: userapi
    const apiResponse = await API.put('userapi', path, updateUser);
    console.log(`response from saving user:  ${apiResponse}`);
    alert(apiResponse);
  } catch (e) {
    console.log(e);
  }
}
