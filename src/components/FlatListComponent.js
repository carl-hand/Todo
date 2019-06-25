import React from 'react';
import { View, FlatList } from 'react-native';
import { PropTypes } from 'prop-types';

export const FlatListComponent = (props) => {
  const renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%',
      }}
    />
  );

  return (
    <FlatList
      data={props.data}
      keyExtractor={item => item.title}
      renderItem={props.renderItem}
      ItemSeparatorComponent={renderSeparator}
    />
  );
};

FlatListComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderItem: PropTypes.func.isRequired,
};
