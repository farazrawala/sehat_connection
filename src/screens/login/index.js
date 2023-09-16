import React, { Component } from "react";
import {
  ImageBackground,
  View,
  TextInput,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import styles from "./styles";
// import { Icon } from "native-base";
import {
  RoundedButton,
  Heading,
  CustomText,
  LoginInput,
  Spinner,
} from "../../components";
import mainStyle from "../../components/generalStyle/style";
import { Constants, Utils } from "../../utils";
// import { StackActions, NavigationActions } from "react-navigation";
import * as actions from "../../actions";
import { connect } from "react-redux";
import Services from "../../apis/services";
import LinearGradient from "react-native-linear-gradient";

import Icon from "react-native-vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "", // for assitant
      password: "",
      // if (Platform.OS == 'ios') {
      // 03111111111 Random pharmacy
      // 07969077242 uk patient
      // 03346767979 test pharmacy
      // 03332116396 test doctor
      // 03341127055 Faraz Bhai.
      // 03499449499 //
      // 03339090912 pharmist ghafoor bhai.
      // 03458217042 // for doctor
      // 03323252977 // for assistant
      // 03361223344 fro zulfi 171
      // 03160566250 rubi
      // 03330247548 madeeha asim
      // 03359999999 patient
      securePass: true,
      loading: false,
    };
  }

  // 2240

  _onSubmitEditing(curr, next) {
    if (next == "enter") {
      this._onSubmit();
    } else if (next != null) {
      this.refs[next].refs[next].focus();
    } else {
      this.refs[curr].refs[curr].blur();
      Keyboard.dismiss();
    }
  }

  componentDidMount = () => {
    // var obj = {}
    // this.props.dispatch({
    //   type: "USER_DATA",
    //   payload: obj
    // })
  };

  resetView = (screenName = "") => {
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: screenName })],
    // });
    // this.props.navigation.dispatch(resetAction);

    this.props.navigation.navigate("Home", {
      // screen: "Welcome",
      initial: false,
    });


  };

  _onSubmitLogin = () => {
    const { email = "", password = "", phone = "" } = this.state;
    if (phone == "") {
      Utils.showToastMessage("Please enter Phone Number!", "danger");
      return;
    }
    if (phone.length < 11) {
      Utils.showToastMessage(
        "Phone number length cannot be less than 11 digits.",
        "danger"
      );
      return;
    } else if (password == "") {
      Utils.showToastMessage("Please enter password", "danger");
      return;
    } else {
      var routeName;
      this.setState({ loading: true });
      var token = "";

      var payload = new FormData();
      payload.append("signup_contact", phone);
      payload.append("signup_password", password);
      Services.post("login", {}, payload, true)
        .then((responseJson) => {
          console.log("responseJson login", responseJson);

          this.setState({
            loading: false,
          });

          if (responseJson.status == 0) {
            Utils.showToastMessage(responseJson.txt);
          } else {
            Utils.showToastMessage("Login Successfully");

            console.log('login data', responseJson.data);


            this.props.dispatch({
              type: "USER_DATA",
              payload: responseJson.data,
            });
            Utils.saveUserData(JSON.stringify(responseJson.data));
           

                this.props.navigation.navigate("App", {
                  // screen: "Welcome",
                  initial: false,
                });

          }
        })
        .catch((error) => {
          this.setState({
            loading: false,
          });
        });
    }
  };

  handleSecure = (name, isSecure) => {
    this.setState({
      [name]: isSecure,
    });
  };

  _renderSignupView() {
    // if (Utils.getUserType() == 3 || Utils.getUserType() == 5) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
          }}>
          <CustomText
            txt={"Don't have an account ?"}
            type={'heading'}
            fontSize={18}
            textColor={'white'}
            customStyle={{
              marginVertical: 0,
            }}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signup')}>
            <CustomText
              txt={' Register now'}
              type={'heading'}
              fontSize={18}
              textColor={Constants.Colors.primaryGreen}
              customStyle={
                {
                  // marginVertical: 10,
                }
              }
            />
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 0}}>
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PharmacySignup')}>
            <CustomText
              txt={'Signup as a Pharmacy'}
              type={'heading'}
              fontSize={18}
              textColor={Constants.Colors.primaryGreen}
              customStyle={{
                marginVertical: 10,
              }}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    );
    // }
  }

  render() {
    const { securePass, loading = false } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : null}
        style={styles.Container}
      >
        <View style={mainStyle.mainContainer}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.primaryWrapper}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#FFFFFF", "#ECEEF5"]}
                style={{
                  paddingBottom: 30,
                  borderBottomLeftRadius: 55,
                  borderBottomRightRadius: 55,
                }}
              >
                <View style={styles.logoWrapper}>
                  <Image
                    style={{ width: 230, height: 120, resizeMode: "contain" }}
                    source={Constants.logo}
                  />
                </View>
                <View style={mainStyle.descContainer}>
                <Heading txt={"Login"} type={"large"} />
               
                </View>

                <View style={mainStyle.loginContainer}>
                  <LoginInput
                    placeholder="03001234567"
                    inputRef={"phone"}
                    label={"Phone"}
                    maxLength={11}
                    value={this.state.phone}
                    returnKeyType={"next"}
                    keyboard={Constants.Keyboard.phone}
                    onChangeText={(phone) => this.setState({ phone })}
                    onSubmitEditing={() =>
                      this._onSubmitEditing("phone", "password")
                    }
                  />
                  <LoginInput
                    icon={
                      <Icon
                        name="lock"
                        type="SimpleLineIcons"
                        style={mainStyle.inputLoginIconStyle}
                      />
                    }
                    keyboard={"default"}
                    placeholder="***********"
                    inputRef={"password"}
                    value={this.state.password}
                    returnKeyType={"done"}
                    ref={"password"}
                    label={"Password"}
                    rightIcon={true}
                    onChangeText={(password) => this.setState({ password })}
                    onSubmitEditing={() =>
                      this._onSubmitEditing("password", null)
                    }
                    isSecure={securePass}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.handleSecure("securePass", !securePass)
                      }
                      style={{
                        width: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FontAwesome
                        name={securePass ? "eye" : "eye-slash"}
                        // type="FontAwesome"
                        style={{ color: Constants.Colors.grey, fontSize: 16 }}
                      />
                    </TouchableOpacity>
                  </LoginInput>

                  <View style={{ marginTop: 20 }}>
                    <RoundedButton
                      text="Log in"
                      textColor={"white"}
                      fontsize={22}
                      customStyle={mainStyle.loginBtn}
                      handleOnPress={() => {
                        this._onSubmitLogin();
                      }}
                    />
                  </View>

                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      marginVertical: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("Forgetpassword")
                      }
                    >
                      <CustomText
                        txt={"Forgot Password?"}
                        type={"labelSmall"}
                        fontSize={13}
                        customStyle={{
                          marginTop: 20,
                          marginLeft: 30,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.secondaryWrapper}>
              <CustomText
                txt={
                  "by using Sehat Connection App, you agree to the Terms and Conditions"
                }
                type={"labelSmall"}
                fontSize={10}
                textColor={"white"}
                customStyle={{
                  width: "90%",
                  marginTop: 20,
                }}
              />


              

              <TouchableOpacity
              // onPress={() => this.props.navigation.navigate('forgotpassword')}
              >
                <CustomText
                  txt={"Terms and Conditions"}
                  type={"heading"}
                  fontSize={10}
                  textColor={"white"}
                  customStyle={{
                    marginVertical: 10,
                  }}
                />
              </TouchableOpacity>


              {this._renderSignupView()}
            </View>
          </ScrollView>
        </View>
        {loading ? <Spinner /> : null}
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.main.userData,
  };
};
export default connect(mapStateToProps)(Login);
