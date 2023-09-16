import {Constants, Colors} from '../../utils';
import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    marginVertical: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  topContDate: {
    fontSize: 14,
    color: Constants.Colors.primaryBlue,
  },
  topContainer: {
    padding: 20,
  },
  instructionStyle: {
    // backgroundColor: Co,
    width: '100%',
    textAlignVertical: 'top',
    padding: 10,
    height: 120,
    borderWidth: 1,
    borderColor: Constants.Colors.primaryBlue,
    borderRadius: 15,
    marginBottom: 10,
  },

  phoneStyle: {
    // backgroundColor: Co,
    width: '100%',
    padding: 10,
    height: 45,
    borderWidth: 1,
    borderColor: Constants.Colors.primaryBlue,
    borderRadius: 8,
    marginBottom: 10,
  },
  hrStyle: {
    width: '100%',
    height: 1,
    backgroundColor: 'white',
    marginVertical: 15,
  },
  topContSno: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: Constants.Colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topWrapper: {
    width: '100%',
    height: 100,
    marginBottom: 5,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
  },
  inputStyle: {
    // height: 40,
    // backgroundColor: 'blue',
    textAlign: 'center',

    height: 40,
  },
  availabilityStyle: {
    width: 30,
    height: 30,
    // marginRight: 20,

    borderRadius: 15,
  },
  inputInnerWrapper: {
    width: 70,
    height: 35,
    borderWidth: 1,
    borderColor: '#afafaf',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputlableStyle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 15,
    color: Constants.Colors.primaryBlue,
    // width: 70,
    // backgroundColor: 'red',
  },
  inputWrapper: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterWrapper: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getQuoteWrapperText: {
    color: 'white',
    fontSize: 11,
  },
  getQuoteWrapper: {
    width: 70,
    backgroundColor: Constants.Colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loginBtn: {
    marginVertical: 10,
    width: '60%',
    borderRadius: 30,
    height: 50,
    backgroundColor: Constants.Colors.primaryGreen,
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
    // width: 50,
    fontSize:20,
  },
  searchInputWrapper: {
    flex: 1,
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
  patienfoundStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Constants.Colors.primaryBlue,
  },
  Container: {
    flex: 1,
    backgroundColor: Constants.Colors.backgrounGrey,
  },
  descriptionContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  tokenStyle: {
    fontSize: 18,
    color: Constants.Colors.primaryBlue,
    fontWeight: 'bold',
  },
  textWrapper: {
    marginHorizontal: 15,
  },
  desContainer: {
    flex: 1,
    padding: 20,
    // backgroundColor: 'green',
  },
  profileContainer: {
    // height: 140,
    width: '100%',
    padding: 20,
    paddingBottom: 0,
    // backgroundColor: 'red',
    // flexDirection: 'row'
  },
  avatarImgContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarDescContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  avatarStyle: {
    resizeMode: 'contain',
    width: 100,
  },
  profileImgWrapper: {
    borderRadius: 50,
    width: 100,
  },
  patientProfileIcon: {
    fontSize: 15,
    color: Constants.Colors.primaryGreen,
    marginHorizontal: 5,
  },
  nameHeadingStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Constants.Colors.primaryBlue,
  },
  ageStyle: {
    // fontStyle: 15,
    fontSize: 14,
    marginVertical: 5,
  },
  consultationHeadingStyle: {
    color: Constants.Colors.primaryBlue,
  },
  consultationTextStyle: {
    color: Constants.Colors.grey,
  },
  dateStyleTxt: {
    position: 'absolute',
    top: 10,
    right: 20,
    color: Constants.Colors.primaryGreen,
  },
  sectionCotainer: {
    backgroundColor: 'white',
    height: 65,
    width: '100%',
    marginVertical: 4,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  rightWrapper: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'red',
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
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  symtomsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: Constants.Colors.primaryBlue,
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
  centerTextWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caretdownStyle: {
    color: Constants.Colors.lightGrey,
  },
  avatarStyle: {
    width: 50,
    resizeMode: 'contain',
  },
  tabIconStyle: {
    width: 40,
    resizeMode: 'contain',
  },
  downArrowStyle: {
    width: 15,
    resizeMode: 'contain',
  },
  descTextSTyle: {
    fontSize: 12,
    color: Constants.Colors.grey,
    marginHorizontal: 5,
  },
  tabTextStyle: {
    fontSize: 16,
    color: Constants.Colors.grey,
    fontWeight: '700',
  },
  dateTextStyle: {
    fontSize: 13,
    color: Constants.Colors.primaryGreen,
    fontWeight: '500',
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  suggestionContainer: {
    marginTop: -10,
  },
  suggestionWrapper: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestTitleWrapper: {
    flex: 1,
    paddingLeft: 15,
  },
  suggestIconWrapper: {
    width: 50,
    alignItems: 'center',
  },
  suggestionAdd: {
    color: Constants.Colors.primaryBlue,
    width: 30,
  },
  suggestionTitle: {
    color: Constants.Colors.primaryBlue,
  },
  medicineAddedWrapper: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    // flexDirection: 'row',
  },
  medicineTxtStyle: {
    color: Constants.Colors.primaryBlue,
    fontSize: 15,
  },
  medicineDescStyle: {
    color: 'grey',
    fontSize: 14,
    marginBottom: 10,
    color: Constants.Colors.primaryBlue,
  },
  medicineActionWrapper: {
    width: 50,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusStyle: {
    color: Constants.Colors.primaryBlue,
    fontSize: 26,
  },
  textRequest: {
    fontSize: 10,
  },
  deliveryWrapper: {
    width: '100%',
    // height: 140,
    borderRadius: 15,
    padding: 20,
    marginTop: 5,
    marginBottom: 12,
    backgroundColor: Constants.Colors.primaryBlue,
  },
  deliveryText: {
    color: 'white',
    marginVertical: 3,
    width: '80%',
  },

  invoiceTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
    marginRight: 20,
  },
  invoiceTotalStyle: {
    color: Constants.Colors.primaryBlue,
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: 5,

    borderRadius: 5,
  },
});
export default loginStyles;
