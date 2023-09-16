import {Constants, Colors} from '../../utils';
import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Constants.Colors.backgrounGrey,
  },
  suggestionWrapper: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  medicineFieldText: {
    borderWidth: 1,
    borderColor: Constants.Colors.primaryBlue,
    height: 45,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    color: Constants.Colors.primaryBlue,
  },
  medicineStyle: {
    flex: 1,
  },
  semiContainer: {
    padding: 20,
    flex: 1,
    // backgroundColor: 'grey',
  },
  medicineTitle: {
    fontSize: 15,
    fontWeight: '500',

    color: Constants.Colors.primaryBlue,
  },
  loginBtn: {
    marginVertical: 10,
    width: '60%',
    borderRadius: 30,
    height: 50,
    backgroundColor: Constants.Colors.primaryGreen,
  },
  headingWrapper: {
    width: '100%',
    backgroundColor: Constants.Colors.primaryBlue,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 45,
    marginVertical: 5,
  },
  headingStyle: {
    color: 'white',
    fontWeight: '800',
    fontSize: 14,
  },
  dosageContainer: {
    // height: 350,
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
  },
});
export default loginStyles;
