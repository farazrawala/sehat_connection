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
import { Icon, Root } from "native-base";
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
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Services from "../../apis/services";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      phone: "03",
      email: "",
      password: "",
      securePass: true,
      loading: false,
      promocode: "",
      gender: "Male",
      genderData: [
        { id: 1, value: "Male" },
        { id: 2, value: "Female" },
        { id: 3, value: "Other" },
      ],
    };
  }

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


    this.props.navigation.navigate(screenName, {
      // screen: "Welcome",
      initial: false,
    });


  };

  onPressSignup = () => {
    const {
      fname,
      lname,
      phone,
      promocode = "",
      email = "",
      password = "",
      gender,
    } = this.state;

    if (fname == "") {
      Utils.showToastMessage("First name cannot be empty.", "danger");
      return;
    }
    // else if (lname == '') {
    //   Utils.showToastMessage('Last name cannot be empty.', 'danger');
    //   return;
    // }
    else if (phone.length < 11) {
      Utils.showToastMessage("Phone cannot be less than 11 digits", "danger");
      return;
    }

    // else if (email == '') {
    //   Utils.showToastMessage("Email Address cannot be empty.", "danger");
    //   return;
    // }
    else if (password == "") {
      Utils.showToastMessage("Please enter password", "danger");
      return;
    } else {
      var routeName;
      this.setState({ loading: true });
      var token = "";

      var payload = new FormData();
      payload.append("signup_firstname", fname);
      payload.append("signup_lastname", lname);
      payload.append("signup_email", email);
      payload.append("signup_password", password);
      payload.append("signup_contact", phone);
      payload.append("signup_promocode", promocode);
      payload.append("signup_gendar", gender.toLowerCase());
      // gender
      payload.append("signup_type", 2);

      Services.post("signup", {}, payload, true)
        .then((responseJson) => {
          console.log("responseJson", responseJson);
          this.setState({
            loading: false,
          });

          if (responseJson.status == 0) {

            if(responseJson.txt[0] == 'The Mobile Number field must contain a unique value')
            {
              Utils.showToastMessage('Number already exists');
            }
            else
            {
              Utils.showToastMessage(responseJson.txt[0]);
            }
            
          // console.log("responseJson__error", responseJson);

          } else {
            Utils.showToastMessage("Registeration is done successfully");

            this.autoLogin();
            // this.props.navigation.navigate('Login');

            // this.props.dispatch({
            //   type: 'USER_DATA',
            //   payload: responseJson.data,
            // });
            // Utils.saveUserData(JSON.stringify(responseJson.data));
            // const resetAction = StackActions.reset({
            //   index: 0,
            //   actions: [StackActions.reset({routeName: 'App'})],
            // });
            // this.props.navigation.dispatch(resetAction);
          }
        })
        .catch((error) => {
          console.log("_error", error);

          // utils.showToast('Please check your internet connection');
          this.setState({
            loading: false,
          });
        });

      // actions.postRequest('signup', data, token, false, (status, response) => {

      //   this.setState({
      //     loading: false,
      //   })

      //   console.log('response', response);

      //   if (response.data.status == 1) {

      //     //   // this.props.dispatch({
      //     //   //   type: "USER_DATA",
      //     //   //   payload: response.data.response
      //     //   // })

      //     //   // // console.log('user data', response.data.response);
      //     //   // Utils.saveUserData(JSON.stringify(response.data.response));
      //     //   // var account_type = response.data.response.roles[0].slug;

      //     //   // if (account_type == 'shipment') {
      //     //   //   Utils.setUserType("shipment");
      //     //   //   routeName = 'HomeShipment';
      //     //   // } else if (account_type == 'broker') {
      //     //   //   Utils.setUserType("broker");
      //     //   //   routeName = 'homeBroker';
      //     //   // }
      //     //   // else if (account_type == 'terminal') {
      //     //   //   Utils.setUserType("terminal");
      //     //   //   routeName = 'homeTerminal';
      //     //   // }
      //     //   // else if (account_type == 'carrier') {
      //     //   //   Utils.setUserType("carrier");
      //     //   //   routeName = 'HomeCarrier';
      //     //   // }
      //     //   // else if (account_type == 'trucker') {
      //     //   //   Utils.setUserType("trucker");
      //     //   //   routeName = 'homeTrucker';
      //     //   // }
      //     //   // else if (account_type == 'customer') {
      //     //   //   Utils.setUserType("customer");
      //     //   //   routeName = 'homeCustomer';
      //     //   // }

      //     //   if (routeName != null) {

      //     //     this.resetView(routeName);
      //     //     Utils.showToastMessage("Login Successfully", "success");

      //     //   }
      //   }
      //   else {

      //     Utils.showToastMessage(response.data.txt, "danger");

      //   }

      // })
    }
  };

  autoLogin() {
    const { phone, password = "" } = this.state;

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
          // Utils.showToastMessage('Login Successfully');

          alert("Welcome to Sehat Connection");

          // console.log('login data', responseJson.data);
          this.props.dispatch({
            type: "USER_DATA",
            payload: responseJson.data,
          });
          Utils.saveUserData(JSON.stringify(responseJson.data));
          // const resetAction = StackActions.reset({
          //   index: 0,
          //   actions: [StackActions.reset({ routeName: "App" })],
          // });
          // this.props.navigation.dispatch(resetAction);
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
            txt={"Already have an account ?"}
            type={'heading'}
            fontSize={18}
            textColor={'white'}
            customStyle={{
              marginVertical: 0,
            }}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <CustomText
              txt={' Login'}
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
                  <Heading txt={"Sign up"} type={"large"} />
                </View>
                <View style={mainStyle.loginContainer}>

                <LoginInput
                    placeholder="Name"
                    inputRef={"fname"}
                    ref={"fname"}
                    label={"Name"}
                    value={this.state.fname}
                    returnKeyType={"next"}
                    onChangeText={(fname) => this.setState({ fname })}
                    onSubmitEditing={() =>
                      this._onSubmitEditing("fname", "phone")
                    }
                  />

                  <LoginInput
                    placeholder="03001234567"
                    inputRef={"phone"}
                    ref={"phone"}
                    maxLength={11}
                    label={"Phone"}
                    keyboard={Constants.Keyboard.phone}
                    value={this.state.phone}
                    returnKeyType={"next"}
                    onChangeText={(phone) => this.setState({ phone })}
                    onSubmitEditing={() =>
                      this._onSubmitEditing("phone", "password")
                    }
                  />


<LoginInput
                    keyboard={"default"}
                    placeholder="***********"
                    inputRef={"password"}
                    value={this.state.password}
                    returnKeyType={"next"}
                    ref={"password"}
                    label={"Password"}
                    rightIcon={true}
                    onChangeText={(password) => this.setState({ password })}
                    onSubmitEditing={() =>
                      this._onSubmitEditing("password", "promocode")
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
                        style={{ color: Constants.Colors.grey, fontSize: 16 }}
                      />
                    </TouchableOpacity>
                  </LoginInput>

                  <LoginInput
                    placeholder="Promo Code"
                    inputRef={"promocode"}
                    label={"Promo Code"}
                    ref={"promocode"}
                    value={this.state.promocode}
                    returnKeyType={"done"}
                    onChangeText={(promocode) => this.setState({ promocode })}
                    
                    onSubmitEditing={() =>
                      this._onSubmitEditing("password", null)
                    }
                  />
                  {/* 

                 

                 

                  <LoginInput
                    placeholder="Gender"
                    inputRef={"pharmacyState"}
                    ref={"pharmacyState"}
                    label={"Gender"}
                    isDropdown={true}
                    value={this.state.gender}
                    returnKeyType={"next"}
                    data={this.state.genderData}
                    selectedVal={this.state.gender}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({
                        gender: itemValue,
                      });
                    }}
                  /> */}

                  <View style={{ marginTop: 20 }}>
                    <RoundedButton
                      text="Sign up"
                      textColor={"white"}
                      fontsize={22}
                      customStyle={mainStyle.loginBtn}
                      handleOnPress={() => {
                        this.onPressSignup();
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
export default connect(mapStateToProps)(Signup);
