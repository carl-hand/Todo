import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileIcon from 'react-native-vector-icons/AntDesign';
import Authentication from '../../features/sign/scenes/auth/Authentication';
import { Home } from '../../features/home_page/scenes/Home';
import { AuthLoadingScreen } from '../../features/sign/scenes/auth/AuthLoadingScreen';
import { FindAccount } from '../../features/sign/scenes/FindAccount/FindAccount';
import { Profile } from '../../features/profile/scenes/Profile';
import { ChangePasswordForm } from '../../features/profile/scenes/components/ChangePasswordForm';
import { GiveFeedback } from '../../features/profile/scenes/components/GiveFeedback';
import { EditProfile } from '../../features/profile/scenes/components/EditProfile';
import { EditEmail } from '../../features/profile/scenes/components/EditEmail';

const defaultNavOptions = title => ({
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  title,
});

const AuthStack = createStackNavigator(
  {
    Authentication: {
      screen: Authentication,
    },
    FindAccount: {
      screen: FindAccount,
    },
  },
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
  },
  {
    defaultNavigationOptions: defaultNavOptions('Home'),
  },
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
    },
    ChangePasswordForm: {
      screen: ChangePasswordForm,
    },
    GiveFeedback: {
      screen: GiveFeedback,
    },
    EditProfile: {
      screen: EditProfile,
    },
    EditEmail: {
      screen: EditEmail,
    },
  },
  {
    defaultNavigationOptions: defaultNavOptions('Profile'),
  },
);

const AppStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Profile: ProfileStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Help') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          return <ProfileIcon name="profile" size={horizontal ? 20 : 25} color={tintColor} />;
        }

        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
));
