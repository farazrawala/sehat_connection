import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Platform } from 'react-native';
import { Picker, Item, Icon } from 'native-base';
import { Constants } from '../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

class CameraIcon extends Component {

    render() {

        return (
            <View style={styles.wrapper} >
                <TouchableOpacity style={styles.inputView}>
                    <View style={{ width: 90, height: 90, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="camera" type="AntDesign" style={styles.iconStyle} />
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}


export { CameraIcon };

const styles = StyleSheet.create({
    wrapper: {

        alignItems: 'center',
        width: '100%',
        // borderWidth: .5,

    },
    inputView: {
        width: 90,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15,
        flexDirection: 'row',
        marginVertical: 20,
        marginHorizontal: 10,
        borderWidth: .5,
        borderColor: '#eee',

        backgroundColor: "#FFF",
        shadowColor: "#787878",
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: Platform.OS == 'ios' ? 1 : 1,

    },
    iconStyle: {
        fontSize: 34,
        color: Constants.Colors.grey
    }



});
