import React from 'react';
import {
  Text,
  FlatList,
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { PropTypes } from 'prop-types';

export const PreviewCardList = (props) => {
  const renderWidget = ({ item }) => (
    <Card
      title={item.title}
    >
      <Text style={{ marginBottom: 10 }}>
        {item.summary}
      </Text>
      <Button
        icon={{ name: props.iconName }}
        backgroundColor={props.buttonColor}
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title={props.buttonTitle}
        onPress={() => props.navigation.navigate('Detail', item)}
      />
    </Card>
  );

  return (
    <FlatList
      data={props.data}
      keyExtractor={item => item.title}
      renderItem={renderWidget}
    />
  );
};

PreviewCardList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  iconName: PropTypes.string,
  buttonTitle: PropTypes.string,
  buttonColor: PropTypes.string,
};

PreviewCardList.defaultProps = {
  iconName: 'code',
  buttonTitle: 'View More',
  buttonColor: '#03A9F4',
};
