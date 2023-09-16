import React, { PureComponent } from 'react';
import { Constants } from '../../utils';
import { StyleSheet, Text, } from 'react-native';

class CustomText extends PureComponent {


    render() {

        
        const { txt, family, customStyle, type = '', fontSize = null, textColor,fontFamily=null } = this.props;
        var Font = family || Constants.PoppinsRegular;
        // var size = fontSize || 20;
        var size = fontSize || 20;
        var txtColor = textColor || 'black';
        var weight = null;
        // alert(fontFamily)
        if (type == 'heading') {
            Font = fontFamily == null ? Constants.PoppinsSemiBold : fontFamily;
            size = fontSize == null ? 20 :fontSize;
        }
        if (type == 'label') {
            Font = fontFamily == null ? Constants.PoppinsMedium : fontFamily;
            size =  fontSize == null ? 16 :fontSize;
            txtColor = textColor || Constants.Colors.grey
        }
        if (type == 'labelSmall') {
            Font = fontFamily == null ? Constants.PoppinsMedium : fontFamily;
            size =  fontSize == null ? 13 :fontSize
            txtColor = textColor || Constants.Colors.grey
        }
        if(fontSize != null){
            size = fontSize
        }
        
        return (
            <Text style={[customStyle, { fontWeight: weight, fontFamily: Font, fontSize: size, color: txtColor }]} >{txt}</Text>
        );

    }
}

export { CustomText };

const styles = StyleSheet.create({

});