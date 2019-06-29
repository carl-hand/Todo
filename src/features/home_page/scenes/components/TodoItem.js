import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

export const TodoItem = props => (
  <Card>
    <View style={style.container}>
      <Icon name="minuscircleo" size={20} color="red" />
      <Text>{props.task}</Text>
    </View>
  </Card>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navbarImage: {
    left: 1,
  },
  text: {
    paddingVertical: 10,
  },
});
