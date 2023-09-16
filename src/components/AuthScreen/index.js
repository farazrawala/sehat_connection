import React, {PureComponent} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  Image,
  Platform,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {AuthService} from '../../services';
import {users} from '../../config';
import {Constants, Utils} from '../../utils';
import DeviceInfo from 'react-native-device-info';

export default class AuthScreen extends PureComponent {
  state = {isLogging: false};

  setIsLogging = isLogging => this.setState({isLogging});

  login = currentUser => {
    const _onSuccessLogin = () => {
      const {navigation} = this.props;

      // const opponentsIds = users
      //   .filter(opponent => opponent.id !== currentUser.id)
      //   .map(opponent => opponent.id);
      const {
        userData,
        opponentId,
        from_data,
      } = this.props.route.params;

      console.log('DeviceName_', DeviceInfo.getDeviceName());
      console.log('opponentsIds authscreen before', opponentId);

      const opponentsIds = [];
      opponentsIds.push(opponentId);

      console.log('opponentsIds authscreen after', opponentsIds);

      // console.log('video Scrren Props from_data', from_data);
      navigation.push('VideoScreen', {opponentsIds, userData, from_data});
    };

    const _onFailLogin = (error = {}) => {
      alert(`Error.\n\n${JSON.stringify(error)}`);
    };

    this.setIsLogging(true);

    AuthService.login(currentUser)
      .then(_onSuccessLogin)
      .catch(_onFailLogin)
      .then(() => this.setIsLogging(false));
  };

  componentDidMount() {
    // const {opponentId} = this.props;

    // const {userData, opponentId} = this.props.route.params;
    const {
      userData,
      opponentId,
      from_data,
    } = this.props.route.params;

    const opponentsIds = [];
    opponentsIds.push(opponentId);

    console.log('_authscreen opponentId ', opponentId);

    // this.props.navigation.push('VideoScreen', {
    //   opponentsIds,
    //   userData,
    //   from_data,
    // });
    // return false;

    // const userData = .userData;

    // signup_connect_id

    var currentUser = {};
    currentUser = {
      id: parseInt(userData.signup_connect_id),
      name: 'doctor',
      login: userData.signup_connect_username,
      password: 'admin123',
      color: '#077988',
    };
    this.login(currentUser);
  }

  render() {
    const {isLogging} = this.state;
    const logoSrc = require('../../assets/Logo.png');

    return (
      <View style={[styles.container, styles.f1]}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <SafeAreaView style={[styles.centeredChildren, styles.f1]}>
          <Image resizeMode="contain" source={logoSrc} style={styles.logoImg} />
          <View
            style={[
              styles.f1,
              styles.centeredChildren,
              {flexDirection: 'row'},
            ]}>
            <Text>
              {isLogging ? 'Initiating a call... ' : 'Sehat Connection'}
            </Text>
            {/* {isLogging && } */}
            <ActivityIndicator size="small" color="#1198d4" />
          </View>
        </SafeAreaView>
        {/* <SafeAreaView style={[styles.authBtns, styles.f1]}>
          {users.map(user => (
            <TouchableOpacity key={user.id} onPress={() => this.login(user)}>
              <View
                style={[styles.authBtn(user.color), styles.centeredChildren]}>
                <Text style={styles.authBtnText}>
                  {`Log in as ${user.name}`}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </SafeAreaView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  centeredChildren: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
  },
  logoImg: {
    width: '70%',
    height: '80%',
  },
  authBtns: {
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  authBtn: backgroundColor => ({
    backgroundColor,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 25,
    marginVertical: 5,
  }),
  authBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});
