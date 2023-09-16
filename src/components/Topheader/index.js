import React, { Component } from 'react';
// import Constant from '../../common/Constants';
import { Constants } from '../../utils';
import { StyleSheet, Text, View, Image, StatusBar, TextInput, TouchableOpacity, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class TopHeader extends Component {


    render() {

        const { text, iconleft, bgColor, textColor, iconsearch, isText, isImage, searchValue, searchBar, onSearchPress, iconright, onLeftPress, onRightPress, onSearchpress } = this.props;
        const txtColor = textColor || 'white';
        return (

            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#252eb2', '#4f59ea']}
                style={styles.mainHeader}>
                <View style={styles.statusbar} />
                <View style={[styles.header, { }]} >
                    <StatusBar barStyle="dark-content" />
                    <TouchableOpacity onPress={onLeftPress} >
                        <View style={styles.HeaderIcon}>
                            {iconleft}
                        </View>
                    </TouchableOpacity>

                    <View style={styles.HeaderTextContainer}  >
                        <Text style={[styles.HeaderText, { color: txtColor }]}  >{text}</Text>
                    </View>

                    <TouchableOpacity onPress={onRightPress} style={styles.HeaderIcon} >
                        {iconright}

                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }
}

export { TopHeader };

const styles = StyleSheet.create({

    statusbar: {
        height: Platform.OS == 'ios' ? 34 : 24,
        backgroundColor: 'white',
    },
    HeaderText:
    {
        color: 'white',
        fontSize: Constants.FontSize.medium,
        fontFamily:Constants.PoppinsMedium
    },
    mainHeader: {
        height: Platform.OS == 'ios' ? 110 : 84,
        zIndex: 99,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        // elevation: 9,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'row'
    },

    SearchIcon:
    {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        width: 50,
    },
    statusbar: {
        height: Platform.OS == 'ios' ? 34 : 24,
        // backgroundColor:Constant.b
        backgroundColor: 'white'
    },
    HeaderTextContainer:
    {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flex: 1,
    },
    header:
    {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20
    },
    icon:
    {
        color: 'white',
        fontSize: 12,
    },
});