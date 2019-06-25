import * as React from 'react';
import { ListItem } from 'react-native-elements';
import { LogoutButton } from '../../../components/LogoutButton';
import { FlatListComponent } from '../../../components/FlatListComponent';

export class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <LogoutButton navigate={navigation.navigate} />
    ),
  });

  renderWidget = ({ item }) => (
    <ListItem
      title={item.title}
      leftIcon={{ name: item.icon, type: item.type }}
      onPress={() => this.handlePress(item)}
    />
  );

  handlePress = (item) => {
    const { navigate } = this.props.navigation;
    switch (item.title) {
      case 'Edit profile':
        navigate('EditProfile');
        break;
      case 'Change password':
        navigate('ChangePasswordForm');
        break;
      case 'Give us feedback':
        navigate('GiveFeedback');
        break;
      default:
        console.log(item.title);
    }
  }

  render() {
    const list = [
      {
        title: 'Edit profile',
        icon: 'face-profile',
        type: 'material-community',
      },
      {
        title: 'Change password',
        icon: 'textbox-password',
        type: 'material-community',
      },
      {
        title: 'Notifications',
        icon: 'notifications',
      },
      {
        title: 'Locale',
        icon: 'earth',
        type: 'material-community',
      },
      {
        title: 'Give us feedback',
        icon: 'feedback',
      },
      {
        title: 'Logout',
        icon: 'logout',
        type: 'material-community',
      },
    ];

    return (
      <FlatListComponent
        data={list}
        keyExtractor={item => item.title}
        renderItem={this.renderWidget}
      />
    );
  }
}
