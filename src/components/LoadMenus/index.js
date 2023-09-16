import React, { PureComponent } from 'react';
import { Constants } from '../../utils';
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Surface } from 'react-native-paper';


class LoadMenus extends PureComponent {

    render() {

        const { item, index, onPress, activeTab } = this.props;

        const fontWeight = activeTab == item.menuType ? '600' : null
        const borderWidth = activeTab == item.menuType ? 1 : 0
        var borderColor = item.borderColor || 'black';

        // console.log

        return (
            <TouchableOpacity activeOpacity={0.95} style={styles.Container} onPress={onPress} >
                <Surface style={[styles.menuWrapper, { borderWidth, borderColor }]}>

                    {
                        item.batch > 0 ?
                            <View style={styles.batchWrapper}><Text style={styles.txtBatch}>{item.batch}</Text></View>
                            : null
                    }

                    <View style={styles.menuDesc}>

                        <View style={[styles.menuIconWrapper, { backgroundColor: item.color }]}>
                            <Image
                                source={item.icon}
                                style={styles.menuIconStyle}
                            />
                        </View>
                    </View>
                </Surface>
                <Text style={[styles.menuTextStyle, { fontWeight: fontWeight }]}>{item.title}</Text>
            </TouchableOpacity>
        );
    }
}

export { LoadMenus };

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center'
    },
    txtBatch: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold'

    },
    batchWrapper: {
        // position: 'right',\
        right: -8,
        top: -8,
        width: 25,
        height: 25,
        backgroundColor: Constants.Colors.reddish,
        borderRadius: 13,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuWrapper: {
        width: 70,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 8,
        marginHorizontal: 10,
        marginVertical: 10,
        elevation: 4,
        // borderWidth: .5,
    },
    menuTextStyle: {
        fontSize: Constants.FontSize.small,
        marginTop: 4,
        fontFamily: Constants.PoppinsRegular
    },
    menuIconWrapper: {
        width: 60,
        height: 60,
        backgroundColor: 'green',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuContainer: {
        // justifyContent: 'space-between'
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    menuIconStyle: {
        width: 30,
        height: 30,
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