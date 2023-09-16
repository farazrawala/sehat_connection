import { Constants, Colors } from "../../utils";
import { StyleSheet } from "react-native";


const loginStyles = StyleSheet.create({

    Container: {
        flex: 1,
        // backgroundColor: 'red'
        backgroundColor: Constants.Colors.backgrounGrey

    },

    categoryContainer: {
        height: 250,
        // backgroundColor: 'red',
        padding: 20,

    },
    desContainer: {
        // paddingHorizontal: 30,
        paddingVertical: 20,
        flex: 1,
        // backgroundColor: 'yellow',
        alignItems: 'center'
    },
    Wrapper: {
        width: Constants.ScreenWidth,

        borderBottomWidth: .5,
        borderBottomColor: Constants.Colors.grey,
        height: 55,
        flexDirection: 'row'
    },
    iconWrapper: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconStyle: {
        color: Constants.Colors.primaryGreen,
        fontSize: 20,
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    dateStyle: {
        fontSize: 15,
        color: Constants.Colors.grey,
    },
    timeWrapper: {
        justifyContent: 'center',
        paddingRight: 20,
    }



})
export default loginStyles;