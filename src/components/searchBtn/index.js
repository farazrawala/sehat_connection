import React, {memo} from 'react';
import {TouchableOpacity, Text, TextInput, View} from 'react-native';
// import AutoCompleteInput from 'react-native-autocomplete-input';
// import {Icon} from 'native-base';
// import {styles} from './styles';

const keyExtractor = item => item.id.toString();
const AutoCompleteInputField = props => {
  console.log('Props', props);

  return (
    <Text>sdalfj</Text>
    // <AutoCompleteInput
    //   containerStyle={styles.autoCompleteField}
    //   // keyExtractor={keyExtractor}
    //   style={styles.autocomplete}
    //   inputContainerStyle={[styles.inputContainerStyle, props.style]}
    //   listStyle={styles.list}
    //   hideResults={props.hideResults}
    //   autoCapitalize={'none'}
    //   placeholder={props.placeholder}
    //   placeholderTextColor="grey"
    //   data={props.data}
    //   onChangeText={props.onChangeText}
    //   onFocus={props.onFocus}
    //   // autoFocus={true}
    //   onBlur={props.onBlur}
    //   defaultValue={props.query}
    //   renderItem={({item}) => (
    //     <TouchableOpacity
    //       style={styles.autoCompleteListItem}
    //       onPress={() => props.onPressItem(item)}>
    //       {/* <Icon
    //         name="map-marker"
    //         type="MaterialCommunityIcons"
    //         style={styles.locationIcon}
    //       /> */}
    //       <Text style={styles.details}>{item.description}</Text>
    //     </TouchableOpacity>
    //   )}
    // />
  );
};

export default memo(AutoCompleteInputField);
