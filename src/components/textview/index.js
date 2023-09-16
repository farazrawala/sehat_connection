import React from 'react';
import { Text, View } from 'react-native';
import { Colors, Constants, Utils } from '../../utils';
import styles from './styles';
const Textview = ({
    text = '',
    customStyles = {},
    lines = null
}) => (
        <Text numberOfLines={lines} style={[customStyles]}>{Utils.capitalizeFirstLetter(text)}</Text>
    );

export { Textview };
