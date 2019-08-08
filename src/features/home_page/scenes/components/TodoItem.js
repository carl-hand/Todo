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
      animateAdd: new Animated.Value(0),
      rowHeight: new Animated.Value(60),
    };
  }

  componentWillMount() {
    Animated.timing(this.state.animateAdd, {
      toValue: 1,
      duration: 400,
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isRemoved) {
      this.onRemoving(nextProps.onRemoving);
    }
  }

  onRemoving = (callback) => {
    Animated.timing(this.state.rowHeight, {
      toValue: 1,
      duration: 200,
    }).start(callback);
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

  render() {
    const { updatedValue } = this.state;
    const value = updatedValue || this.props.task;
    const deviceWidth = this.props.isAdded ? Dimensions.get('window').width : 1;

    return (
      <TouchableWithoutFeedback
        onPress={this.handlePress}
        onPressIn={this.animateIn}
        onPressOut={this.animateOut}
      >
        <Animated.View style={{
          margin: 5,
          height: this.state.rowHeight,
          transform: [
            {
              scale: this.state.animatePress,
            },
            {
              translateX: this.state.animateAdd.interpolate({
                inputRange: [0, 1],
                outputRange: [deviceWidth, 1],
              }),
            },
          ],
        }}
        >
          <ListItem
            containerStyle={styles.container}
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

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
});
