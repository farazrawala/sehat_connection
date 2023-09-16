import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
// import Constant from '../common/Constants';
import { Icon } from 'native-base';

import { Constants } from '../../utils';
import LinearGradient from 'react-native-linear-gradient';

export default class ButtonBg extends React.Component {
    render() {
        const { label, onPress, withoutBg, styleButton } = this.props;
        return (
            <View style={styleButton}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onPress}>
                    {
                        withoutBg ?
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#fff', '#fff']}
                                style={styles.loginBtnBg}>
                                <Text style={[styles.buttonLoginText, { color: 'grey' }]}>{label}</Text>
                            </LinearGradient>
                            :
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#259fde', '#2b33b2']}
                                style={styles.loginBtnBg}>
                                <Text style={styles.buttonLoginText}>{label}</Text>
                            </LinearGradient>



                    }

                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    loginBtnBg: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    buttonLoginText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
    }
});