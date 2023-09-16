import React, {PureComponent} from 'react';
import {
  View,
  Platform,
  Alert,
  Text,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Animated,
  Linking,
} from 'react-native';
import {} from 'geolib';
// import TrackPlayer from 'react-native-track-player';
import styles from './styles';
import {Icon} from 'native-base';
import Geolocation from '@react-native-community/geolocation';
// import ConnectyCube from 'react-native-connectycube';
// import VideoScreen from '../../components/VideoScreen';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import {Header, HomeMenus} from '../../components';
import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import {CallService, AuthService} from '../../services';
import Services from '../../apis/services';
// import {users} from '../../config';
import {fcmService} from '../../../src/FCMService';
import {localNotificationService} from '../../../src/LocalNotificationService';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Touchable} from 'react-native';

const start = async () => {
  // Set up the player
  await TrackPlayer.setupPlayer();

  await TrackPlayer.add({
    id: 'trackId',
    url: Constants.call_alert,
    title: 'Track Title',
    artist: 'Track Artist',
  });

  // Start playing it
  await TrackPlayer.play();
};

const stop = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.stop();
};

class Home extends PureComponent {
  constructor(props) {
    super(props);

    // setIsLogging = isLogging => this.setState({isLogging});

    this.state = {
      loading: false,
      userData: this.props.userData,
      userLocation: this.props.userLocation,
      loadsData: [],
      opponentId: '',
      isConnectyCubeConnected: false,
      boxData: [
        {title: 'Shipment'},
        {title: 'Carrier'},
        {title: 'Broker'},
        {title: 'Trucker'},
        {title: 'Terminal'},
        {title: 'Customer'},
      ],
      menuData: [],
      pharmacyData: [
        {
          screen: 'QuotationPharmacy',
          title: 'Pharmacy Orders',
          color: '#f6d367',
          icon: Constants.pharmacy_service,
          batch: 0,
        },
        {
          screen: 'TransctionHistory',
          title: 'Sehat Wallet',
          color: '#f6d367',
          icon: Constants.wallet_icon,
          batch: 0,
        },
        // {
        //   screen: 'doctors',
        //   title: 'Order History',
        //   color: '#f6d367',
        //   icon: Constants.video_consultation_icon,
        //   batch: 0,
        // },
      ],
      futureServices: [
        {
          screen: 'Labs',
          title: 'Lab Services',
          color: '#83deab',
          icon: Constants.lab_services,
          batch: 1,
        },
        {
          screen: '',
          title: 'Blood Banks',
          color: '#83deab',
          icon: Constants.blood_bank,
          batch: 1,
        },
        {
          screen: '',
          title: 'Homecare Services',
          color: '#83deab',
          icon: Constants.home_care,
          batch: 1,
        },

        {
          screen: '',
          title: 'Ambulance Services',
          color: '#83deab',
          icon: Constants.ambulance,
          batch: 1,
        },
      ],
      patientData: [
        {
          screen: 'doctors',
          title: 'Video Consultation',
          color: '#f6d367',
          icon: Constants.video_consultation_icon,
          batch: 0,
        },
        // {
        //   screen: 'AssistantAppointments',
        //   title: 'Waiting List ',
        //   color: '#83deab',
        //   icon: Constants.waiting_icon,
        //   batch: 1,
        // },
        // {
        //   screen: 'ConsultationHistory',
        //   title: 'Consultation History',
        //   color: '#83deab',
        //   icon: Constants.history_icon,
        //   batch: 1,
        // },
        {
          screen: 'PharmacyService',
          title: 'Phamarcy Services',
          color: '#83deab',
          icon: Constants.pharmacy_service,
          batch: 1,
        },
      ],
      asistantData: [
        {
          screen: 'doctors',
          title: 'Video Consultation',
          color: '#f6d367',
          icon: Constants.video_consultation_icon,
          batch: 0,
        },
        {
          screen: 'AssistantAppointments',
          title: 'Waiting List ',
          color: '#83deab',
          icon: Constants.waiting_icon,
          batch: 1,
        },
        {
          screen: 'ConsultationHistory',
          title: 'Consultation History',
          color: '#83deab',
          icon: Constants.history_icon,
          batch: 1,
        },
        {
          screen: 'PharmacyService',
          title: 'Phamarcy',
          color: '#83deab',
          icon: Constants.pharmacy_service,
          batch: 1,
        },
      ],
      doctorData: [
        {
          screen: 'doctorAppointments',
          title: 'Waiting List',
          color: '#f6d367',
          icon: Constants.pending_icon,
          batch: 0,
        },
        {
          screen: 'ConsultationHistory',
          title: 'Consultation History',
          color: '#83deab',
          icon: Constants.history_icon,
          batch: 1,
        },
        {
          screen: '',
          title: 'Appointments',
          color: '#83deab',
          icon: Constants.pending_icon,
          batch: 1,
        },
      ],
    };
    StatusBar.setBarStyle('light-content');

    console.log('Home', this.props);
  }

