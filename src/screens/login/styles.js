import {Constants, Colors} from '../../utils';
import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Constants.Colors.primaryBlue,
    // paddingBottom
  },
  secondaryWrapper: {
    backgroundColor: Constants.Colors.primaryBlue,
    paddingVertical: 60,
    alignItems: 'center',
  },
  primaryWrapper: {
    // flex: 1,
    width: Constants.ScreenWidth,
    // padding: 20,
    backgroundColor: 'red',
    // paddingBottom: 20,
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  logoWrapper: {
    width: '100%',
    alignItems: 'center',
    height: 120,
    marginTop: Constants.Platform == 'ios' ? 70 : 50,
    justifyContent: 'center',
    marginBottom: 40,
    // backgroundColor: 'white'
  },
  forgotPassText: {
    fontSize: Constants.FontSize.tiny,
    color: Constants.Colors.grey,
    marginLeft: 20,
    marginTop: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBgBtn: {
    position: 'absolute',
    right: -28,
    width: 140,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: '60%',
  },
});
export default loginStyles;
