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
  Header,
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

class UserPharmacy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: this.props.userLocation,
      userData: this.props.userData,
      fname: '',
      lname: '',
      phone: '03',
      email: '',

      pharmacyName: '',
      pharmacyAddress: '',
      pharmacyLicense: '',
      pharmacyCity: '',
      pharmacyState: '',

      password: '',
      securePass: true,
      loading: false,
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

  addUserPharmacy = id => {
    const {
      pharmacyName,
      pharmacyAddress,
      pharmacyLicense,
      pharmacyCity = '',
      pharmacyState = '',
      userLocation,
      userData,
    } = this.state;

    // console.log('userData user');

    // return false;

    var routeName;
    this.setState({loading: true});
    var token = '';

    var payload = new FormData();
    payload.append('user_pharmacy_pharmacyid', userData.pharmacy_id);
    payload.append('user_pharmacy_userid', id);

    Services.post('save_user_pharmacy', {}, payload, true)
      .then(responseJson => {
        console.log('pharmacy_signup_responseJson', responseJson);
        this.setState({
          loading: false,
        });

        if (responseJson.status == 0) {
          Utils.showToastMessage('Network Erro.');
        } else {
          Utils.showToastMessage('Registeration is done successfully');
          this.props.navigation.goBack();

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
      payload.append('signup_type', Utils.getUserType());

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
            this.addUserPharmacy(responseJson.signup_id);
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
    const {securePass, loading = false} = this.state;
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
                <Header
                  title="Add Member"
                  showBack={true}
                  onLeftPress={() => {
                    this.props.navigation.goBack();
                  }}
                />

                <View style={mainStyle.loginContainer}>
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

                  <View style={{marginTop: 20}}>
                    <RoundedButton
                      text="Add Member"
                      textColor={'white'}
                      fontsize={22}
                      customStyle={mainStyle.loginBtn}
                      handleOnPress={() => {
                        this.onPressSignup();
                      }}
                    />
                  </View>
                </View>
              </LinearGradient>
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
export default connect(mapStateToProps)(UserPharmacy);
