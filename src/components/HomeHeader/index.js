import React, { Component } from 'react';
// import Constant from '../../common/Constants';
import { Constants } from '../../utils';
import { StyleSheet, Text, View, Image, StatusBar, TextInput, TouchableOpacity, Platform, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Textview } from '../textview';

class HomeHeader extends Component {

    componentDidMount() {
        // alert(!23)
        StatusBar.setBarStyle('light-content');
    }

    render() {

        const {navbarHeight, text, iconleft, bgColor, profilePress, textColor, iconsearch, isText, isImage, searchValue, searchBar, onSearchPress, iconright, onLeftPress, onRightPress, onSearchpress } = this.props;
        const backgroundColor = bgColor || 'white';
        const txtColor = textColor || 'white';
        const barHeight = navbarHeight;
        //Platform.OS == 'ios' ? 90 : 80;
        // const barHeight = barheight || Platform.OS == 'ios' ? 90 : 80;
        // console.log('navbarHeight = = => ' , navbarHeight);
        
        return (
            <Animated.View style={[styles.headerMainContainer,{height:barHeight}]}>
                {/* <View><Textview  text="asdfasdfasf"/></View> */}
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#252eb2', '#4f59ea']}
                    style={[styles.mainHeader,{height:"100%"}]}>
                        <StatusBar barStyle="light-content" />

                        <Image
                            source={Constants.white_logo}
                            style={styles.logoStyle}
                        />


                        <Animated.View style={[styles.container]}>
                            <View style={styles.loadStyle}>
                                <Text style={styles.textTotalLoads}>TOTAL LOADS</Text>
                                <Text style={styles.figureTotalLoads}>258798</Text>
                            </View>
                            <View style={{ flex: 1 }}>

                            </View>
                            <TouchableOpacity onPress={profilePress} style={styles.imgWrapper}>
                                <Image
                                    source={Constants.profileAvatar}
                                    style={styles.profileStyle}
                                />
                            </TouchableOpacity>
                        </Animated.View>

                </LinearGradient>
            </Animated.View>
        );
    }
}

export { HomeHeader };

const styles = StyleSheet.create({

    statusbar: {
        height: Platform.OS == 'ios' ? 34 : 0,
        backgroundColor: 'white',
    },
    profileStyle: {
        width: 55,
        height: 55,
        borderRadius: 28
    },
    imgWrapper: {
        // borderRadius: 30,
        // over
    },
    textTotalLoads: {
        color: 'white',
        fontSize:12,
        fontFamily: Constants.PoppinsMedium,
    },
    figureTotalLoads: {
        color: 'white',
        fontSize:39,
        lineHeight:55,
        height:45,
        fontFamily: Constants.PoppinsSemiBold,
        // backgroundColor:"grey",
        // marginTop: -5
    },

    loadStyle: {

    },
    logoStyle: {
        width: 95,
        height: Platform.OS == 'ios' ?70 : 60,
        marginTop: 25,
        resizeMode: 'contain',
    },
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        // backgroundColor:"red",
        justifyContent: 'center'
    },
    mainHeader: {
        // height: Platform.OS == 'ios' ? 180 : 160,
        // height: Platform.OS == 'ios' ? 90 : 80,
        // zIndex: 99,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        alignItems: 'center',
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27,
        // elevation: 9,
        // borderBottomColor: 'grey',
        // borderBottomWidth: 1,
        // borderBottomLeftRadius: 50,
        // borderBottomRightRadius: 50,


    },
    headerMainContainer:{
        zIndex: 99,
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 9,
        borderBottomColor: 'grey',
        // borderBottomWidth: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow:'hidden',
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        // backgroundColor:"transparent",
        // height:barHeight,
        alignItems:'center'
    }

});