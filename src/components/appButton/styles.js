import { ScaledSheet } from 'react-native-size-matters';

// import { colors } from '../../utils';

export const styles = ScaledSheet.create({
  buttonStyle: {
    width: '100%',
    height: '45@ms',
    backgroundColor: "#252eb2",
    justifyContent: 'center',
    alignSelf: 'center', 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5@ms',
    paddingLeft: '20@ms',
    paddingRight: '20@ms',
  },
  detailbuttonStyle: {
    width: '80%',
    height: '37@vs',
    backgroundColor: "purple",
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: '15@ms', 
    color: "white", 
    fontWeight: '500',
    // fontFamily: 'Roboto-Bold',
  },
  icon: {
    height: '20@ms',
    width: '20@ms',
    
  },
  leftIcon: {
    paddingRight: '10@ms',
    fontSize: '20@ms0.3',
    color: "white"
  }
});
