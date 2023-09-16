import React, {memo} from 'react';
import {TouchableOpacity, Text, TextInput, View} from 'react-native';
import AutoCompleteInput from 'react-native-autocomplete-input';
// import {Icon} from 'native-base';
import {styles} from './styles';
const keyExtractor = item => item.id.toString();

const AutoCompleteInputField = props => {
  console.log('props', props);
  return <View>{/* <Text>jaskf</Text> */}</View>;
};

// const styles = {};

export {AutoCompleteInputField};
