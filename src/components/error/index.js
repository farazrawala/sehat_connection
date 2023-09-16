import React from 'react';
import { Text, View,Image } from 'react-native';
import styles from './styles';
import { Constants } from '../../utils';
import { Textview,Touchable } from '../';

const Error = ({
    text='',
    showRef=false,
    onRef
}) => (
    <Touchable onPress={onRef} buttonStyle={styles.view}>
        <Image source={Constants.logo_color} style={styles.logo} />
        <Textview text={text} customStyles={styles.errorText} />
        
        <Textview text={'Tap to refresh'} customStyles={styles.refText} />
        
    </Touchable>
);

export {Error};
