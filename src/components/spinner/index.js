import React from 'react';
import {View, ActivityIndicator, Dimensions, Text} from 'react-native';
// import { Colors } from '../../utils';

// import LottieView from 'lottie-react-native';
import Constants from '../../utils/Constants';

const {width, height} = Dimensions.get('window');
const Spinner = ({txt = ''}) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator color={Constants.Colors.primaryBlue} size="large" />
      {/* <View style={{
        width: 100, height: 100, borderWidth: 3,
        borderColor: Constants.Colors.primaryYellow, borderRadius: 50,
        overflow:'hidden'
      }}>
        <LottieView
          source={require('../../assets/animation.json')}
          colorFilters={[{
            keypath: "button",
            color: "#F00000"
          }, {
            keypath: "Sending Loader",
            color: "#F00000"
          }]}
          autoPlay
          loop
        />
      </View> */}
      {txt != '' ? <Text style={{marginTop: 10}}>{txt}</Text> : null}
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 9999,
    // backgroundColor:'red',
    backgroundColor: 'rgba(255,255,255,0.8)',
    left: 0,
    top: 0,
  },
};

export {Spinner};
