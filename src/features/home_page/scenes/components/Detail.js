import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Text } from 'react-native-elements';
import { LogoutButton } from '../../../../components/LogoutButton';

export class Detail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <LogoutButton navigate={navigation.navigate} />
    ),
    title: navigation.state.params.title,
  });

  render() {
    const item = this.props.navigation.state.params;

    return (
      <View style={{ ...styles.backgroundColor }}>
        <Text>{item.info}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: '#F5FCFF',
  },
});
