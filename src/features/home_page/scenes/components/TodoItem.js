import * as React from 'react';
import { StyleSheet, AsyncStorage, Animated, Dimensions, Easing } from 'react-native';
import { ListItem } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { API } from 'aws-amplify';
import { Api } from '../../../../constants/constants';

export class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.isRemoving = false;
    this.state = {
      updateValue: '',
      animatePress: new Animated.Value(1),
      animateAdd: new Animated.Value(0),
    };
  }

  componentWillMount() {
    Animated.timing(this.state.animateAdd, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isRemoved) {
      nextProps.onRemoving();
    }
  }

  animateIn = () => {
    Animated.timing(this.state.animatePress, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  animateOut = () => {
    Animated.timing(this.state.animatePress, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  handleRemove = () => {
    // prevent handlePress functionality when deleting item
    this.isRemoving = true;
    const { index } = this.props;
    this.props.removeTodo(index);
    console.log('remove icon pressed');
  };

  handlePress = () => {
    if (!this.isRemoving) {
      const { updatedValue } = this.state;
      const { index, navigation, task } = this.props;
      const { navigate } = navigation;
      const value = updatedValue || task;

      navigate('Edit', { task: value, index, onSave: this.updateTodo });
    } else {
      this.isRemoving = false;
    }
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
              <TouchableWithoutFeedback
                onPress={this.handleRemove}
                hitSlop={{
                  top: 20, bottom: 20, left: 20, right: 40,
                }}
              >
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
