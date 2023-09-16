import { Constants } from "../../utils";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
// import {Surface} from 'react-native-paper';

import React from "react";
const HomeMenus = ({ onPress, item, customStyle, index }) => (
  <View style={styles.surfaceStyle}>
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <View style={[styles.menuWrapper, customStyle]}>
        <View style={styles.menuDesc}>
          <Image source={item.icon} style={styles.menuIconStyle} />
          <Text style={styles.menuTextStyle}>{item.title}</Text>
        </View>
        <View style={[styles.menuBottomBar]} />
      </View>
    </TouchableOpacity>
  </View>
);

export { HomeMenus };

const styles = StyleSheet.create({
  surfaceStyle: {
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    // overflow: 'hidden',
    // elevation: 4,

    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 4,
    // },
    // shadowOpacity: 0.30,
    // shadowRadius: 4.65,

    // elevation: 8,
  },
  menuWrapper: {
    width: Constants.ScreenWidth / 2.4,
    height: Constants.ScreenWidth / 2.5,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    overflow: "hidden",
    // elevation: 3,
    // borderWidth: 1,
  },
  menuTextStyle: {
    fontSize: Constants.FontSize.small,
    marginTop: 15,
    fontWeight: "bold",
    // fontFamily: Constants.PoppinsRegular
    textAlign: "center",
    color: Constants.Colors.primaryBlue,
  },
  menuIconWrapper: {
    // width: 60,
    // height: 60,
    // backgroundColor: 'green',
    // borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  menuIconStyle: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    // borderWidth: 1,
    // paddingBottom: 20,
  },
  menuBottomBar: {
    height: 7,
    width: "100%",
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
    // marginTop: -10,
    position: "absolute",
    bottom: 0,
    // borderColor:Constants.Colors.primaryGreen
    backgroundColor: Constants.Colors.primaryGreen,
    // borderWidth: 1,
  },
  menuDesc: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
});
