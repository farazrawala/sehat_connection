import Constants from '../../Constants';
const styles = {
    background:{
        posiition:"absolute",
        left:0,
        top:0,
        zIndex:999,
        backgroundColor:"rgba(0,0,0,0.7)",
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        width:Constants.d_width,
        height:Constants.d_height,
    },
    mainView:{
        borderRadius: 10,
        backgroundColor:"#fff",
        width:"100%",
        overflow: 'hidden',
        minHeight: Constants.d_height/2,
    },
    subView:{
        flex:1,
        paddingVertical: 25,
    },
    title:{
        fontSize: 23,
        paddingVertical:5,
        color:Constants.popupTitleColor,
        textAlign:'center',
    },
    description:{
        fontSize: 15,
        paddingVertical:5,
        textAlign:'center',
        color:Constants.popupDescriptionColor,
    },
    itemContainer:{
        flex:1,
        // backgroundColor:"#cff"
    }
}
export default styles;