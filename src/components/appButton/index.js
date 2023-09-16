import React, { memo } from 'react';
import { Text, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { styles } from './styles';

const AppButton = ({ buttonText, onPress, style, textStyle, leftIcon , disabled, leftIconType, leftIconStyle }) => {
  return (
    <TouchableOpacity style={[styles.buttonStyle, style]}  onPress={onPress} activeOpacity={0.65} >
      {leftIcon && (
        <Icon name={leftIcon} type={leftIconType} style={[styles.leftIcon, leftIconStyle]} />
      )}
      <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default memo(AppButton);


