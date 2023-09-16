import React, {Component} from 'react';
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
} from 'react-native';
import styles from './styles';
// import {Icon} from 'native-base';
import {
  RoundedButton,
  Heading,
  CustomText,
  FormContainer,
  LoginInput,
  BgButton,
  Spinner,
} from '../../components';

import mainStyle from '../../components/generalStyle/style';
import {Constants, Utils} from '../../utils';
import {StackActions, NavigationActions} from 'react-navigation';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import Services from '../../apis/services';

class PharmacySignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: this.props.userLocation,
      fname: '',
      lname: '',
      promocode: '',
      phone: '03',
      email: '',
      cityData: [
        {id: 1, value: 'Karachi'},
        {id: 2, value: 'Rawalpindi'},
        {id: 3, value: 'Lahore'},
      ],
      stateData: [
        {id: 1, value: 'Islamabad'},
        {id: 2, value: 'Sindh'},
        {id: 3, value: 'Punjab'},
      ],
      pharmacyName: '',
      pharmacyAddress: '',
      pharmacyLicense: '',
      pharmacyCity: '',
      pharmacyState: '',
      signup_refference_code: '',

      password: '',
      securePass: true,
      loading: false,
      checkBox: false,
    };
  }

  _onSubmitEditing(curr, next) {
    if (next == 'enter') {
      this._onSubmit();
    } else if (next != null) {
      this.refs[next].refs[next].focus();
    } else {
      this.refs[curr].refs[curr].blur();
      Keyboard.dismiss();
    }
  }

  componentDidMount = () => {
    const {userData} = this.state;
    console.log('_addMember_', userData);
  };

  resetView = (screenName = '') => {
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({routeName: screenName})],
    // });
    // this.props.navigation.dispatch(resetAction);



    this.props.navigation.navigate(screenName, {
      // screen: "Welcome",
      initial: false,
    });
  };

  //

  savePharamay = id => {
    const {
      pharmacyName,
      pharmacyAddress,
      pharmacyLicense,
      pharmacyCity = '',
      pharmacyState = '',
      userLocation,
      promocode,
      // userData,
    } = this.state;

    console.log('_savePharamay_', userLocation);

    // return false;

    var routeName;
    this.setState({loading: true});
    var token = '';

    var payload = new FormData();
    payload.append('pharmacy_name', pharmacyName);

    payload.append('pharmacy_license_no', pharmacyLicense);
    payload.append('pharmacy_city', pharmacyCity);
    payload.append('pharmacy_state', pharmacyState);

    payload.append('pharmacy_address', pharmacyAddress);
    payload.append('signup_id', id);
    payload.append('pharmacy_promocode', promocode);

    payload.append('pharmacy_lat', userLocation.latitude);
    payload.append('pharmacy_long', userLocation.longitude);

    Services.post('pharmacy_signup', {}, payload, true)
      .then(responseJson => {
        console.log('pharmacy_signup_responseJson', responseJson);
        this.setState({
          loading: false,
        });

        if (responseJson.status == 0) {
          Utils.showToastMessage('Network Erro.');
        } else {
          Utils.showToastMessage('Registeration is done successfully');
          this.props.navigation.navigate('Login');
          // this.savePharamay(responseJson.signup_id);
        }
      })
      .catch(error => {
        console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  };

  onPressSignup = () => {
    const {
      fname,
      lname,
      phone,
      email = '',
      password = '',
      pharmacyName = '',
      pharmacyAddress = '',
      pharmacyLicense = '',
      pharmacyCity = '',
      pharmacyState = '',
    } = this.state;

    if (fname == '') {
      Utils.showToastMessage('First name cannot be empty.', 'danger');
      return;
    } else if (lname == '') {
      Utils.showToastMessage('Last name cannot be empty.', 'danger');
      return;
    } else if (phone.length < 11) {
      Utils.showToastMessage('Phone cannot be less than 11 digits', 'danger');
      return;
    } else if (password == '') {
      Utils.showToastMessage('Please enter password', 'danger');
      return;
    } else {
      var routeName;
      this.setState({loading: true});
      var token = '';

      var payload = new FormData();
      payload.append('signup_firstname', fname);
      payload.append('signup_lastname', lname);
      payload.append('signup_email', email);
      payload.append('signup_password', password);
      payload.append('signup_contact', phone);
      payload.append('signup_type', 5);
      payload.append('signup_refference_code', 5);

      Services.post('signup', {}, payload, true)
        .then(responseJson => {
          console.log('responseJson', responseJson);
          this.setState({
            loading: false,
          });

          if (responseJson.status == 0) {
            Utils.showToastMessage(responseJson.txt[0]);
          } else {
            // Utils.showToastMessage('Registeration is done successfully');
            // this.props.navigation.navigate('App');
            this.savePharamay(responseJson.signup_id);
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
  };

  handleSecure = (name, isSecure) => {
    this.setState({
      [name]: isSecure,
    });
  };

  render() {
    const {securePass, loading = false, checkBox = false} = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        style={styles.Container}>
        <View style={mainStyle.mainContainer}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.primaryWrapper}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FFFFFF', '#ECEEF5']}
                style={{
                  paddingBottom: 30,
                  borderBottomLeftRadius: 55,
                  borderBottomRightRadius: 55,
                }}>
                <View style={styles.logoWrapper}>
                  <Image
                    style={{width: 230, height: 120, resizeMode: 'contain'}}
                    source={Constants.logo}
                  />
                </View>
                <View style={mainStyle.descContainer}>
                  <Heading txt={'Pharmacy Sign Up'} type={'large'} />
                </View>
                <View style={mainStyle.loginContainer}>
                  <LoginInput
                    placeholder="Pharmacy Name"
                    inputRef={'pharmacyName'}
                    ref={'pharmacyName'}
                    label={'Pharmacy Name'}
                    value={this.state.pharmacyName}
                    returnKeyType={'next'}
                    onChangeText={pharmacyName => this.setState({pharmacyName})}
                    onSubmitEditing={() =>
                      this._onSubmitEditing('pharmacyName', 'pharmacyAddress')
                    }
                  />

                  <LoginInput
                    placeholder="Pharmacy Address"
                    inputRef={'pharmacyAddress'}
                    ref={'pharmacyAddress'}
                    label={'Pharmacy Address'}
                    value={this.state.pharmacyAddress}
                    isMutliLine={true}
                    returnKeyType={'next'}
                    onChangeText={pharmacyAddress =>
                      this.setState({pharmacyAddress})
                    }
                    onSubmitEditing={() =>
                      this._onSubmitEditing(
                        'pharmacyAddress',
                        'pharmacyLicense',
                      )
                    }
                  />

                  <LoginInput
                    placeholder="Pharmacy License"
                    inputRef={'pharmacyLicense'}
                    ref={'pharmacyLicense'}
                    label={'Pharmacy License'}
                    value={this.state.pharmacyLicense}
                    returnKeyType={'next'}
                    onChangeText={pharmacyLicense =>
                      this.setState({pharmacyLicense})
                    }
                    onSubmitEditing={() =>
                      this._onSubmitEditing('pharmacyLicense', null)
                    }
                  />

                  <LoginInput
                    placeholder="Pharmacy State"
                    inputRef={'pharmacyState'}
                    ref={'pharmacyState'}
                    label={'Pharmacy State'}
                    isDropdown={true}
                    value={this.state.pharmacyState}
                    returnKeyType={'next'}
                    data={this.state.stateData}
                    selectedVal={this.state.pharmacyState}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({
                        pharmacyState: itemValue,
                      });
                    }}
                  />

                  <LoginInput
                    placeholder="Pharmacy City"
                    inputRef={'pharmacyCity'}
                    ref={'pharmacyCity'}
                    label={'Pharmacy City'}
                    isDropdown={true}
                    returnKeyType={'next'}
                    data={this.state.cityData}
                    selectedVal={this.state.pharmacyCity}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({
                        pharmacyCity: itemValue,
                      });
                    }}
                  />

                  <LoginInput
                    placeholder="First Name"
                    inputRef={'fname'}
                    ref={'fname'}
                    label={'First Name'}
                    value={this.state.fname}
                    returnKeyType={'next'}
                    onChangeText={fname => this.setState({fname})}
                    onSubmitEditing={() =>
                      this._onSubmitEditing('fname', 'lname')
                    }
                  />

                  <LoginInput
                    placeholder="Last Name"
                    inputRef={'lname'}
                    ref={'lname'}
                    label={'Last Name'}
                    value={this.state.lname}
                    returnKeyType={'next'}
                    onChangeText={lname => this.setState({lname})}
                    onSubmitEditing={() =>
                      this._onSubmitEditing('lname', 'phone')
                    }
                  />

                  <LoginInput
                    icon={
                      <Icon
                        name="envelope-o"
                        type="FontAwesome"
                        style={mainStyle.inputLoginIconStyle}
                      />
                    }
                    placeholder="03001234567"
                    inputRef={'phone'}
                    ref={'phone'}
                    maxLength={11}
                    label={'Phone'}
                    keyboard={Constants.Keyboard.phone}
                    value={this.state.phone}
                    returnKeyType={'next'}
                    onChangeText={phone => this.setState({phone})}
                    onSubmitEditing={() =>
                      this._onSubmitEditing('phone', 'email')
                    }
                  />

                  <LoginInput
                    placeholder="name@sehatconnection.com"
                    inputRef={'email'}
                    label={'Email'}
                    ref={'email'}
                    value={this.state.email}
                    returnKeyType={'next'}
                    keyboard={Constants.Keyboard.email}
                    onChangeText={email => this.setState({email})}
                    onSubmitEditing={() =>
                      this._onSubmitEditing('email', 'password')
                    }
                  />

                  <LoginInput
                    keyboard={'default'}
                    placeholder="***********"
                    inputRef={'password'}
                    value={this.state.password}
                    returnKeyType={'done'}
                    ref={'password'}
                    label={'Password'}
                    rightIcon={true}
                    onChangeText={password => this.setState({password})}
                    onSubmitEditing={() =>
                      this._onSubmitEditing('password', null)
                    }
                    isSecure={securePass}>
                    <TouchableOpacity
                      onPress={() =>
                        this.handleSecure('securePass', !securePass)
                      }
                      style={{
                        width: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name={securePass ? 'eye' : 'eye-slash'}
                        type="FontAwesome"
                        style={{color: Constants.Colors.grey, fontSize: 16}}
                      />
                    </TouchableOpacity>
                  </LoginInput>

                  <LoginInput
                    placeholder="name@sehatconnection.com"
                    inputRef={'email'}
                    label={'Email'}
                    ref={'email'}
                    value={this.state.email}
                    returnKeyType={'next'}
                    keyboard={Constants.Keyboard.email}
                    onChangeText={email => this.setState({email})}
                    onSubmitEditing={() =>
                      this._onSubmitEditing('email', 'promocode')
                    }
                  />

                  <LoginInput
                    placeholder="Promo Code"
                    inputRef={'promocode'}
                    label={'Promo Code'}
                    ref={'promocode'}
                    value={this.state.promocode}
                    returnKeyType={'next'}
                    onChangeText={promocode => this.setState({promocode})}
                    // onSubmitEditing={}
                  />

                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          checkBox: !checkBox,
                        })
                      }>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingVertical: 5,
                        }}>
                        <Icon
                          type="MaterialCommunityIcons"
                          name={
                            checkBox == true
                              ? 'checkbox-marked-circle-outline'
                              : 'checkbox-blank-circle-outline'
                          }
                          style={styles.checkboxIconStyle}
                        />
                        <CustomText
                          txt={'Agree Terms and Condition'}
                          type={'labelSmall'}
                          fontSize={13}
                          customStyle={{
                            marginHorizontal: 10,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{marginTop: 20}}>
                    <RoundedButton
                      text="Sign Up"
                      textColor={'white'}
                      fontsize={22}
                      customStyle={mainStyle.loginBtn}
                      handleOnPress={() => {
                        this.onPressSignup();
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('Forgetpassword')
                      }>
                      <CustomText
                        txt={'Forgot Password?'}
                        type={'labelSmall'}
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
                  'by using Sehat Connection App, you agree to the Terms and Conditions'
                }
                type={'labelSmall'}
                fontSize={10}
                textColor={'white'}
                customStyle={{
                  width: '90%',
                  marginTop: 20,
                }}
              />

              <TouchableOpacity
              // onPress={() => this.props.navigation.navigate('forgotpassword')}
              >
                <CustomText
                  txt={'Terms and Conditions'}
                  type={'heading'}
                  fontSize={10}
                  textColor={'white'}
                  customStyle={{
                    marginVertical: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {loading ? <Spinner /> : null}
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.main.userData,
    userLocation: state.main.userLocation,
  };
};
export default connect(mapStateToProps)(PharmacySignup);
