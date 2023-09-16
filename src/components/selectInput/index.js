import React from 'react';
import { Text, View, TextInput,TouchableOpacity } from 'react-native';
import styles from './styles';
import Constants from '../../Constants';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _renderInput = () => {
      const{
          placeholder ='',
          onTextChange,
          value='',
          onSubmitEditing,
          returnKeyType='done',
          blurOnSubmit=false          
      }
    return(
      <View style={styles.inputView}>
        <TextInput
            placeholder=''
            onTextChange={onTextChange}
            onSubmitEditing={onSubmitEditing}
            autoCapitalize='none'
            autoCorrect={false}
            value={value}
            blurOnSubmit={blurOnSubmit}
            returnKeyType={returnKeyType}
            style={styles.input}
        />
      </View>
    )
  }

  _renderSelector = () => {
    const {
      onSelectorPress,
      selectorValue
    } = this.props;
    <TouchableOpacity onPress={onSelectorPress}>
      <View style={styles.selectorView}>
        <View style={{flex:1}}>
          <Text style={styles.selectorText}>{selectorValue}</Text>
        </View>
        <Icon name='keyboard-arrow-down' style={styles.arrowDown} />
      </View>
    </TouchableOpacity>
  }

  render() {
      const {
          selector=false,
          title='',
          children
      } = this.props
    return (
      <View style={styles.container}>
        {children}
        <View style={styles.subContiner}>
          {title != '' ? <Text style={styles.title}>{title}</Text> : null}
          {selector ? this._renderSelector() : this._renderInput()}
        </View>
      </View>
    );
  }
}
export {SelectInput} 
