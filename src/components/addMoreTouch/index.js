import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Picker, Item, Icon } from 'native-base';
import { Constants } from '../../utils';
import { CustomText } from '../../components';


class AddMoreTouch extends Component {
    render() {

        const { onPress, text = 'Add More Container' } = this.props;
        return (
            <View style={styles.wrapper}  >
                <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <View>
                        <Icon style={styles.iconStyle} type="AntDesign" name="plussquare" />
                    </View>
                    <Text style={styles.txtStyle} >{text}</Text>
                </TouchableOpacity>
            </View>

        );
    }
}


export { AddMoreTouch };


const styles = StyleSheet.create({
    wrapper: {

    },
    iconStyle: {

        fontSize: 18,
        color: Constants.Colors.grey,
        marginHorizontal: 5

    },
    inputView: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 35,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',

    },
    selected: {
        backgroundColor: "white",
        shadowColor: "#787878",
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: Platform.OS == 'ios' ? 3 : 3,
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
    },
    txtStyle: {
        fontSize: 12,
        color: Constants.Colors.grey,
        fontFamily: Constants.PoppinsLight,
    },

});
