import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { LogoutButton } from '../../../components/LogoutButton';
import { TodoContainer } from './components/TodoContainer';

export class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <LogoutButton navigate={navigation.navigate} />
    ),
  });

  render() {
    return (
      <View style={{ ...styles.container }}>
        <TodoContainer navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
