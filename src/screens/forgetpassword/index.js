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
// import {StackActions, NavigationActions} from 'react-navigation';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import Services from '../../apis/services';

class Forgetpassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      phone: '03',
      code: '',
      email: '',
      password: '',
      isCode: true,
      securePass: true,
      loading: false,
      isPassword: false,
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
    // var obj = {}
    // this.props.dispatch({
    //   type: "USER_DATA",
    //   payload: obj
    // })
  };

  resetView = (screenName = '') => {
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({routeName: screenName})],
    // });
    // this.props.navigation.dispatch(resetAction);
    
  };

  onPressUpdatePassword = () => {
    const {code, phone, password} = this.state;

    if (password == '') {
      Utils.showToastMessage('Password cannot be empty', 'danger');
      return;
    } else {
      this.setState({loading: true});
      var token = '';
      var payload = new FormData();
      payload.append('signup_contact', phone);
      payload.append('signup_token', code);
      payload.append('signup_password', password);
      console.log('payload', payload);

      Services.post('update_forget_password', {}, payload, true)
        .then(responseJson => {
          // console.log('responseJson update_forget_password ', responseJson);
          this.setState({
            loading: false,
          });

          if (responseJson.status == 0) {
            this.setState({password: ''});
            Utils.showToastMessage('Password not updated.');
          } else {
            Utils.showToastMessage('Password updated successfully');

            var routeName = 'Login';
            const resetAction = StackActions.reset({
              index: 0,
              actions: [StackActions.reset({routeName: routeName})],
            });
            this.props.navigation.dispatch(resetAction);
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
  onPressCode = () => {
    const {code, phone} = this.state;

    if (code.length < 4) {
      Utils.showToastMessage('Code cannot be less than 4 digits', 'danger');
      return;
    } else {
      this.setState({loading: true});
      var token = '';
      var payload = new FormData();
      payload.append('signup_contact', phone);
      payload.append('signup_token', code);

      Services.post('check_code', {}, payload, true)
        .then(responseJson => {
          console.log('responseJson check_code ', responseJson);
          this.setState({
            loading: false,
          });

          if (responseJson.status == 0) {
            // this.setState({ code: '' })
            Utils.showToastMessage(responseJson.txt);
          } else {
            Utils.showToastMessage('Enter new password');
            this.setState({
              isPassword: true,
            });
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

  onSendCode = () => {
    const {fname, lname, phone} = this.state;

    if (phone.length < 11) {
      Utils.showToastMessage('Phone cannot be less than 11 digits', 'danger');
      return;
    } else {
      this.setState({loading: true});
      var token = '';

      var payload = new FormData();
      payload.append('phone', phone);
      Services.post('forgetpassword', {}, payload, true)
        .then(responseJson => {
          // console.log('responseJson forgetpassword ', responseJson);

          this.setState({
            loading: false,
          });

          if (responseJson.status == 0) {
            Utils.showToastMessage(responseJson.txt);
          } else {
            Utils.showToastMessage(responseJson.txt);
            // this.props.navigation.navigate('App');
            this.setState({
              isCode: false,
            });
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
    const {
      securePass,
      loading = false,
      isCode = false,
      isPassword = false,
    } = this.state;
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
                  <Heading txt={'Forgetpassword'} type={'large'} />
                </View>
                <View style={mainStyle.loginContainer}>
                  {isCode ? (
                    <View>
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
                          this._onSubmitEditing('phone', null)
                        }
                      />

                      <View style={{marginTop: 20}}>
                        <RoundedButton
                          text="Send Code"
                          textColor={'white'}
                          fontsize={22}
                          customStyle={mainStyle.loginBtn}
                          handleOnPress={() => {
                            this.onSendCode();
                          }}
                        />
                      </View>
                    </View>
                  ) : isPassword ? (
                    <View>
                      <LoginInput
                        icon={
                          <Icon
                            name="lock"
                            type="SimpleLineIcons"
                            style={mainStyle.inputLoginIconStyle}
                          />
                        }
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
                          text="Update Password"
                          textColor={'white'}
                          fontsize={22}
                          customStyle={mainStyle.loginBtn}
                          handleOnPress={() => {
                            this.onPressUpdatePassword();
                          }}
                        />
                      </View>
                    </View>
                  ) : (
                    <View>
                      <LoginInput
                        icon={
                          <Icon
                            name="envelope-o"
                            type="FontAwesome"
                            style={mainStyle.inputLoginIconStyle}
                          />
                        }
                        placeholder="Enter Code"
                        inputRef={'code'}
                        ref={'code'}
                        maxLength={4}
                        label={'4 digit Code'}
                        keyboard={Constants.Keyboard.phone}
                        value={this.state.code}
                        returnKeyType={'next'}
                        onChangeText={code => this.setState({code})}
                        onSubmitEditing={() =>
                          this._onSubmitEditing('code', null)
                        }
                      />

                      <View style={{marginTop: 20}}>
                        <RoundedButton
                          text="Submit code"
                          textColor={'white'}
                          fontsize={22}
                          customStyle={mainStyle.loginBtn}
                          handleOnPress={() => {
                            this.onPressCode();
                          }}
                        />
                      </View>
                    </View>
                  )}

                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}
                  />
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
  };
};
export default connect(mapStateToProps)(Forgetpassword);
