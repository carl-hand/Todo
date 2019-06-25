import * as React from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import FBSDK from 'react-native-fbsdk';
import { LogoutButton } from '../../../components/LogoutButton';
import { signIn } from '../../../api/helper';
import { federatedSignIn } from '../api/helper';
import { PreviewCardList } from './components/PreviewCardList';

export class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <LogoutButton navigate={navigation.navigate} />
    ),
  });

  componentDidMount() {
    this.setupAccessToken();
  }

  setupAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      try {
        const { AccessToken } = FBSDK;
        const fbAccessToken = await AccessToken.getCurrentAccessToken();
        if (fbAccessToken) {
          federatedSignIn(fbAccessToken, 'facebook');
        } else {
          this.signInUser();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  signInUser = async () => {
    const { navigation } = this.props;
    // accessToken will be null after sign UP and only way to update
    // the storage used in amplify library is by calling sign IN. For sign IN cases,
    // access token will have a value
    const email = navigation.getParam('email', 'NO-EMAIL');
    const password = navigation.getParam('password', 'NO-PASSWORD');
    const token = await signIn(email, password);
    if (token) {
      this.setAccessToken(token);
    }
  }

  setAccessToken = async (accessToken) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const ailmentData = [
      {
        title: 'Anxiety',
        image: {
          src: require('../../../assets/images/anxiety.png'),
        },
        summary: 'info about anxiety',
        info: 'Some information about anxiety...',
      },
      {
        title: 'Depression',
        image: {
          src: require('../../../assets/images/depression.png'),
        },
        summary: 'info about depression',
        info: 'Some information about depression...',
      },
      {
        title: 'Suicide',
        image: {
          src: require('../../../assets/images/suicide.jpg'),
        },
        summary: 'info about suicide',
        info: 'Some information about suicide...',
      },
    ];

    return (
      <View style={{ ...styles.backgroundColor }}>
        <PreviewCardList data={ailmentData} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: '#F5FCFF',
  },
});
