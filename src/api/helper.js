import { Auth, Storage } from 'aws-amplify';
import { ErrorCodes } from '../constants/constants';

/**
 * Sign in using the authentication class provied by aws amplify. This method
 * will sign in the user into the cognito user pool and automatically call
 * Auth.federatedSigIn() behind the scenes to get AWS credentials directly from
 * Cognito Federated Identities so we can then use these credentials to access
 * AWS services
 * @param {String} email - the email used to sign in
 * @param {String} password - the password used to sign in
 */
export async function signIn(email, password) {
  return Auth.signIn(email, password).then((user) => {
    const userSession = user.getSignInUserSession();
    const accessToken = userSession.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const clientId = accessToken.payload.client_id;

    const credentials = {
      clientId,
      accessToken: jwtToken,
    };

    return credentials;
  });
  // .catch((err) => {
  //   const errors = {};
  //   // TODO cretae switch statement here and store all error cases in ENUM
  //   if (err.code === ErrorCodes.userNotFound) {
  //     errors.userNotFound = err.message;
  //     // alert('User not found');
  //   } else if (err.code === ErrorCodes.notAuthorized) {
  //     alert('Username or password incorrect');
  //   } else if (err.code === ErrorCodes.userNotConfirmed) {
  //     // happens if the user entered email and password but don't enter the confirmation
  //     // code in the modal popup
  //     alert('user not confirmed');
  //   } else {
  //     alert(err.message);
  //   }
  // });
}

export async function sendConfirmationCode(email) {
  return Auth.forgotPassword(email)
    .then(data => data)
    .catch((err) => {
      if (err.code === ErrorCodes.userNotFound) {
        alert('That email does not exist');
      } else if (err.code === ErrorCodes.limitExceeded) {
        alert(err.message);
      }
    });
}

// S3 api methods
export async function uploadObject(key, object, config) {
  Storage.put(key, object, config)
    .then((result) => {
      // TODO: create some success modal to display to user
      console.log(result);
    })
    .catch(err => console.log(err));
}

export async function getObject(key, config) {
  Storage.get(key, config).then((result) => {
    // TODO: create some success modal to display to user
    console.log(`S3 object ${result}`);
    return result;
  }).catch((err) => {
    console.log(`Image fetching error: ${err}`);
  });
}

// get all keys in the images folder. Can then send off get request once we have all the keys
export async function getObjectList(path) {
  // path = 'images/'
  Storage.list(path).then((result) => {
    // TODO: create some success modal to display to user
    console.log(`S3 object ${result}`);
    return result;
  }).catch((err) => {
    console.log(`S3 getObjectList error: ${err}`);
  });
}
