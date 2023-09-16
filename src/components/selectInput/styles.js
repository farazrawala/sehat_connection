import Constants from "../../Constants";

const styles = {
    container:{
        flexDirection: 'row',
        borderBottomColor: Constants.borderColor,
        borderBottomWidth: 1,
        marginBottom:6,
        paddingHorizontal:10
    },
    children:{
        flexDirection: 'row',
        borderBottomColor: Constants.borderColor,
        paddingHorizontal:5
    },
    title:{
        fontSize: 19,
        color:Constants.blackColor,
    },
    arrowDown:{
        fontSize:20,
    },
    inputView:{
        height:40
    },
    selectorView:{
        height:40,
        justifyContent: 'center',
        flexDirection:'row',
    },
    selectorText:{
        color:Constants.blackColor
    },
    input:{
        color:Constants.blackColor
    }
}
export default styles