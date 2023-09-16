import React, { PureComponent } from "react";
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
  TouchableOpacity,
  Linking,
} from "react-native";
// import {} from 'geolib';
// import TrackPlayer from 'react-native-track-player';
import styles from "./styles";
import { Icon } from "native-base";
import { Header, HomeMenus } from "../../components";
import { Constants, Utils } from "../../utils";
import { connect } from "react-redux";
import Services from "../../apis/services";
import { withNavigation } from 'react-navigation';
import Entypo from "react-native-vector-icons/Entypo";
import { useRoute } from '@react-navigation/native';

import FontAwesome from "react-native-vector-icons/FontAwesome";

import messaging from '@react-native-firebase/messaging';
import {fcmService} from '../../../src/FCMService';
import {localNotificationService} from '../../../src/LocalNotificationService';
import Geolocation from '@react-native-community/geolocation';

// import {users} from '../../config';
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { Touchable } from "react-native";
// import Sound from 'react-native-sound';
// Sound.setCategory('Playback');


// var ding = new Sound(Constants.call_alert, Sound.MAIN_BUNDLE, (error) => {
// if (error) {
//     console.log('failed to load the sound', error);
//     return;
//   }
//   // if loaded successfully
//   console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());

// });




class Home extends PureComponent {
  constructor(props) {
    super(props);

    // setIsLogging = isLogging => this.setState({isLogging});

    this.state = {
      loading: false,
      userData: this.props.userData,
      userLocation: this.props.userLocation,
      loadsData: [],
      opponentId: "",
      isConnectyCubeConnected: false,
      boxData: [
        { title: "Shipment" },
        { title: "Carrier" },
        { title: "Broker" },
        { title: "Trucker" },
        { title: "Terminal" },
        { title: "Customer" },
      ],
      menuData: [],
      pharmacyData: [
        {
          screen: "QuotationPharmacy",
          title: "Pharmacy Orders",
          color: "#f6d367",
          icon: Constants.pharmacy_service,
          batch: 0,
        },
        {
          screen: "TransctionHistory",
          title: "Sehat Wallet",
          color: "#f6d367",
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
          screen: "blood",
          title: "Lab Services",
          color: "#83deab",
          icon: Constants.lab_services,
          batch: 1,
        },
        {
          screen: "Labs",
          title: "Blood Banks",
          color: "#83deab",
          icon: Constants.blood_bank,
          batch: 1,
        },
        // {
        //   screen: '',
        //   title: 'Homecare Services',
        //   color: '#83deab',
        //   icon: Constants.home_care,
        //   batch: 1,
        // },
        // {
        //   screen: '',
        //   title: 'Ambulance Services',
        //   color: '#83deab',
        //   icon: Constants.ambulance,
        //   batch: 1,
        // },
      ],
      patientData: [
        {
          screen: "doctors",
          title: "Video Consultation",
          color: "#f6d367",
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
          screen: "PharmacyService",
          title: "Pharmacy Services",
          color: "#83deab",
          icon: Constants.pharmacy_service,
          batch: 1,
        },
      ],
      asistantData: [
        {
          screen: "doctors",
          title: "Video Consultation",
          color: "#f6d367",
          icon: Constants.video_consultation_icon,
          batch: 0,
        },
        {
          screen: "AssistantAppointments",
          title: "Waiting List ",
          color: "#83deab",
          icon: Constants.waiting_icon,
          batch: 1,
        },
        {
          screen: "ConsultationHistory",
          title: "Consultation History",
          color: "#83deab",
          icon: Constants.history_icon,
          batch: 1,
        },
        {
          screen: "PharmacyService",
          title: "Phamarcy",
          color: "#83deab",
          icon: Constants.pharmacy_service,
          batch: 1,
        },
      ],
      doctorData: [
        {
          screen: "doctorAppointments",
          title: "Waiting List",
          color: "#f6d367",
          icon: Constants.pending_icon,
          batch: 0,
        },
        {
          screen: "ConsultationHistory",
          title: "Consultation History",
          color: "#83deab",
          icon: Constants.history_icon,
          batch: 1,
        },
        {
          screen: "AssistantAppointments",
          title: "Appointments",
          color: "#83deab",
          icon: Constants.pending_icon,
          batch: 1,
        },
      ],
    };
    // StatusBar.setBarStyle("light-content");

    console.log("Home", this.props);
  }



  // componentDidMount(){

   
  // }

