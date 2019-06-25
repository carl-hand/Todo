import React from 'react';
import Amplify from 'aws-amplify';
// eslint-disable-next-line camelcase
import aws_exports from './aws-exports';
import Router from './navigation/navigators/Router';

Amplify.configure(aws_exports);

export const App = () => (
  <Router />
);
