import {Constants, Colors} from '../../utils';
import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  menuContainer: {
    // alignItems: 'center',
    // marginTop: 10,
    paddingLeft: 12,
    paddingBottom: 20,
    // marginBottom: 120,
    flex: 1,
    backgroundColor: Constants.Colors.primaryBlue,
    paddingVertical: 20,
  },
  servicesHeading: {
    fontSize: 22,
    color: 'white',
    paddingLeft: 15,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  fwdIcon: {
    color: 'white',
    fontSize: 20,
    paddingRight: 5,
  },
  Container: {
    flex: 1,
    backgroundColor: Constants.Colors.white,
  },
  descContainer: {
    height: 95,
    paddingHorizontal: 20,
  },
  welcomeDesc: {
    fontSize: 17,
    color: Constants.Colors.grey,
    fontFamily: Constants.PoppinsLight,
  },
  headingBlackText: {
    fontSize: 25,
    color: 'black',
    marginRight: 8,
    fontFamily: Constants.PoppinsSemiBold,
  },
  headingYellowText: {
    fontSize: 25,
    color: Constants.Colors.primaryYellow,
    fontFamily: Constants.PoppinsSemiBold,
  },
  headingWrapper: {
    flexDirection: 'row',
    // marginVertical: 20
    marginTop: 20,
  },
  boxText: {
    marginTop: 10,
    fontSize: Constants.FontSize.medium,
  },
  boxFigures: {
    fontSize: Constants.FontSize.large,
    fontWeight: 'bold',
  },
  iconWrapper: {
    width: 35,
    height: 35,
    marginBottom: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxIcon: {
    width: 22,
    height: 22,
  },
  boxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingHorizontal: 8,
  },
  boxWrapper: {
    // padding: 15,
    paddingTop: 15,
    // paddingLeft: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    width: 170,
    height: 170,
    backgroundColor: 'blue',
    marginHorizontal: 8,
    borderRadius: 15,
  },
  homeBanner: {
    width: '100%',
    resizeMode: 'cover',
    height: 210,
  },
  bannerContainer: {
    // height: 250,
  },
});
export default loginStyles;
