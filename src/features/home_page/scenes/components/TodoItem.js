import * as React from 'react';
import { StyleSheet, AsyncStorage, Animated, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { API } from 'aws-amplify';
import { Api } from '../../../../constants/constants';

export class TodoItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      updateValue: '',
      animatePress: new Animated.Value(1),
      animateItem: new Animated.Value(0),
    };
  }

  componentWillMount() {
    Animated.timing(this.state.animateItem, {
      toValue: 1,
      duration: 300,
    }).start();
  }

  animateIn = () => {
    Animated.timing(this.state.animatePress, {
      toValue: 0.8,
      duration: 200,
    }).start();
  }

  animateOut = () => {
    Animated.timing(this.state.animatePress, {
      toValue: 1,
      duration: 200,
    }).start();
  }

  handleRemove = () => {
    const { index } = this.props;
    this.props.removeTodo(index);
    console.log('remove icon pressed');
  };

  handlePress = () => {
    const { updatedValue } = this.state;
    const { index, navigation, task } = this.props;
    const { navigate } = navigation;
    const value = updatedValue || task;

    navigate('Edit', { task: value, index, onSave: this.updateTodo });
  };

  updateTodo = async (value, index) => {
    this.setState({
      updatedValue: value,
    });

    const id = await AsyncStorage.getItem('clientId');
    const params = {
      body: {
        index,
        task: value,
      },
    };
    try {
      await API.patch(Api.apiName, `${Api.path}/${id}`, params);
    } catch (err) {
      console.log('error updating todo item: ', err);
    }
  };

  //   <Card>
  //   <TouchableWithoutFeedback onPress={this.handlePress}>
  //     <View style={style.container}>
  //       <TouchableWithoutFeedback onPress={this.handleRemove}>
  //         <Icon name="minuscircleo" size={20} color="red" />
  //       </TouchableWithoutFeedback>
  //       <Text>{value}</Text>
  //     </View>
  //   </TouchableWithoutFeedback>
  // </Card>
  render() {
    const { updatedValue } = this.state;
    const value = updatedValue || this.props.task;
    const deviceWidth = Dimensions.get('window').width;

    return (
      <TouchableWithoutFeedback onPress={this.handlePress} onPressIn={this.animateIn} onPressOut={this.animateOut}>
        <Animated.View style={{
          margin: 5,
          transform: [
            {
              scale: this.state.animatePress,
            },
            {
              translateX: this.state.animateItem.interpolate({
                inputRange: [0, 1],
                outputRange: [deviceWidth, 1],
              }),
            },
          ],
        }}
        >
          <ListItem
            containerStyle={style.container}
            bottomDivider
            title={value}
            leftIcon={(
              <TouchableWithoutFeedback onPress={this.handleRemove}>
                <Icon name="minuscircleo" size={20} color="red" />
              </TouchableWithoutFeedback>
            )}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const style = StyleSheet.create({
  container: {
    padding: 15,
  },
});
