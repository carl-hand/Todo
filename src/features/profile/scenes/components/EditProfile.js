import React from 'react';
import { ListItem } from 'react-native-elements';
import { FlatListComponent } from '../../../../components/FlatListComponent';

export class EditProfile extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Profile',
  });

  renderWidget = ({ item }) => (
    <ListItem
      title={item.title}
      subtitle={item.subTitle}
      leftIcon={{ name: item.icon, type: item.type }}
      onPress={() => this.handlePress(item)}
    />
  )

  handlePress = (item) => {
    switch (item.title) {
      case 'Email':
        this.props.navigation.navigate('EditEmail', {
          email: item.subTitle,
        });
        break;
      default:
        console.log(item.title);
    }
  }

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    const { email } = params;
    const list = [
      {
        title: 'Email',
        subTitle: email,
        icon: 'email',
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