  _update_token() {
    const {userData} = this.state;

    var payload = new FormData();
    payload.append('signup_id', userData.signup_id);
    payload.append('signup_app_version', Constants.versionName);
    payload.append('signup_fcm_platform', Platform.OS);
    payload.append('signup_fcm_token', Utils.getfcmToken());
    console.log('payload fcmtoken ', payload);
    Services.post('save_token', {}, payload, true)
      .then(responseJson => {
        console.log('save_token', responseJson);

        if (responseJson.status == 1) {
        }
      })
      .catch(error => {
        console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }

  onSetMyLocation = () => {
    if (Platform.OS === 'ios') {
      this.requestLocationPermissionIOS();
    } else if (Platform.OS === 'android') {
      this.requestLocationPermissionAndroid();
    }
  };

  requestLocationPermissionIOS = () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      info => {
        let latitude = info.coords.latitude;
        let longitude = info.coords.longitude;

        this.props.dispatch({
          type: 'USER_LOCATION',
          payload: info.coords,
        });
      },
      error => {
        console.log(error);
      },
    );
  };
  requestLocationPermissionAndroid = () => {
    Geolocation.getCurrentPosition(
      info => {
        let latitude = info.coords.latitude;
        let longitude = info.coords.longitude;

        this.props.dispatch({
          type: 'USER_LOCATION',
          payload: info.coords,
        });
        console.log('Home_location', info.coords);
      },
      () => {
        alert('Location permissions denied');
      },
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
    );
  };

  checkApplicationPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  };
  componentDidMount() {
    // this._setUpListeners(); // 1

    this.checkApplicationPermission();

    const {
      userData,
      asistantData,
      doctorData,
      pharmacyData,
      patientData,
      isConnectyCubeConnected,
    } = this.state;

    console.log('_UserData_', userData);

    // this.props.navigation.navigate('AuthScreen', {userData: userData});
    function toRadians(val) {
      var PI = 3.1415926535;
      return (val / 180.0) * PI;
    }

    setTimeout(() => {
      console.log('Updating_token');
      this._update_token();
      // this.onSetMyLocation();
    }, 2000);

    if (userData.signup_type == 3) this.setState({menuData: asistantData});
    else if (userData.signup_type == 2) this.setState({menuData: patientData});
    else if (userData.signup_type == 5) this.setState({menuData: pharmacyData});
    else this.setState({menuData: doctorData});

    var currentUser = {};
    currentUser = {
      id: userData.signup_connect_id,
      name: userData.signup_firstname,
      login: userData.signup_connect_username,
      password: 'admin123',
      color: '#077988',
    };
    // this.login(currentUser);

    this.setFcm();
  }

  login = currentUser => {
    const _onSuccessLogin = () => {
      const {userData, opponentId, from_data = ''} = this.state;

      console.log('connect user login successfully.');

      // console.log('DeviceName_', DeviceInfo.getDeviceName());
      // console.log('opponentsIds authscreen before', opponentId);
      // const opponentsIds = [];
      // opponentsIds.push(opponentId);

      // console.log('opponentsIds authscreen after', opponentsIds);

      // console.log('video Scrren Props from_data', from_data);
      // this.props.navigation.push('VideoScreen', {
      //   opponentsIds,
      //   userData,
      //   from_data,
      // });
    };

    const _onFailLogin = (error = {}) => {
      console.log('errei_' + error);
      alert(`Error.\n\n${JSON.stringify(error)}`);
    };

    // this.setIsLogging(true);

    AuthService.login(currentUser)
      .then(_onSuccessLogin)
      .catch(_onFailLogin)
      .then(e => {
        console.log('auth_error', e);
        // setIsLogging = isLogging => this.setState({isLogging});
      });
  };

  componentWillUnmount() {
    const {userData} = this.state;
    fcmService.unRegister();
    localNotificationService.unregister();
  }

  routeScreen(opponentId = '4473599', from_data = {}) {
    console.log('from_data___', from_data);
    // console.log('from_data type of ', typeof from_data);
    // return false;

    const {userData} = this.state;
    // Utils.setOpponentUsers(from_data);
    Utils.setOpponentUsers({
      id: from_data.signup_connect_id,
      name: 'Jr Assistant',
      login: 'user_' + from_data.signup_id,
      password: 'admin123',
      color: '#34ad86',
    });
    // console.log('from_data', from_data);

    this.props.navigation.navigate('AuthScreen', {
      userData,
      from_data,
      opponentId: parseInt(opponentId),
    });
  }

  _onItemPress = (item, index) => {
    this.props.navigation.navigate(item.screen);
  };

  onNotification = notify => {
    console.log('[App]_onNotification_0012: ', notify);
    const {userData} = this.state;

    console.log('__notify__', notify);

    //
    if (notify.title.substr(0, 11) == 'Calling....') {
      var body = JSON.parse(notify.body);
      console.log('Body', body);
      var incomingTxt =
        Utils.capitalizeFirstLetter(body.data.signup_firstname) +
        ' is ready for call.';

      if (userData.signup_type != 1) {
        incomingTxt =
          'Dr. ' +
          Utils.capitalizeFirstLetter(body.data.signup_firstname) +
          ' is calling ' +
          Utils.capitalizeFirstLetter(body.data[0].signup_firstname) +
          '. Token # ' +
          body.data[0].consultation_token;

        // start();
      }

      if (parseInt(userData.signup_type) == 1) {
        this.routeScreen(body.data.signup_connect_id, body.data);
      } else {
        // 2nd handshake for others .
        Alert.alert('Calling...', incomingTxt, [
          {
            text: 'Cancel',
            onPress: () => {
              this._onPressCancel(body.data.call_id);
              // stop();
            },
            style: 'cancel',
          },
          {
            text: ' Attend Call',
            onPress: () => {
              // stop();
              if (userData.signup_type != 1) {
                this._onPressPush(body.from, body.data[0].consultation_id);
                this.routeScreen(body.data.signup_connect_id, body.data);
              }
            },
          },
        ]);
      }
    } else {
      const options = {
        soundName: 'default',
        playSound: true, //,
        largeIcon: notify.android.imageUrl, // add icon large for Android (Link: app/src/main/mipmap)
        smallIcon: notify.android.imageUrl, // add icon small for Android (Link: app/src/main/mipmap)
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }
  };

  onOpenNotification = notify => {
    // console.log('testOpen_notify', notify);
    // const {userData} = this.state;
    // var body = JSON.parse(notify.data);
    // console.log('Body_testOpen_notify', notify);
    // console.log('Body_testOpen_body', body);
    // if (notify.title.substr(0, 11) == 'Calling....') {
    //   var incomingTxt =
    //     Utils.capitalizeFirstLetter(body.data.signup_firstname) +
    //     ' is ready for call.';
    //   if (userData.signup_type != 1) {
    //     incomingTxt =
    //       'Dr. ' +
    //       Utils.capitalizeFirstLetter(body.data.signup_firstname) +
    //       ' is calling ' +
    //       Utils.capitalizeFirstLetter(body.data[0].signup_firstname) +
    //       '. Token # ' +
    //       body.data[0].consultation_token;
    //     start();
    //   }
    //   if (parseInt(userData.signup_type) == 1) {
    //     this.routeScreen(body.data.signup_connect_id, body.data);
    //   } else {
    //     // 2nd handshake for others .
    //     Alert.alert('Calling...', incomingTxt, [
    //       {
    //         text: 'Cancel',
    //         onPress: () => {
    //           this._onPressCancel(body.data.call_id);
    //           stop();
    //         },
    //         style: 'cancel',
    //       },
    //       {
    //         text: ' Attend Call',
    //         onPress: () => {
    //           stop();
    //           if (userData.signup_type != 1) {
    //             this._onPressPush(body.from, body.data[0].consultation_id);
    //             this.routeScreen(body.data.signup_connect_id, body.data);
    //           }
    //         },
    //       },
    //     ]);
    //   }
    // }
  };
  setFcm() {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, this.onNotification, onOpenNotification);
    localNotificationService.configure(this.onOpenNotification);

    function onRegister(token) {
      Utils.setfcmToken(token);
      // _update_token(token);
      // console.log('[App] onRegister toke : ', Utils.getfcmToken());
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification open 00: ', notify);
      // alert('Open Notification: ' + notify.body);
      var body = JSON.parse(notify.data);
      console.log('boyd', body);
      // testOpen();
      // if (notify.title.substr(0, 11) == 'Calling....') {
      //   var body = JSON.parse(notify.body);
      //   console.log('Body', body);
      //   var incomingTxt =
      //     Utils.capitalizeFirstLetter(body.data.signup_firstname) +
      //     ' is ready for call.';

      //   if (userData.signup_type != 1) {
      //     incomingTxt =
      //       'Dr. ' +
      //       Utils.capitalizeFirstLetter(body.data.signup_firstname) +
      //       ' is calling ' +
      //       Utils.capitalizeFirstLetter(body.data[0].signup_firstname) +
      //       '. Token # ' +
      //       body.data[0].consultation_token;

      //     start();
      //   }

      //   if (parseInt(userData.signup_type) == 1) {
      //     this.routeScreen(body.data.signup_connect_id, body.data);
      //   } else {
      //     // 2nd handshake for others .
      //     Alert.alert('Calling...', incomingTxt, [
      //       {
      //         text: 'Cancel',
      //         onPress: () => {
      //           this._onPressCancel(body.data.call_id);
      //           stop();
      //         },
      //         style: 'cancel',
      //       },
      //       {
      //         text: ' Attend Call',
      //         onPress: () => {
      //           stop();
      //           if (userData.signup_type != 1) {
      //             this._onPressPush(body.from, body.data[0].consultation_id);
      //             this.routeScreen(body.data.signup_connect_id, body.data);
      //           }
      //         },
      //       },
      //     ]);
      //   }
      // }
    }
  }
  _renderMenus = ({item, index}) => {
    return (
      <HomeMenus
        item={item}
        index={index}
        onPress={() => this._onItemPress(item, index)}
      />
    );
  };

  scrollAnim = new Animated.Value(0);

  onMenuPressBtn() {
    this.props.navigation.openDrawer();
  }

  _onPressCancel(call_id) {
    const {userData} = this.state;

    var payload = new FormData();
    payload.append('call_id', call_id);
    payload.append('call_ended_by', userData.signup_id);
    payload.append('call_status', 2);
    Services.post('call_cancel', {}, payload, true)
      .then(responseJson => {})
      .catch(error => {});
  }
  _onPressPush(id, consultation_id) {
    const {userData} = this.state;

    var payload = new FormData();
    payload.append('to', userId);
    payload.append('from', userData.signup_id);
    payload.append('consultation_id', consult_data.consultation_id);
    // payload.append('room_id', '7gf0-xwmk-n0pn');
    payload.append('initiate', 1);
    console.log('call_notify_payload', payload);
    Services.post('call_notify', {}, payload, true)
      .then(responseJson => {
        

        var response = responseJson.arr;
        console.log('call_notify', responseJson.arr);
        this.props.navigation.navigate("Waiting",{response,userData})


        // if (response.failure == 1) {
        //   this.setState({videoLoading: false});
        //   Utils.showToastMessage('Assistant is not online.');
        // }
        // else
        // {
         
        // }
      })
      .catch(error => {
        console.log('_error', error);
        this.setState({
          loading: false,
        });
      });
  }

  checkUserConsultatnt = async () => {
    console.log('saveConsultUserData___', Utils.getConsultUserData());
  };

  render() {
    // const {scrollAnim} = this.state;
    var minHeight = Platform.OS == 'ios' ? 90 : 60;
    var maxHeight = Platform.OS == 'ios' ? 180 : 160;
    const navbarHeight = this.scrollAnim.interpolate({
      inputRange: [0, 400],
      outputRange: [maxHeight, minHeight],
      extrapolate: 'clamp',
      // extrapolate: 'spring',
    });

    const {
      loading,
      userData,
      loadsData = [],
      isConnectyCubeConnected,
    } = this.state;

    return (
      <View style={styles.Container}>
        {/* <VideoScreen /> */}
        <Header
          title="HOME"
          showBack={false}
          showMenu={true}
          onLeftPress={() => {
            // console.log(' On left Press ');
            this.onMenuPressBtn();
          }}
        />

        <ScrollView
          style={{flex: 1, backgroundColor: Constants.Colors.primaryBlue}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.bannerContainer}>
            <Image source={Constants.homebanner} style={styles.homeBanner} />
          </View>

          <View style={styles.menuContainer}>
            <FlatList
              data={this.state.menuData}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderMenus}
              scrollEnabled={true}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />

            {/* <Text style={styles.servicesHeading}>Future Services...</Text> */}
            {userData.signup_type != 5 ? (
              <FlatList
                data={this.state.futureServices}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderMenus}
                scrollEnabled={true}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
            ) : null}
          </View>
          {/* 
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              marginBottom: 20,
              width: '100%',
              // paddingTop: 20,
              marginTop: 50,
              alignItems: 'center',
              backgroundColor: 'red',
            }}> */}
          <View
            style={{
              alignItems: 'center',
              paddingBottom: 20,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Customer Support
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 10,
                }}
                onPress={() => {
                  Linking.openURL(`tel:03243576131`);
                }}>
                <Icon type="Entypo" name="phone" style={styles.fwdIcon} />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 17,
                  }}>
                  0324 3576131
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 10,
                }}
                onPress={() => {
                  Linking.openURL(
                    'whatsapp://send?text=Hi, I need your help&phone=923243576131',
                  );
                }}>
                <Icon
                  type="FontAwesome"
                  name="whatsapp"
                  style={styles.fwdIcon}
                />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 17,
                  }}>
                  0324 3576131
                </Text>
              </TouchableOpacity>
            </View>
            {/*  */}
          </View>
          {/* </View> */}
        </ScrollView>

        {Utils.showSpinner(loading)}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.main.userData,
  };
};
export default connect(mapStateToProps)(Home);