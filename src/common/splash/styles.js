import { Constants } from "../../utils";
import { StyleSheet, Platform } from "react-native";

const loginStyles = StyleSheet.create({
  imageBgStyle: {
    width: "100%",
    height: "100%",
    flexDirection: "column-reverse",
  },
  descContainer: {
    width: "100%",
    height: Constants.ScreenHeight,
    // flex: 1,
    // borderColor: Constants.Colors.red,
    // borderWidth: 1,
    // backgroundColor: "red",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    marginTop: 5,
    color: Constants.Colors.grey,
    fontSize: 13,
    width: "90%",
  },
  footerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    marginTop: 35,
  },
  loadingText: {
    color: Constants.Colors.black,
    fontSize: Constants.FontSize.medium,
  },
  centerContainer: {
    marginTop: Platform.OS == "android" ? 0 : 0,
  },
});
export default loginStyles;
