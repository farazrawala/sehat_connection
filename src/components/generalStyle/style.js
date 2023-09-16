import { Constants, Colors } from "../../utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  leftWhitePadding: {
    width: 15,
    height: "100%",
  },
  rightBluePadding: {
    height: "100%",
    width: 15,
    backgroundColor: Constants.Colors.primaryBlue,
  },
  loginBtn: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    backgroundColor: Constants.Colors.primaryGreen,
  },
  loginBtnBlue: {
    width: "100%",

    borderRadius: 30,
    height: 55,
    backgroundColor: Constants.Colors.primaryBlue,
  },
  loginImageBlueBtn: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    // height:55,
    backgroundColor: Constants.Colors.primaryBlue,
    // borderWidth: 1,
  },
  loginImageYellowBtn: {
    paddingVertical: 15,
    paddingHorizontal: 22,
    backgroundColor: Constants.Colors.primaryYellow,
    // borderWidth: 1
  },
  rightYellowPadding: {
    height: "100%",
    width: 15,
    backgroundColor: Constants.Colors.primaryYellow,
  },
  mainContainer: {
    flex: 1,
    // backgroundColor: Constants.Colors.primaryBlue,
    // paddingTop: 200,
    // paddingBottom: 50
    // marginBottom: 50
  },
  descContainer: {
    // paddingLeft: 30,
    paddingHorizontal: 30,
    marginTop: -10,
    alignItems: "center",
    marginTop: 20,
    // flex: 1
  },
  loginMainHeadingText: {
    fontSize: Constants.FontSize.extraLarge,
    fontWeight: "bold",
  },
  otherEmailText: {
    fontSize: 12,
    marginTop: 30,
    marginVertical: 20,
    paddingHorizontal: 15,
    fontFamily: Constants.PoppinsSemiBold,
  },
  socialContainer: {
    flexDirection: "row",
    marginVertical: 20,
    width: 220,
  },
  socialWrapper: {
    flex: 1,
  },
  loginSocialIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  loginContainer: {
    flex: 1,
    paddingHorizontal: 30,
    width: "100%",
    paddingTop: 20,
    // backgroundColor: 'red'
  },
  inputLoginIconStyle: {
    color: Constants.Colors.red,
    fontSize: 11,
  },
  imageBgBtn: {
    position: "absolute",
    right: -28,
    width: 140,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  headerLeftIcon: {
    color: "white",
    fontSize: 25,
  },
  headerRightIcon: {
    color: "white",
    fontSize: 25,
  },
  mapWrappper: {
    height: 200,
    marginTop: -15,
    width: "100%",
    // backgroundColor: 'red',
    zIndex: 100,
  },
  inputLabelStyle: {
    // fontSize: Constants.FontSize.medium,
    // marginBottom: 5,
    // marginLeft: 10,
    fontSize: 13,
    fontFamily: Constants.PoppinsSemiBold,
    marginLeft: 15,
  },
});
export default styles;
