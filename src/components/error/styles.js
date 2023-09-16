import {Colors, Constants} from '../../utils';

const styles = {
    view:{
        flex: 1,   
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        width:150,
        height:150,
        resizeMode:'contain',
        tintColor:"#ccc"
    },
    errorText:{
        textAlign:'center',
        color:Colors.greyColor,
        fontSize: Constants.FontSize.medium,
        paddingVertical: 12,
    },
    refText:{
        textAlign:'center',
        color:Colors.blackColor,
        fontSize: Constants.FontSize.medium,
    }
}
export default styles;