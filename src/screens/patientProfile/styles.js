import {Constants, Colors} from '../../utils';
import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Constants.Colors.backgrounGrey,
  },
  descriptionContainer: {
    flex: 1,
    padding: 20,
  },
  desContainer: {
    flex: 1,
  },
  profileContainer: {
    height: 140,
    width: '100%',
    flexDirection: 'row',
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
    width: 100,
    height: 100,
    borderRadius: 50,
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
    width: 75,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caretdownStyle: {
    color: Constants.Colors.lightGrey,
  },
  tabIconStyle: {
    width: 24,
    resizeMode: 'contain',
  },
  downArrowStyle: {
    width: 15,
    resizeMode: 'contain',
  },
  descTextSTyle: {
    fontSize: 12,
    color: Constants.Colors.grey,
  },
  tabTextStyle: {
    fontSize: 16,
    color: Constants.Colors.grey,
    fontWeight: '700',
  },
});
export default loginStyles;
