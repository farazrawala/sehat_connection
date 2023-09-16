import React from "react";
import { Text, View, TouchableOpacity, Image, Animated } from "react-native";
import styles from "./styles";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

//

import { Constants } from "../../utils";
import { Touchable } from "../";
import LinearGradient from "react-native-linear-gradient";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const Header = ({
  title = "",
  leftIcon = null,
  customStyles = {},
  children,
  titleStyle = {},
  onLeftPress,
  onRightPress,
  onSavePress,
  showLogIcon = false,
  cartBadge = 0,
  showBack = false,
  showMenu = false,
  showShare = false,
  addTrans = false,
  bgHeight = 100,
  viewStyles = null,
  showLogout = false,
  showAddMember = false,
  showRight = false,
  showVideo = false,
  showCart = false,
}) => (
  <AnimatedGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={[Constants.Colors.primaryBlue, Constants.Colors.primaryBlue]}
    style={[styles.mainHeader, customStyles]}
  >
    <View style={styles.statusbar} />
    <View style={styles.mainView}>
      <View style={styles.subView}>
        <View style={styles.buttonView}>
          {showBack ? (
            <Touchable
              disabled={false}
              onPress={onLeftPress}
              buttonStyle={styles.buttonView}
            >
              <Ionicons name="arrow-back" style={styles.backIcon} />
            </Touchable>
          ) : null}

          {showMenu ? (
            <Touchable
              disabled={false}
              onPress={onLeftPress}
              buttonStyle={styles.buttonView}
            >
              <Entypo name="menu" style={styles.backIcon} />
            </Touchable>
          ) : null}
        </View>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={[styles.title, titleStyle]}>
            {title}
          </Text>
        </View>

        <View style={styles.buttonView}>
          {showCart ? (
            <View style={{ flexDirection: "row" }}>
              <Touchable
                disabled={false}
                onPress={onRightPress}
                buttonStyle={styles.buttonView}
              >
                <FontAwesome
                  type="FontAwesome"
                  name="shopping-cart"
                  style={styles.backIcon}
                />
              </Touchable>
              {cartBadge != 0 ? (
                <Text
                  style={{
                    backgroundColor: "white",
                    color: Constants.Colors.primaryBlue,
                    borderRadius: 5,
                    position: "absolute",
                    left: 35,
                    width: 20,
                    height: 20,
                    top: -1,
                    textAlign: "center",
                  }}
                >
                  {cartBadge}
                </Text>
              ) : null}
            </View>
          ) : null}
          {showShare ? (
            <Touchable
              disabled={false}
              onPress={onRightPress}
              buttonStyle={styles.buttonView}
            >
              <Entypo name="share" style={styles.backIcon} />
            </Touchable>
          ) : null}

          {addTrans ? (
            <Touchable
              disabled={false}
              onPress={onRightPress}
              buttonStyle={styles.buttonView}
            >
              <MaterialCommunityIcons
                // type="MaterialCommunityIcons"
                name="bank-transfer"
                style={styles.backIcon}
              />
            </Touchable>
          ) : null}

          {showLogIcon ? (
            <View style={{ flexDirection: "row" }}>
              <Touchable
                disabled={false}
                onPress={onRightPress}
                buttonStyle={[styles.buttonView, { width: 40 }]}
              >
                <MaterialCommunityIcons name="printer" style={styles.logIcon} />
              </Touchable>
              <Touchable
                disabled={false}
                onPress={onSavePress}
                buttonStyle={[
                  styles.buttonView,
                  { width: 40, marginRight: 20 },
                ]}
              >
                <FontAwesome5 name="save" style={styles.logIcon} />
              </Touchable>
            </View>
          ) : null}
          {showLogout ? (
            <Touchable
              disabled={false}
              onPress={onRightPress}
              buttonStyle={[styles.buttonView, { width: 40 }]}
            >
              <FontAwesome name="sign-out" style={styles.logIcon} />
            </Touchable>
          ) : null}
          {showAddMember ? (
            <Touchable
              disabled={false}
              onPress={onRightPress}
              buttonStyle={[styles.buttonView, { width: 40 }]}
            >
              <FontAwesome name="plus" style={styles.logIcon} />
            </Touchable>
          ) : null}
          {showVideo ? (
            <Touchable
              disabled={false}
              onPress={onRightPress}
              buttonStyle={[styles.buttonView, { width: 40 }]}
            >
              <MaterialIcons
                type="MaterialIcons"
                name="video-call"
                style={styles.videoIcon}
              />
            </Touchable>
          ) : null}
          {showRight ? children : null}
        </View>
      </View>
      {children}
    </View>
  </AnimatedGradient>
);
export { Header };
