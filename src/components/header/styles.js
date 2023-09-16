import {Constants, Colors} from '../../utils';

const styles = {
  statusbar: {
    height: Constants.Platform == 'ios' ? 34 : 0,
    width: '100%',
    // backgroundColor:"red"
  },
  buttonWrapper:{
    flex:1,
    // width:120,
    // height:120,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 50,
    // backgroundColor:'yellow',
    // borderWidth:1,
  },
  callingIcon:{
    fontSize:40,
    color:'white'
  },
  gradientHeader: {
    minHeight: Platform.OS == 'ios' ? 100 : 60,
    width: '100%',
    height: '100%',
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    // overflow: 'visible',
  },
  mainHeader: {
    // height: Platform.OS == 'ios' ? 110 : 84,
    minHeight: Platform.OS == 'ios' ? 100 : 60,
    zIndex: 99,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 3,
    // borderBottomWidth: 1,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    // overflow: 'visible',
    // overflow: 'visible',
  },
  mainView: {
    flex: 1,
  },
  view: {
    // flex:1,
    elevation: 4,
    shadowOpacity: 0.2,
    shadowColor: Colors.shadowColor,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
    backgroundColor: Colors.whiteColor,
  },
  subView: {
    flexDirection: 'row',
    height: 60,
    // backgroundColor:"#cff"
    // flex:1,
  },
  buttonView: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  titleContainer: {
    flex: 1,
    paddingHorizontal: 10,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Constants.PoppinsSemiBold,
  },
  leftIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  buttonText: {
    color: Constants.whiteColor,
    fontSize: 15,
  },
  buttonIcon: {
    fontSize: 30,
    color: Constants.whiteColor,
  },
  logIcon: {
    fontSize: 20,
    color: Colors.white,
  },
  videoIcon: {
    fontSize: 30,
    color: Colors.white,
  },
  backIcon: {
    fontSize: 30,
    color: Colors.white,
  },
  searchIcon: {
    fontSize: 30,
    color: Colors.white,
  },
};
export default styles;
