import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";

import { Constants } from "../../utils";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/AntDesign";

const selected = ["#252eb2", "#4f59ea"];
const unselected = [];

const RoundedButton = ({
  text,
  textColor,
  wrapperPadding = 3,
  wrapperbg,
  bordercolor = Constants.grey,
  rightMargin = 0,
  fontsize = 13,
  background,
  width,
  bdHeight,
  touchCustomStyle,
  arrowIcon = false,
  bdRadius,
  handleOnPress,
  isBlueImage = false,
  customStyle,
  isGradient = false,
  buttonTextStyle = null,
}) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={handleOnPress}
    style={[styles.touchBtn, touchCustomStyle]}
  >
    {isGradient ? (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={isGradient ? selected : unselected}
        style={[styles.buttonTextWrappper, customStyle, styles.wrapper]}
      >
        <Text
          style={[styles.buttonText, { color: textColor, fontSize: fontsize }]}
        >
          {text}
        </Text>
      </LinearGradient>
    ) : (
      <View style={[styles.buttonTextWrappper, customStyle, styles.wrapper]}>
        {/* <View style={{flex: 1, padding: 20}}> */}
        <Text
          style={[
            styles.buttonText,
            { color: textColor, fontSize: fontsize },
            buttonTextStyle,
          ]}
        >
          {text}
        </Text>
        {/* </View> */}
        {arrowIcon ? <Icon name="caretdown" style={styles.arrowIcon} /> : null}
      </View>
    )}
  </TouchableOpacity>
);

export { RoundedButton };

const styles = StyleSheet.create({
  buttonText: {
    textAlign: "center",
    // backgroundColor: 'red',
    fontFamily: Constants.PoppinsSemiBold,
    paddingHorizontal: 5,
    fontSize: Platform.OS == "android" ? 12 : 13,
  },
  arrowIcon: {
    color: "white",
    fontSize: 20,
  },
  searchIcon: {
    color: "white",
  },
  buttonTextWrappper: {
    // elevation:4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: Constants.Colors.primaryGreen,
    flexDirection: "row",
  },
  touchBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Constants.btnShadow,
    borderRadius: 50,
  },
});
