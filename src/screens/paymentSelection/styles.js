import {Constants, Colors} from '../../utils';
import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  Container: {
    flex: 1,
    // backgroundColor: 'red',

    backgroundColor: Constants.Colors.backgrounGrey,
  },
  iconWrapper: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerStyle: {
    resizeMode: 'cover',
    width: Constants.ScreenWidth - 30,
    height: 180,
    marginTop: 2,
    borderRadius: 15,
  },
  imageStyle: {
    width: 120,
    resizeMode: 'contain',
    // tintColor: 'gray',
  },
  txtStyle: {
    color: Constants.Colors.grey,
    fontSize: 16,
    fontWeight: 'bold',
  },
  Wrapper: {
    borderColor: Constants.Colors.primaryBlue,
    width: Constants.ScreenWidth / 2.4,
    height: Constants.ScreenWidth / 2.4,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headingStyle: {
    padding: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: Constants.Colors.primaryBlue,
  },

  categoryContainer: {
    height: 250,
    // backgroundColor: 'red',
    padding: 20,
  },
  desContainer: {
    // paddingHorizontal: 30,
    // paddingVertical: 20,
    flex: 1,
    // backgroundColor: 'yellow',
    alignItems: 'center',
  },
});
export default loginStyles;
