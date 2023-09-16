import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Constants } from '../../utils';

// import PropTypes from 'prop-types';

class BgButton extends Component {


    render() {

        const { text, textColor, wrapperPadding = 3, wrapperbg, bordercolor = Constants.grey, rightMargin = 0,
            fontsize = 12, background, width, bdHeight, icon, bdRadius, handleOnPress,
            customStyle, customStyletextbox, customStyleText } = this.props;
        const backgroundColor = background || 'trasparent';
        const color = textColor || 'black';
        const r_margin = rightMargin;
        const WrapperBackground = wrapperbg || 'trasparent';
        
        return (
            <TouchableOpacity
                onPress={handleOnPress} style={[styles.touchBtn, { backgroundColor: WrapperBackground, padding: wrapperPadding }]} >
                <View style={[styles.buttonTextWrappper, { backgroundColor, width, customStyle, borderColor: bordercolor, borderRadius: bdRadius, height: bdHeight }, styles.wrapper]}>
                    <Text style={[{ color: color, fontSize: fontsize }, styles.buttonText]} >{text}</Text>
                </View>
            </TouchableOpacity >
        );
    }
}

export { BgButton };

const styles = StyleSheet.create({

    buttonText:
    {
        textAlign: 'center',
        fontFamily: Constants.Oswald_Regular,
        paddingHorizontal: 12,
    },
    buttonTextWrappper:
    {
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Constants.btnShadow,
        borderRadius: 35,
    }

});
