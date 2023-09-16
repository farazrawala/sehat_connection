// import DropdownHolder from './DropdownHolder';
import { Alert, StatusBar, Text, Platform, AsyncStorage,ToastAndroid } from "react-native";
// import { Toast } from "native-base";
import React, { Component } from "react";
// import Snackbar from 'react-native-snackbar';
// const snackbarLength = {
//   'short':Snackbar.LENGTH_SHORT,
//   'long':Snackbar.LENGTH_LONG,
// }
// import firebase from 'react-native-firebase';
// import Moment from 'react-moment';
import { Spinner } from "../components/spinner";
import { PlaceHolder } from "../components/placeHolder";

import { Constants } from "./";
// import moment from "moment";
import { DropDownHolder } from "./DropDownHolder";
import Colors from "./Colors";

// var home = 'homeBroker';
// var interface = 'broker'
var route = null;
var opponentUsers = [];
var userType = 3;
var verificationInfo = [];
var loader = false;
var info = [];
var deliveryAddress = {};
var consultantMedicine = [];
var selectedDoctor = {};
var consultUserData = "{}";
var currency = 1;
var fcmToken = "";
var homeLocation = "";
// var info = [];
var userData = '';

// var route = [
//   { home: 'homeBroker', interface: 'broker' }
// ];

class Utils {
  setfcmToken(token) {
    fcmToken = token;
  }
  getfcmToken() {
    return fcmToken;
  }

  setSelectedDoctor(info) {
    selectedDoctor = info;
  }
  getSelectedDoctor() {
    return selectedDoctor;
  }

  setHomeLocation(location) {
    homeLocation = location;
  }

  getHomeLocation() {
    return homeLocation;
  }

  setUserDeliveryLocation(address) {
    deliveryAddress = address;
  }
  getUserDeliveryLocation() {
    return deliveryAddress;
  }

  setOpponentUsers(user) {
    var temp = [];
    temp.push(opponentUsers);
    opponentUsers = user;
    console.log("setting opponentUsers", opponentUsers);
  }

  getOpponentUsers() {
    var temp = [];
    temp.push(opponentUsers);
    return temp;
  }

  //
  setConsultantMedicine(arr) {
    consultantMedicine = arr;
    console.log("consultantMedicine", consultantMedicine);
  }

  getconsultantMedicine() {
    return consultantMedicine;
  }
  // opponentUsers

  getConsultUserData = async () => {
    var consultUserData = await AsyncStorage.getItem("consultUserData");
    return JSON.parse(consultUserData) || {};
  };

  saveConsultUserData = (consultUserData = {}) => {
    // consultUserData = JSON.stringify(consultUserData);
    AsyncStorage.setItem("consultUserData", JSON.stringify(consultUserData));
  };

  getUserData = async () => {
    var userData = await AsyncStorage.getItem("userData");
    return JSON.parse(userData) || {};
  };
  saveUserData = (userData = {}) => {
    AsyncStorage.setItem("userData", JSON.stringify(userData));
  };

  setVerificationInfo(info) {
    verificationInfo = info;
  }

  getCurrency(currency) {
    if (currency == 1) {
      return "Rs. ";
    } else if (currency == 2) {
      return "$ ";
    }
  }

  getVerificationInfo() {
    return verificationInfo;
  }

  checkPasswordCharecter = (str) => {
    var letter = /[a-zA-Z]/;

    var valid = letter.test(str); //match a letter _and_ a number
    return valid;
  };

  checkPasswordNumber = (str) => {
    var number = /[0-9]/;
    var valid = number.test(str); //match a letter _and_ a number
    return valid;
  };

  validateKeyValue(arr, id) {
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element.id == id) {
        return { _isFav: true, index: i };
      }
    }
    return { _isFav: false };
  }
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  updateStatusbar = (type) => {
    switch (type) {
      case 1:
        StatusBar.setBarStyle("light-content");
        break;
      default:
        if (Constants.platform != "ios") {
          StatusBar.setBarStyle("light-content");
        } else {
          StatusBar.setBarStyle("dark-content");
        }
        // StatusBar.setBarStyle('dark-content')
        break;
    }
  };

  showSnackbar(
    title = "",
    length = "short",
    action = null,
    buttonTitle = "",
    buttonColor = "",
    onButtonPress = ""
  ) {
    if (action == null) {
    } else {
    }
  }

  capitalizeFirstLetter(string = "") {
    if (string == null) {
      return "";
    } else if (string != null && string.length > 2) {
      return string.charAt(0).toUpperCase() + string.slice(1);
      // console.log('string', string);
      // return string;
    } else {
      return string;
    }
  }

  checkDecimal(num) {
    return num % 1 != 0;
  }

  getMedicineType(type = 1) {
    if (type == 1) return "Tablet";
  }

  // showToastMessage(message, type, title) {
  //   // DropDownHolder.alert(type,title,message)
  //   DropDownHolder.alert('safsadf', 'sdfsa', 'success')

  // }

  showToastMessage(message, type) {
    // Toast.show({
    //   // coverScreen: false,
    //   text: message,
    //   duration: 3000,
    //   type: type,
    //   style: {
    //     zIndex: 99999,
    //     backgroundColor: "#252eb2",
    //   },
    // });
    ToastAndroid.show(message, ToastAndroid.SHORT);

  }

  setDateFormate(str) {
    return str;
  }

  getMarkersPipeSeperate(markers) {
    var addresses = "";
    var locations = "";
    var temp = [];
    var markers = markers;
    markers.map((marker, index) => {
      addresses = addresses + (index == 0 ? "" : "|") + marker.title;
      marker.coordinate
        ? (locations =
            locations +
            (index == 0 ? "" : "|") +
            marker.coordinate.latitude +
            "," +
            marker.coordinate.longitude)
        : null;
    });
    temp["addresses"] = addresses;
    temp["locations"] = locations;
    return temp;
  }

  validateEmail(str) {
    var pattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(str);
  }

  getMapMarkers(markers) {
    var temp = [];
    // console.log('Temp before ', markers)
    markers.addresses.map(function (marker, index) {
      var latlng = markers.locations[index].split(",");
      temp[index] = {
        desc: markers.addresses[index],
        title: markers.addresses[index],
        coordinate: {
          latitude: latlng[0],
          longitude: latlng[1],
        },
      };
    });

    console.log("Temp", temp);
    return temp;
  }

  mapPreDefineValues(addresses, locations) {
    // console.log('address', addresses);
    // console.log('locations', locations);
  }

  confirmAlert(title, msg, callback) {
    Alert.alert(
      title,
      msg,
      [
        { text: "NO", onPress: () => callback("error") },
        { text: "YES", onPress: () => callback("success") },
      ],
      { cancelable: false }
    );
  }

  confirmSettings(title, msg, callback) {
    Alert.alert(
      title,
      msg,
      [
        { text: "Settings", onPress: () => callback("success") },
        { text: "Cancel", onPress: () => callback("error") },
      ],
      { cancelable: false }
    );
  }

  showSpinner(loader = false) {
    return loader ? <Spinner size="large" /> : null;
  }

  showVideoCallSpinner(loader = false) {
    return loader ? (
      <Spinner txt="Awaiting assistant to be connected..." size="large" />
    ) : null;
  }

  showPlaceHolder(data = [], text = "No Records Found") {
    if (data.length < 1) {
      return <PlaceHolder desc={text} />;
    }
  }

  setUserType(type = 1) {
    userType = type;
  }

  getUserType() {
    return userType;
  }
}
export default new Utils();
