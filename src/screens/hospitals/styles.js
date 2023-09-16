import { Constants, Colors } from "../../utils";
import { StyleSheet } from "react-native";


const loginStyles = StyleSheet.create({

    Container: {
        flex: 1,
        // backgroundColor: 'red'
        backgroundColor: 'red'
    },
    categoryContainer: {
        height: 250,
        // backgroundColor: 'red',
        padding: 20,
    },
    desContainer: {
        flex: 1,
        // backgroundColor: ,
        // paddingVertical: 20,
        // paddingTop: 20,
        backgroundColor: Constants.Colors.backgrounGrey
    },
    searchContainer: {
        // width: '100%',
        height: 50,
        borderRadius: 10,
        marginVertical: 30,
        marginHorizontal: 20,
        // paddingHorizontal: 20,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    filterWrapper: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchWrapper: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Constants.Colors.primaryGreen,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    searchIcon: {
        color: Constants.Colors.primaryGreen,
        fontSize:20,
    },
    fitlerIcon: {
        color: 'white'
    },
    searchInputWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        width: '100%',
        // borderWidth: 1,
        height: 50,
        fontSize: 20,
        paddingHorizontal: 20,
            color:Constants.Colors.primaryBlue
    },
    tabContainer: {
        borderRadius: 5,
        width: '100%',
        backgroundColor: 'white',
        height: 50,
        marginVertical: 15,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    tabWrapper: {
        flex: 1,
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 5,
    },



    centeredView: {
        flex: 1,
        width: Constants.ScreenWidth,
        height: Constants.ScreenHeight,
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        zIndex: 99999,
        backgroundColor: '#60606066'
    },
    modalView: {
        // margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#ECEEF5",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        height: '60%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: "center",
        color: Constants.Colors.grey
    },
    numberInputStyle: {
        width: '75%',
        height: 45,
        paddingHorizontal: 20,
        color: Constants.Colors.grey,
        // textAlign: 'center',
        // borderWidth: 1,
        fontSize: 20,
        borderRadius: 25,
        backgroundColor: 'white',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    crossTxtStyle: {
        fontSize: 30,
        color: Constants.Colors.primaryGreen,
        fontWeight: 'bold',
    },
    crossBtnWrapper: {
        width: 60,
        height: 60,
        // color: Constants.Colors.primaryGreen,
        // backgroundColor: 'red',
        // zIndex:9999,
        position: 'absolute',
        top: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
    // numberInputWrapper: {
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 2,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,
    //     elevation: 5,
    // },

    // desContainer: {

    // }


})
export default loginStyles;