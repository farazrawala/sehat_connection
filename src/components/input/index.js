import { TextInput } from 'react-native';
import {Colors, Constants} from '../../utils';
import styles from './styles';
import React, { Component } from 'react';

class Input extends Component {
  
  render() {
    const{
        blurOnSubmit=false,
        value='',
        onSubmitEditing,
        onChangeText,
        returnKeyType='done',
        multiline=false,
        placeholder='',
        placeholderTextColor=Colors.placeholderTextColor,
        customStyles={},
        inputRef,
        editable=true,
        secure=false,
        keyboardType='default'
    } = this.props;

    return (
      <TextInput
        secureTextEntry={secure}
        editable={editable}
        keyboardType={keyboardType}
        ref={inputRef}
        blurOnSubmit={blurOnSubmit}
        value={value}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        autoCapitalize='none'
        autoCorrect={false}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={[styles.common,customStyles]}
      />
    );
  }
}

export {Input}
