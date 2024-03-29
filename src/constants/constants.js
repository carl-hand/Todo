export const ErrorCodes = {
  userNotFound: 'UserNotFoundException',
  notAuthorized: 'NotAuthorizedException',
  userNotConfirmed: 'UserNotConfirmedException',
  usernameExists: 'UsernameExistsException',
  limitExceeded: 'LimitExceededException',
  invalidParameters: 'InvalidParameterException',
  codeMismatch: 'CodeMismatchException',
};

export const ErrorMessages = {
  invalidEmail: 'Invalid email address format',
  passwordDoesNotMeetRequirements: 'Password must be at least 6 characters in length and contain at least one uppercase letter, number and a special character',
  accountAlreadyExists: 'An account already exists with this email',
  passwordsDoNotMatch: 'Passwords do not match',
  emptyFields: 'Please enter a value for all fields',
  limitExceeded: 'You have failed resetting your password too many times please wait a while before trying again',
  oldPasswordIncorrect: 'Old password is incorrect',
  emailNotFound: 'That email does not exist',
  limitExceededMessage: 'You have tried too many times. Please wait a while and try again',
  invalidVerificationCode: 'Invalid verification code provided, please try again',
};

export const Api = {
  apiName: 'todoApi',
  path: '/items',
};
