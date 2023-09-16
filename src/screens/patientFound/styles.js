import { Constants, Colors } from "../../utils";
import { StyleSheet } from "react-native";


const loginStyles = StyleSheet.create({

    Container: {
        flex: 1,
        // backgroundColor: 'red',
        backgroundColor: Constants.Colors.backgrounGrey

    },

    categoryContainer: {
        height: 250,
        // backgroundColor: 'red',
        padding: 20,

    },
    desContainer: {
        // paddingHorizontal: 30,
        // paddingVertical: 20,
        flex: 1,
        // backgroundColor: 'yellow',
        alignItems: 'center'
    },
    Wrapper: {

        width: Constants.ScreenWidth,
        height: 75,
        justifyContent: 'center',

        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,

        marginBottom: 7,

    },
    iconWrapper: {
        width: 50,
        height: 50,
        alignItems: 'center',

        justifyContent: 'center',
        borderRadius: 25,
        overflow: 'hidden'
    },
    iconStyle: {
        color: Constants.Colors.primaryBlue,
        fontSize: 20,
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    dateStyle: {
        fontSize: 15,
        color: Constants.Colors.grey,
    },
    timeWrapper: {
        justifyContent: 'center',
        paddingRight: 20,
    },
    headingStyle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Constants.Colors.primaryBlue,
        padding: 20,
        // paddingLeft: 20,
        // paddingTop: 20,
    },
    imageStyle: {
        width: 50,
        height: 50,
        // resizeMode: 'stretch',
        backgroundColor: Constants.Colors.primaryBlue,
        borderRadius: 25,
        // borderWidth: 1,
    },
    bigplusStyle: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    imgWrapper: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    }


})
export default loginStyles;