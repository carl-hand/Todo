import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

export const TodoItem = (props) => {

  // handleRemove = () => {
  //   props.handleRemove
  // }

  return (
    <Card>
      <View style={style.container}>
        <TouchableWithoutFeedback>
          <Icon name="minuscircleo" size={20} color="red" />
        </TouchableWithoutFeedback>
        <Text>{props.task}</Text>
      </View>
    </Card>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