  _onItemPress = (item, index) => {

    console.log('onhomeiconpress',item);
    this.props.navigation.navigate(item.screen);
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



  onNotification = (notify,response) => {
    console.log('[App]_onNotification_0012: ', notify);
    const {userData} = this.state;

    // console.log('__notify__', notify);
    // console.log('response', response);
    // console.log('route_name',this.props.route.name);

   
    //
    if (notify.title == 'Calling....') {

      
      console.log('nofity',notify)
      this.props.navigation.navigate("Join_Screen",{response,userData})
    
    }
    else if (notify.title == 'Accepted') {

      if(userData.signup_type == 1)
      {
        Utils.showToastMessage("Patient accepted the call");
        this.props.navigation.navigate("Join_Screen",{response,userData})
      }
    
    }


    else if (notify.title == 'Rejected') {

      Utils.showToastMessage("Patient rejected the call");
      if(this.props.route.name != 'Home' && this.props.route.name != 'App')
      {
        
        this.props.navigation.navigate("App", {
          // screen: "Welcome",
          initial: false,
        });

      }
      // 
    
    }

    else {
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

  
  componentDidMount() {


    // ding.setVolume(1);
    

    this.checkApplicationPermission();

    console.log('Constants_homebanner',Constants.homebanner);


    const {
      userData,
      asistantData,
      doctorData,
      pharmacyData,
      patientData,
      isConnectyCubeConnected,
    } = this.state;

    console.log("_UserData_", userData);


    setTimeout(() => {
      console.log("Updating_token");
      this._update_token();
      this.onSetMyLocation();
    }, 6000);

    if (userData.signup_type == 3) this.setState({ menuData: asistantData });
    else if (userData.signup_type == 2)
      this.setState({ menuData: patientData });
    else if (userData.signup_type == 5)
      this.setState({ menuData: pharmacyData });
    else this.setState({ menuData: doctorData });

    this.setFcm();

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
  requestLocationPermissionAndroid = async () => {
    Geolocation.getCurrentPosition(
      info => {
        let latitude = info.coords.latitude;
        let longitude = info.coords.longitude;

        this.props.dispatch({
          type: 'USER_LOCATION',
          payload: info.coords,
        });
        console.log('splash_location', info.coords);
      },
      e => {
        // alert('Location permissions denied');
        console.log('location_error', e);

        // const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

        // if (granted) {
        //   console.log( "You can use the ACCESS_FINE_LOCATION" )
        // }
        // else {
        //   console.log( "ACCESS_FINE_LOCATION permission denied" )
        // }
      },
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
    );
  };


  componentWillUnmount() {
    const {userData} = this.state;
    fcmService.unRegister();
    localNotificationService.unregister();
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

        console.log('save_token_done', responseJson);

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
  
  onOpenNotification = notify => {
    console.log('testOpen_notify', notify);
    // const {userData} = this.state;
    // var body = JSON.parse(notify.data);
    // console.log('Body_testOpen_notify', notify);
    // console.log('Body_testOpen_body', body);
    // if (notify.title == 'Calling....') {

      this.props.navigation.navigate("Video")
      return false;
    // } 

    if (notify.title.substr(0, 11) == 'Calling....') {
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
        start();
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
              stop();
            },
            style: 'cancel',
          },
          {
            text: ' Attend Call',
            onPress: () => {
              stop();
              if (userData.signup_type != 1) {
                this._onPressPush(body.from, body.data[0].consultation_id);
                this.routeScreen(body.data.signup_connect_id, body.data);
              }
            },
          },
        ]);
      }
    }
  };

  setFcm() {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, this.onNotification, onOpenNotification);
    localNotificationService.configure(this.onOpenNotification);

    function onRegister(token) {
      Utils.setfcmToken(token);
      // _update_token(token);
      console.log('[App] onRegister token : ',token);
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification open 00: ',notify);
      // alert('Open Notification: ' + notify.body);
      // var body = JSON.parse(notify.data);
      console.log('boyd', notify);
      
    }
  }


  _renderMenus = ({ item, index }) => {
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
    // this.props.navigation.navigate('openDrawer')
  }

  _onPressCancel(call_id) {
    const { userData } = this.state;

    var payload = new FormData();
    payload.append("call_id", call_id);
    payload.append("call_ended_by", userData.signup_id);
    payload.append("call_status", 2);
    Services.post("call_cancel", {}, payload, true)
      .then((responseJson) => {})
      .catch((error) => {});
  }
  _onPressPush(id, consultation_id) {
    const { userData } = this.state;

    var payload = new FormData();
    payload.append("to", id);
    payload.append("from", userData.signup_id);
    payload.append("consultation_id", consultation_id);
    Services.post("call_notify", {}, payload, true)
      .then((responseJson) => {})
      .catch((error) => {});
  }

  render() {
    const {
      loading,
      userData,
      loadsData = [],
      isConnectyCubeConnected,
    } = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title="HOME"
          showBack={false}
          showMenu={true}
          onLeftPress={() => {
            this.onMenuPressBtn();
          }}
          children={
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("TransctionHistoryUser")
              }
            >
              <Entypo name="wallet" style={{ color: "white", fontSize:20, }} />
            </TouchableOpacity>
          }
          showRight={true}
        />
        <ScrollView
          style={{ flex: 1, backgroundColor: Constants.Colors.primaryBlue }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
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

          <View
            style={{
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Customer Support
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 10,
                }}
                onPress={() => {
                  Linking.openURL(`tel:03243576131`);
                }}
              >
                <Entypo name="phone" style={styles.fwdIcon} />
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 17,
                  }}
                >
                  0324 3576131
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 10,
                }}
                onPress={() => {
                  Linking.openURL(
                    "whatsapp://send?text=Hi, I need your help&phone=923243576131"
                  );
                }}
              >
                <FontAwesome name="whatsapp" style={styles.fwdIcon} />
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 17,
                  }}
                >
                  0324 3576131
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {Utils.showSpinner(loading)}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.main.userData,
  };
};
export default connect(mapStateToProps)(Home);
