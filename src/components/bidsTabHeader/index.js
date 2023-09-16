import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Platform } from 'react-native';
import { Picker, Item, Icon } from 'native-base';
// import Constant from '../../common/Constants';
import { Constants } from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Touchable } from '../touchable';

class BidsTabHeader extends Component {


    render() {
        const { active, label1 = '', label2 = '',
            label3 = '', customStyle,
            onPress1,
            onPress2,
            onPress3,
        } = this.props;

        const selected = ['#252eb2', '#4f59ea'];
        const unselected = ['#fff', '#fff'];



        return (

            <View style={[styles.wrapper, customStyle]} >
                <View style={styles.inputView}>
                    <View style={styles.textContainer}>

                        <Touchable buttonStyle={styles.buttonView} onPress={onPress1}>

                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={active == 1 ? selected : unselected}
                                style={[styles.textWrapper]}>
                                    <Text style={[styles.txtStyle, { color: active == 1 ? 'white' : null }]}  >{label1}</Text>

                            </LinearGradient>
                        </Touchable>


                        <Touchable onPress={onPress2} buttonStyle={styles.buttonView}>
                            <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={active == 2 ? selected : unselected}
                            style={[styles.textWrapper]}>
                            
                                <Text style={[styles.txtStyle, { color: active == 2 ? 'white' : null }]}  >{label2}</Text>

                            </LinearGradient>
                        </Touchable>




                    </View>
                </View>
            </View>



        );
    }
}


export { BidsTabHeader };


const styles = StyleSheet.create({
    wrapper: {
        // marginBottom: 50
    },
    inputView: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 35,
        marginBottom: 15,
        flexDirection: 'row',
        padding: 3,


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
    buttonView:{
        borderRadius: 30,
        flex: 1,
    },
    textWrapper: {
        // backgroundColor: 'red',
        borderRadius: 30,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center'

    },
    txtStyle: {
        fontSize: 13,
        color: Constants.Colors.black,
        fontFamily: Constants.PoppinsRegular,
    },

    yellowWrapper: {
        backgroundColor: Constants.Colors.primaryYellow,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30
    }


});
