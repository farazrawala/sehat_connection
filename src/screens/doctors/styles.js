import {Constants, Colors} from '../../utils';
import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  Container: {
    flex: 1,
    // backgroundColor: 'red'
  },
  searchInputWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrapper: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.Colors.primaryGreen,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  // bannerStyle: {
  //   resizeMode: 'cover',
  //   width: Constants.ScreenWidth - 30,
  //   height: 180,
  //   marginVertical: 10,
  //   borderRadius: 15,
  //   // borderWidth: 2,
  //   borderColor: Constants.Colors.primaryBlue,
  // },
  filterWrapper: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '100%',
    height: 40,
    fontSize: 16,
    paddingHorizontal: 20,
    color:Constants.Colors.primaryBlue
  },
  searchContainer: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    marginVertical: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  categoryContainer: {
    height: 250,
    // backgroundColor: 'red',
    padding: 20,
  },
  desContainer: {
    // flex: 1,
    // padding: 20,
    marginTop: -25,
    paddingHorizontal: 30,
    // paddingVertical: 20,
    paddingBottom: 20,
    // height: 500,
    backgroundColor: Constants.Colors.primaryBlue,
  },
  bannerStyle: {
    resizeMode: 'contain',
    width: Constants.ScreenWidth - 30,
    height: 150,
    marginVertical: 10,
    borderRadius: 15,
    // borderWidth: 2,
    // borderColor: 'red',
  },
  searchContainer: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    marginVertical: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  filterWrapper: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrapper: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.Colors.primaryGreen,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  searchIcon: {
    color: Constants.Colors.primaryGreen,
    fontSize:20,
  },
  fitlerIcon: {
    color: 'white',
    fontSize:20,
  },
  searchInputWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '100%',
    color:Constants.Colors.primaryBlue
,    // borderWidth: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  tabContainer: {
    borderRadius: 5,
    width: '100%',
    backgroundColor: 'white',
    height: 40,

    marginVertical: 15,
    marginTop: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  tabWrapper: {
    flex: 1,
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 99999,
    backgroundColor: '#60606066',
  },
  modalView: {
    // margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECEEF5',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    height: '60%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Constants.Colors.grey,
  },
  numberInputStyle: {
    width: 200,
    height: 45,
    paddingHorizontal: 20,
    color: Constants.Colors.grey,
    // textAlign: 'center',
    // borderWidth: 1,
    fontSize: 15,
    borderRadius: 25,
    backgroundColor: 'white',

    shadowColor: '#000',
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
    justifyContent: 'center',
  },
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
});
export default loginStyles;
