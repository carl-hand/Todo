import React from 'react';
import {
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { universalStyles } from '../shared_styles/universalStyles';

export const LoadingSpinner = () => (
  <View style={universalStyles.container}>
    <ActivityIndicator />
    <StatusBar barStyle="default" />
  </View>
);
