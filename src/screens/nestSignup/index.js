import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  ProgressViewIOS,
} from 'react-native';
import styles from './styles';
import mainStyle from '../../components/generalStyle/style';
import {Constants, Utils} from '../../utils';
import * as Animatable from 'react-native-animatable';
// import {ProgressBar, Colors} from 'react-native-paper';
import {NavigationActions, StackActions} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';

import DeviceInfo from 'react-native-device-info';

// import Services from '../api/services';

// import firebase from 'react-native-firebase';
// import type {
//   Notification,
//   NotificationOpen,
//   RemoteMessage,
// } from 'react-native-firebase';

class splash extends React.Component {
  componentDidMount = async () => {
    // var userData = await Utils.getUserData();
    // console.log('userData__');
    // SplashScreen.hide();
    // this.sendToken();
    // setTimeout(() => {
    //   var routeName = 'Login';
    //   const resetAction = StackActions.reset({
    //     index: 0,
    //     actions: [StackActions.reset({routeName: routeName})],
    //   });
    //   this.props.navigation.dispatch(resetAction);
    // }, 3000);
  };

  sendToken() {
    // var Info = utils.getUserInfo();
    // var fcmToken = utils.getDeviceToken();
    var udid = DeviceInfo.getUniqueId();

    // console.log('udid ++', udid);

    // var payload = new FormData();
    // payload.append('token', fcmToken);
    // payload.append('udid', udid);
    // payload.append('type', 'ios');

    // var header = {
    //   'Content-Type': 'multipart/form-data',
    //   'access-token': Info.access_token,
    // };

    // // console.log('payload', payload);

    // Services.post('loginDeviceToken', header, payload, true)
    //   .then(responseJson => {
    //     console.log('loginDeviceToken ', responseJson);
    //   })
    //   .catch(error => {
    //     this.setState({loader: false});
    //   });
  }

  render() {
    return (
      <View>
        <ImageBackground
          style={styles.imageBgStyle}
          source={Constants.nestSignup}>
          <View style={styles.SplashLogoContainer}>
            <View style={styles.descContainer}>
              {/* <Animatable.View
              style={styles.centerContainer}
              animation="slideInDown"
              iterationCount={1}
              direction="alternate">
              <Image
                style={{width: 300, height: 200, resizeMode: 'contain'}}
                source={Constants.logo}
              />
            </Animatable.View> */}
              <View style={styles.footerWrapper} />
            </View>
          </View>
        </ImageBackground>
        <View style={{height: 70, backgroundColor: 'white', marginBottom: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Already have a account ? </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              <Text style={{color: '#FE9063'}}> Signup In </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.main.userData,
  };
};
export default connect(mapStateToProps)(splash);
