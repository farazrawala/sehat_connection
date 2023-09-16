import Constants from "../../Constants";

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
        width:"90%",
        minHeight: Constants.d_height/2,
    },
    itemView:{
        flexDirection: 'row',
        marginVertical: 5,
        paddingHorizontal:10,
        paddingVertical:12,
    },
    itemIcon:{
        fontSize: 22,
        marginRight:10
    },
    itemTitle:{
        fontSize: 15,
        color:Constants.blackColor
    }
}
export default styles;