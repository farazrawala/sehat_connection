import {Constants, Colors} from '../../utils';
import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Constants.Colors.backgrounGrey,
  },
  timeWrapper: {
    // height: 50,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  desContainer: {
    flex: 1,
    // backgroundColor: 'red'
  },
  profileContainer: {
    height: 180,
    width: '100%',
    // borderWidth: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
  avatarImgContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  avatarDescContainer: {
    flex: 3,
    justifyContent: 'center',
    // backgroundColor: 'purple',
  },
  modalImag: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarStyle: {
    resizeMode: 'contain',
    // backgroundColor: 'red',
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  deseasTxtStyl: {
    // marginVertical: 5,
    marginBottom: 5,
  },
  profileImgWrapper: {
    paddingTop: 10,
    // borderRadius: 50,
    // width: 100,
    // backgroundColor: 'blue',
  },
  patientProfileIcon: {
    fontSize: 18,
    color: Constants.Colors.primaryGreen,
    // marginHorizontal: 5,
  },
  nameHeadingStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    // backgroundColor: 'yellow',
    color: Constants.Colors.primaryBlue,
  },
  ageStyle: {
    // fontStyle: 15,
    fontSize: 14,
    marginVertical: 5,
  },
  consultationHeadingStyle: {
    // color: Constants.Colors.primaryBlue,
    color: Constants.Colors.primaryBlue,
  },
  consultationTextStyle: {
    // color: Constants.Colors.grey,
    color: Constants.Colors.primaryBlue,
  },
  dateStyleTxt: {
    position: 'absolute',
    top: 10,
    right: 20,
    color: Constants.Colors.primaryGreen,
  },
  sectionCotainer: {
    backgroundColor: 'white',
    // height: 150,
    width: '100%',
  },
  rightWrapper: {
    height: 40,
    flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  printCopyStyle: {
    color: Constants.Colors.primaryBlue,
    fontSize: 18,
  },
  secSubContainer: {
    flex: 1,
    // padding: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    // marginTop:10,
    // marginBottom: 20,
    // backgroundColor: 'yellow',
    // alignItems: 'center',
    // justifyContent:'center'
  },
  symtomsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
    paddingVertical: 2,
    // marginHorizontal: 5,
    marginRight: 5,
    marginBottom: 10,
    backgroundColor: Constants.Colors.primaryBlue,
    borderRadius: 5,
  },
  symptomsContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
  },
  symptontextSytle: {
    color: 'white',
    fontSize: 15,
  },
  crossIconStyle: {
    color: 'white',
    fontSize: 18,
  },
  readMoreStyle: {
    color: Constants.Colors.primaryGreen,
    fontSize: 14,
    fontWeight: 'bold',
  },
  txtStyle: {
    fontSize: 14,
    color: Constants.Colors.grey,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '100%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    width: 30,
    height: 30,
    padding: 10,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default loginStyles;
