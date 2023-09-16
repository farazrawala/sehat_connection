import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Platform } from 'react-native';
import { Picker, Item, Icon } from 'native-base';
// import Constant from '../../common/Constants';
import { Constants } from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

class LogTabHeader extends Component {


    render() {
        const { active, label1 = '', label2 = '',
            label3 = '', label4 = '', customStyle,
            onPress1,
            onPress2,
            onPress3,
            onPress4,
        } = this.props;

        const selected = ['#252eb2', '#4f59ea'];
        const unselected = ['#fff', '#fff'];



        return (

            <View style={[styles.wrapper, customStyle]} >
                <View style={styles.inputView}>
                    <View style={styles.textContainer}>


                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={active == 1 ? selected : unselected}
                            style={[styles.textWrapper]}>
                            <TouchableOpacity onPress={onPress1} style={{ padding: 13 }}>
                                <Text style={[styles.txtStyle, { color: active == 1 ? 'white' : null }]}  >{label1}</Text>
                            </TouchableOpacity>

                        </LinearGradient>



                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={active == 2 ? selected : unselected}
                            style={[styles.textWrapper]}>
                            <TouchableOpacity onPress={onPress2} style={{ padding: 13 }}>
                                <Text style={[styles.txtStyle, { color: active == 2 ? 'white' : null }]}  >{label2}</Text>
                            </TouchableOpacity>

                        </LinearGradient>

                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={active == 3 ? selected : unselected}
                            style={[styles.textWrapper]}>
                            <TouchableOpacity onPress={onPress3} style={{ padding: 13 }}>
                                <Text style={[styles.txtStyle, { color: active == 3 ? 'white' : null }]}  >{label3}</Text>
                            </TouchableOpacity>

                        </LinearGradient>

                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={active == 4 ? selected : unselected}
                            style={[styles.textWrapper]}>
                            <TouchableOpacity onPress={onPress4} style={{ padding: 13 }}>
                                <Text style={[styles.txtStyle, { color: active == 4 ? 'white' : null }]}  >{label4}</Text>
                            </TouchableOpacity>

                        </LinearGradient>








                    </View>
                </View>
            </View>

        );
    }
}


export { LogTabHeader };


const styles = StyleSheet.create({
    wrapper: {
        // marginBottom: 50
        height: 70,
    },
    inputView: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 35,
        marginBottom: 15,
        flexDirection: 'row',


        backgroundColor: "#FFF",
        shadowColor: "#787878",
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: Platform.OS == 'ios' ? 3 : 3,

    },
    textContainer: {

        borderRadius: 30,
        flex: 1,
        // backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    textWrapper: {
        // backgroundColor: 'red',
        borderRadius: 30,
        flex: 1,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'

    },
    txtStyle: {
        fontSize: 12,
        color: Constants.Colors.black,
        fontFamily: Constants.PoppinsLight,
    },

    yellowWrapper: {
        backgroundColor: Constants.Colors.primaryYellow,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30
    }


});
