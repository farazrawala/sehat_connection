import { Constants } from '../../utils';
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Surface } from 'react-native-paper';

import React from 'react';
const NewLoad = ({
    onPress,
    item,
    customStyle,
    index
}) => (

        <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }} >
            <Surface style={[styles.menuWrapper, customStyle]}>

                <View style={styles.menuDesc}>
                    <View style={[styles.menuIconWrapper]}>
                        <Image
                            source={item.icon}
                            style={styles.menuIconStyle}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View style={[styles.menuBottomBar, { backgroundColor: item.color }]}></View>
            </Surface>

            <Text style={styles.menuTextStyle}>{item.title}</Text>

        </TouchableOpacity>
    );


export { NewLoad };

const styles = StyleSheet.create({

    menuWrapper: {
        width: Constants.ScreenWidth / 2.4,
        height: Constants.ScreenWidth / 2.5,
        backgroundColor: 'white',
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        // overflow: 'hidden',
        elevation: 4,
    },
    menuTextStyle: {
        fontSize: Constants.FontSize.small,
        marginTop: 10,
        fontFamily: Constants.PoppinsLight
    },
    menuIconWrapper: {
        width: 60,
        height: 60,
        // backgroundColor: 'green',
        // borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    menuIconStyle: {
        width: 45,
        height: 45,
    },
    menuBottomBar: {
        height: 6,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    menuDesc: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});