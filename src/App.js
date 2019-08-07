import React from 'react';
import Amplify, { Analytics } from 'aws-amplify';
// eslint-disable-next-line camelcase
import aws_exports from './aws-exports';
import Router from './navigation/navigators/Router';

Analytics.disable();
Amplify.configure(aws_exports);

export const App = () => (
  <Router />
);
