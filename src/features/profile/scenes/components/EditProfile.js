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

  // TODO: add impl once I have designs
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
    const list = [
      {
        title: 'Email',
        subTitle: 'carl.a.hand92@gmail.com',
        icon: 'email',
        type: 'material-community',
      },
      {
        title: 'Gender',
        subTitle: '?',
        icon: 'gender-male-female',
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
