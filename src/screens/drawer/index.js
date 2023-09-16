import React, { Component } from "react";
import { Image, View, ScrollView, Text, TouchableOpacity } from "react-native";
// import { Icon } from "native-base";
// import { StackActions, NavigationActions } from "react-navigation";

import Constants from "../../utils/Constants";
import { Utils } from "../../utils";
import Services from "../../apis/services";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";

type Props = {};
export default class Drawer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,

      userData: [],
      // tabSelect: 1,
      _pharmacyData: [
        // {
        //   title: 'Profile',
        //   screen: 'doctorProfile',
        //   icon: <Icon name="user" type="FontAwesome" style={styles.menuIcon} />,
        // },
        {
          title: "Notification",
          screen: "notifications",
          icon: <Entypo name="bell" style={styles.menuIcon} />,
        },

        {
          title: "Add Member",
          screen: "PharmacyUsers",
          icon: <FontAwesome name="user" style={styles.menuIcon} />,
        },

        {
          title: "Terms",
          screen: "doctorProfile",
          icon: <Foundation name="clipboard-notes" style={styles.menuIcon} />,
        },

        {
          title: "Sehat Wallet",
          screen: "TransctionHistory",
          icon: <FontAwesome name="wallet" style={styles.menuIcon} />,
        },

        {
          title: "Log Out",
          screen: "Logout",
          icon: (
            <MaterialCommunityIcons name="logout" style={styles.menuIcon} />
          ),
        },
      ],
      _menuData: [
        // {
        //   title: 'Profile',
        //   screen: 'doctorProfile',
        //   icon: <Icon name="user" type="FontAwesome" style={styles.menuIcon} />,
        // },
        {
          title: "Notification",
          screen: "notifications",
          icon: <Entypo name="bell" style={styles.menuIcon} />,
        },
        // {
        //   title: 'Add Member',
        //   screen: 'PharmacyUsers',
        //   icon: <Icon name="user" type="FontAwesome" style={styles.menuIcon} />,
        // },
        {
          title: "Consultations History",
          screen: "ConsultationHistory",
          icon: (
            <FontAwesome5
              name="history"
              type="FontAwesome5"
              style={styles.menuIcon}
            />
          ),
        },
        {
          title: "Waiting List",
          screen: "AssistantAppointments",
          icon: <Foundation name="clipboard-notes" style={styles.menuIcon} />,
        },

        {
          title: "Sehat Wallet",
          screen: "TransctionHistoryUser",
          icon: (
            // <Icon name="history" type="FontAwesome5" style={styles.menuIcon} />
            <Entypo name="wallet" style={styles.menuIcon} />
          ),
        },
        // {
        //   title: 'Billing',
        //   screen: 'doctorProfile',
        //   icon: (
        //     <Icon
        //       name="clipboard-notes"
        //       type="Foundation"
        //       style={styles.menuIcon}
        //     />
        //   ),
        // },
        // {
        //   title: 'Terms',
        //   screen: 'doctorProfile',
        //   icon: (
        //     <Icon
        //       name="clipboard-notes"
        //       type="Foundation"
        //       style={styles.menuIcon}
        //     />
        //   ),
        // },
        // {
        //   title: 'Schedule Appointment',
        //   screen: 'doctorProfile',
        //   icon: (
        //     <Icon name="clock-o" type="FontAwesome" style={styles.menuIcon} />
        //   ),
        // },
        // {
        //   title: 'Patients Waiting List',
        //   screen: 'doctorAppointments',
        //   icon: (
        //     <Icon
        //       name="clipboard-notes"
        //       type="Foundation"
        //       style={styles.menuIcon}
        //     />
        //   ),
        // },
        // {
        //   title: 'Find Patient Record',
        //   screen: 'doctorProfile',
        //   icon: (
        //     <Icon
        //       name="page-search"
        //       type="Foundation"
        //       style={styles.menuIcon}
        //     />
        //   ),
        // },
        {
          title: "Log Out",
          screen: "Logout",
          icon: (
            <MaterialCommunityIcons name="logout" style={styles.menuIcon} />
          ),
        },
      ],
    };
  }

  onPressMenu = (screen) => {
    // this.setState({ selected: type });
    this.props.navigation.navigate(screen);
  };

  getSelectedStyle = (type = 1) => {
    if (type == this.state.selected) {
      return { color: "#fff" };
    }
  };

  removeToken() {
    const { userData } = this.state;
    var payload = new FormData();
    payload.append("signup_id", userData.signup_id);
    Services.post("remove_token", {}, payload, true)
      .then((responseJson) => {
        console.log("Remove token", responseJson);
      })
      .catch((error) => {});
  }

  componentDidMount = async () => {
    const { data, _pharmacyData } = this.state;

    var userData = await Utils.getUserData();
    userData = JSON.parse(userData);

    console.log("componentDidMount", userData);
    if (userData.signup_type == 5) {
      this.setState({ _menuData: _pharmacyData });
    }

    if (!Utils.isEmpty(userData)) {
      this.setState({ userData });
    }
  };

  render() {
    const { selected = 1, _menuData = [], userData } = this.state;

    const userType = userData.signup_type;
    var userImage = "";

    if (userData.signup_image != "" && userData.signup_image != null)
      userImage =
        Constants.url + userData.signup_image_path + userData.signup_image;
    else if (userData.signup_gendar == "male")
      userImage = Constants.imgBaseUrl + "avatar_male.jpeg";
    else if (userData.signup_gendar == "female")
      userImage = Constants.imgBaseUrl + "avatar_female.jpeg";

    // console.log('userImage', userImage);

    return (
      <View style={styles.Container}>
        <View style={styles.profileWrapper}>
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: userImage,
              }}
              // source={Constants.avatar}
              style={styles.profileStyle}
            />
          </View>
          <Text style={styles.nameStyle}>
            {userType == 1 ? "Dr. " : null}{" "}
            {Utils.capitalizeFirstLetter(userData.signup_firstname)}{" "}
            {Utils.capitalizeFirstLetter(userData.signup_lastname)}
            {/* {userData.signup_id} */}
          </Text>
          <Text style={styles.titleStyle}>
            {userType == 3 ? "Telehealth Assistant" : ""}
            {userType == 2 ? "Patient" : ""}
            {userType == 5 ? "Pharmacy Assistant" : ""}
          </Text>
          <Text
            style={[styles.titleStyle, { color: Constants.Colors.primaryBlue }]}
          >
            Version : {Constants.versionName}
          </Text>
          <Text
            style={[styles.titleStyle, { color: Constants.Colors.primaryBlue }]}
          >
            {userData.signup_type == 5 ? userData.pharmacy_name : null}
          </Text>

          {userType == 5 ? (
            <Text
              style={[
                styles.titleStyle,
                { color: Constants.Colors.primaryBlue },
              ]}
            >
              Promo Code : {userData.signup_contact}
            </Text>
          ) : null}
        </View>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.menuContainer}>
            {_menuData.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  if (item.screen != "Logout") {
                    this.onPressMenu(item.screen);
                  } else {
                    this.removeToken();
                    Utils.saveUserData("");
                    this.onPressMenu("Login");
                  }
                }}
                style={styles.menuWrapper}
              >
                <View style={styles.menuIconContainer}>{item.icon}</View>
                <View style={styles.menuTextWrapper}>
                  <Text style={styles.menuText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = {
  Container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  menuIcon: {
    color: Constants.Colors.primaryGreen,
    fontSize: 25,
  },
  menuTextWrapper: {
    // borderBottomWidth: 1,
    // borderBottomColor: Constants.Colors.backgrounGrey
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: Constants.Colors.backgrounGrey
  },
  profileWrapper: {
    // width:''
    height: 200,
    paddingTop: 10,
    // backgroundColor: 'blue',
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    width: 100,
    borderRadius: 50,
    // backgroundColor: 'red',
  },
  profileStyle: {
    width: 100,
    height: 100,
    // resizeMode: 'contain',
    borderWidth: 5,
    borderRadius: 50,
    // marginTop: 20,
    // backgroundColor: 'red',
  },
  nameStyle: {
    marginTop: 5,
    fontSize: 20,
    color: Constants.Colors.primaryBlue,
    fontWeight: "bold",
  },
  titleStyle: {
    fontSize: 12,
    color: Constants.Colors.primaryGreen,
    fontWeight: "bold",
  },
  menuContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopWidth: 7,
    borderTopColor: Constants.Colors.backgrounGrey,
  },

  menuWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    borderBottomColor: Constants.Colors.backgrounGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 13,
    color: Constants.Colors.grey,
    fontFamily: Constants.PoppinsSemiBold,
    marginLeft: 10,
  },
};
