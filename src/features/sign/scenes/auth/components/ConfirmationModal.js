import React from 'react';
import {
  View,
  Modal,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { universalStyles } from '../../../../../shared_styles/universalStyles';

export class ConfirmationModal extends React.Component {
  static propTypes = {
    handleConfirmationCode: PropTypes.func.isRequired,
    updateConfirmationCode: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.isVisible,
    };
  }

  handleClose = () => {
    this.setState({
      isVisible: false,
    });
  }

  // Set this.state.confirmationCode to the value in this Input box
  // eslint-disable-next-line react/destructuring-assignment
  handleChangeText = value => this.props.updateConfirmationCode(value);

  handlePress = () => this.props.handleConfirmationCode();

  render() {
    const { isVisible } = this.state;
    return (
      <Modal isVisible={isVisible} onRequestClose={this.handleClose}>
        <View
          style={universalStyles.container}
        >
          <Input
            label="Confirmation Code"
            rightIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={this.handleChangeText}
          />
          <Button
            title="Submit"
            onPress={this.handlePress}
          />
        </View>
      </Modal>
    );
  }
}
