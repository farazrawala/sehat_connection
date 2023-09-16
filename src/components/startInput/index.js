import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Platform } from 'react-native';
import { Picker, Item, Icon } from 'native-base';
import { Constants } from '../../utils';

class StarInput extends Component {

    getInput() {

        const {
            children,
            returnKeyType,
            labelTextSize,
            customHeight = 55,
            inputMode,
            labelColor,
            keyboard,
            borderBottomColor,

        } = this.props;
        const fontSize = labelTextSize || 14;
        const color = labelColor || 'black';
        const inputColor = 'black';
        const borderBottom = borderBottomColor || 'transparent';
        const keyboardtype = keyboard || 'default';
        const type = inputMode || 0;
        const KeyType = returnKeyType || 'next';



        return (
            <View style={{ height: customHeight, flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                {children}
            </View>
        );


    }


    render() {
        const { moreStyles, inputCustomStyle, children, label, inputRef, labelTextSize = Constants.FontSize.medium, labelColor, keyboard, textColor, borderBottomColor, inputType, customStyle, compType = '', } = this.props;
        const fontSize = labelTextSize || 15;

        const color = labelColor || 'black';
        const inputColor = 'black';
        const borderBottom = borderBottomColor || 'transparent';
        const keyboardtype = keyboard || 'default';

        var labelCustomStyle = {
            fontSize: labelTextSize
        };

        if (compType == 'mapInput') {
            labelCustomStyle = {
                fontSize: 15,
                marginLeft: 15
            }
        }
        else if (compType == 'creditCard') {
            labelCustomStyle = {
                fontSize: Constants.FontSize.medium,
                fontFamily: Constants.PoppinsMedium,
                paddingLeft: 10,
            }
        }
        else {
            labelCustomStyle = {
                fontSize: 12,
                fontFamily: Constants.PoppinsMedium,
                marginLeft: 15
            }

        }

        return (

            <View style={[styles.wrapper, customStyle]} >
                {
                    label ?
                        <Text style={[styles.labelStyle, labelCustomStyle]}>{label}</Text>
                        : null
                }
                <View style={[styles.inputView, inputCustomStyle]}>
                    <View style={{ flex: 1 }}>
                        {this.getInput()}
                    </View>

                </View>

            </View>



        );
    }
}


export { StarInput };


// CustomInput.PropTypes = {

// }

const styles = StyleSheet.create({
    inputView: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 35,
        marginBottom: 15,
        flexDirection: 'row',


        backgroundColor: "#FFF",
        shadowColor: "#787878",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.3,
        elevation: Platform.OS == 'ios' ? 1 : 1,

        // backgroundColor: 'red',
    },
    wrappperInputField: {
        flexDirection: 'row',
        borderBottomColor: '#e8e5e5',
        borderBottomWidth: 1
    },
    label:
    {
        fontWeight: '700',
        marginBottom: 5,

    },
    InputFieldText:
    {
        paddingHorizontal: 20,
        height: 55,
        flex: 1,
        color: 'black',
        fontSize: 14,
    },
    wrapper:
    {
        display: 'flex',
        marginVertical: 3,
    },
    iconWrapper:
    {
        width: 25,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
    },
    inputIcon: {
        width: 20,
        height: 20,
    },
    pickerPlcholderStyle: {
        width: "100%",
        paddingLeft: 0,

    },
    pickerStyle: {
        // width: "105%",
        // backgroundColor: 'green',
        paddingLeft: 20,
        color: 'white',
    },
    labelStyle: {
        marginBottom: 10,
        marginLeft: 10,
    }

});
