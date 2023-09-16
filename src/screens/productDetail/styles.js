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
  pricingStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Constants.primaryBlue,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
    // borderWidth: 1,
  },
  actionStyle: {
    width: 30,
    height: 30,
    backgroundColor: Constants.Colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTxtStyle: {
    color: 'white',
    fontSize: 15,
  },
  qtyTxtSTyle: {
    width: 50,
    textAlign: 'center',
  },
  btnWrapper: {
    width: 70,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  bannerStyle: {
    resizeMode: 'contain',
    width: Constants.ScreenWidth,
    height: 300,
  },
  product_image: {
    width: '100%',
    resizeMode: 'contain',
    height: 135,
    marginBottom: 5,
  },
  headingStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Constants.Colors.primaryBlue,
  },
  medicineNameStyle: {
    color: Constants.Colors.primaryBlue,
    fontSize: 11,
  },
  priceHeading: {
    fontSize: 18,
    color: Constants.Colors.primaryBlue,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  cartTxt: {
    color: 'white',
  },
  addCartBtn: {
    backgroundColor: Constants.Colors.primaryBlue,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  medicineWrapper: {
    borderColor: Constants.Colors.primaryBlue,
    // borderWidth: 1,/
    padding: 10,

    borderRadius: 10,
    margin: 5,
    // height: 200,
    width: Constants.ScreenWidth / 2 - 20,
  },
  flexDirectStyl: {
    flexDirection: 'row',
  },
  breakLIne: {
    width: '100%',
    height: 1,
    marginVertical: 5,
    backgroundColor: 'grey',
  },
  arrowIcon: {
    fontSize: 35,
    color: Constants.Colors.primaryBlue,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Constants.Colors.primaryGreen,
  },

  requestContainer: {
    // height: 135,
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 10,
    borderRadius: 15,
  },
  filterWrapper: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatingCircleStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  getQuoteWrapperText: {
    color: 'white',
    fontSize: 11,
  },
  getQuoteWrapper: {
    width: 130,
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
  },
  fitlerIcon: {
    color: 'white',
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
    backgroundColor: 'white',
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
    padding: 10,
  },
  profileContainer: {
    width: '100%',
    padding: 20,
    paddingBottom: 0,
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
    fontSize: 18,
    color: 'white',
    marginLeft: 15,
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
  },
  medicineTxtStyle: {
    color: Constants.Colors.primaryBlue,
    fontSize: 15,
    flex: 1,
  },
  medicineDescStyle: {
    color: 'grey',
    fontSize: 14,
  },
  medicineActionWrapper: {
    width: 50,
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
  listingWrapper: {
    flexDirection: 'row',
    backgroundColor: Constants.Colors.primaryBlue,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  iconStyle: {
    fontSize: 20,
    color: 'white',
  },
});
export default loginStyles;
