import { Colors } from "../../utils";

const styles = {
    view:{
        width:"100%",
        height:60,
        backgroundColor:Colors.whiteColor,
        flexDirection: 'row',
        elevation:4,
        shadowOpacity: 0.2,
        shadowColor: Colors.shadowColor,
        shadowOffset: {width:0, height:-3},
        shadowRadius: 5,
    },
    tabButton:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabIcon:{
        width:55,
        height:55,
    }
}
export default styles;