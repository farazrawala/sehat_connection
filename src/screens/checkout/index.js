import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  TextInput,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  ScrollView,
  StatusBar,
  Animated,
  Alert,
} from 'react-native';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import {debounce, set} from 'lodash';
import {Icon} from 'native-base';
import {NavigationActions, StackActions} from 'react-navigation';
// import { Icon } from 'native-base';
import {Header, RoundedButton, LoginInput} from '../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// const {width, height} = Dimensions.get('window');

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      userLocation: this.props.userLocation,
      cartData: this.props.cartData,
      loading: false,
      data: [],
      request: [],
      activeTab: 0,
      searchText: '',
      prescriptionId: 0,
      fname: '',
      lname: '',
      email: '',
      companyname: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      // item: props.navigation.state.params.item || {},
    };
  }

  _onSubmitEditing(curr, next) {
    if (next != null) {
      this.refs[next].refs[next].focus();
    } else if (next == null || next == '') {
      Keyboard.dismiss();
    } else {
      this.refs[curr].refs[curr].blur();
    }
  }
  componentDidMount() {}

  onSubmit() {
    const {
      fname = '',
      lname = '',
      email = '',
      discount = 0,
      companyname = '',
      address = '',
      city = '',
      state = '',
      zip = '',
      cartData = [],
      phone = '',
    } = this.state;

    if (fname == '') {
      Utils.showToastMessage('First name field is required', 'danger');
    } else if (lname == '') {
      Utils.showToastMessage('Last name field is required', 'danger');
    } else if (email == '') {
      Utils.showToastMessage('Email field is required', 'danger');
    } else if (address == '') {
      Utils.showToastMessage('Adress field is required', 'danger');
    } else if (city == '') {
      Utils.showToastMessage('City field is required', 'danger');
    } else if (state == '') {
      Utils.showToastMessage('State field is required', 'danger');
    } else if (zip == '') {
      Utils.showToastMessage('Zip code field is required', 'danger');
    } else if (phone == '') {
      Utils.showToastMessage('Phone number field is required', 'danger');
    } else {
      this.setState({
        loader: true,
      });

      Keyboard.dismiss();
      var payload = new FormData();
      payload.append('billing[first_name]', fname);
      payload.append('billing[last_name]', lname);
      payload.append('billing[address_1]', address);
      payload.append('billing[city]', city);
      payload.append('billing[state]', state);
      payload.append('billing[postcode]', zip);

      payload.append('billing[email]', email);
      payload.append('billing[phone]', phone);

      // payload.append("discount_total", cartDiscount);

      if (!utils.isEmpty(utils.getValidCoupon())) {
        var coupon = utils.getValidCoupon();
        payload.append('coupon_lines[0][code]', coupon.code);
      }

      cartData.map((product, index) => {
        payload.append('line_items[' + index + '][product_id]', product.id);
        payload.append('line_items[' + index + '][quantity]', product.qty);
      });

      console.log('Payloiad', payload);

      Services.post(
        'wp-json/wc/v3/orders',
        {Authorization: 'Bearer ' + utils.getWpToken()},
        payload,
        true,
      )
        .then(responseJson => {
          console.log('orders ', responseJson);
          utils.showToastMessage(
            'You details has been save successfully.',
            'success',
          );
          this.props.navigation.navigate('Paynow');

          this.setState({
            loader: false,
          });
        })
        .catch(error => {
          utils.showToast('Please check your internet connection');
          this.setState({
            loader: false,
          });
        });
    }
  }
  render() {
    const {
      fname,
      lname,
      companyname,
      address,
      city,
      state,
      zip,
      phone,
      email,
      loading,
      activeTab,
      data,
      loadsData = [],
      cartData = [],
      showDatePicker,
      dateTimeModalType,
      request = [],
    } = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title="Checkout"
          showBack={true}
          showCart={true}
          cartBadge={cartData.length}
          onRightPress={() => {
            this.props.navigation.navigate('Checkout');
          }}
          onLeftPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.desContainer}>
            <View style={styles.productContainer}>
              <LoginInput
                // icon={<Icon name="envelope-o" type="FontAwesome" style={styles.inputIconStyle} />}
                placeholder="First Name"
                inputRef={'fname'}
                ref={'fname'}
                label={'First Name'}
                value={fname}
                returnKeyType={'next'}
                onChangeText={fname => this.setState({fname})}
                onSubmitEditing={() => this._onSubmitEditing('fname', 'lname')}
              />

              <LoginInput
                // icon={<Icon name="envelope-o" type="FontAwesome" style={styles.inputIconStyle} />}
                placeholder="Last Name"
                inputRef={'lname'}
                label={'Last Name'}
                value={lname}
                ref={'lname'}
                returnKeyType={'next'}
                onChangeText={lname => this.setState({lname})}
                onSubmitEditing={() => this._onSubmitEditing('lname', 'email')}
              />
              {/* 
              <LoginInput
                // icon={<Icon name="envelope-o" type="FontAwesome" style={styles.inputIconStyle} />}
                placeholder="Email Address"
                inputRef={'email'}
                ref={'email'}
                label={'Email Address'}
                value={email}
                returnKeyType={'next'}
                onChangeText={email => this.setState({email})}
                onSubmitEditing={() =>
                  this._onSubmitEditing('email', 'address')
                }
              /> */}

              {/* 
                <LoginInput
                  // icon={<Icon name="envelope-o" type="FontAwesome" style={styles.inputIconStyle} />}
                  placeholder="Company Name"
                  inputRef={'email'}
                  ref={'companyname'}
                  label={"Company Name"}
                  value={companyname}
                  returnKeyType={"next"}
                  onChangeText={(companyname) => this.setState({ companyname })}
                  onSubmitEditing={() => this._onSubmitEditing('companyname', 'address')}
                /> */}

              <LoginInput
                // icon={<Icon name="envelope-o" type="FontAwesome" style={styles.inputIconStyle} />}
                placeholder="Street Address"
                inputRef={'address'}
                ref={'address'}
                label={'Street Address'}
                value={address}
                returnKeyType={'next'}
                onChangeText={address => this.setState({address})}
                onSubmitEditing={() => this._onSubmitEditing('address', 'city')}
              />
              {/* 
              <LoginInput
                // icon={<Icon name="envelope-o" type="FontAwesome" style={styles.inputIconStyle} />}
                placeholder="City"
                inputRef={'city'}
                ref={'city'}
                label={'City'}
                value={city}
                returnKeyType={'next'}
                onChangeText={city => this.setState({city})}
                onSubmitEditing={() => this._onSubmitEditing('city', 'state')}
              />

              <LoginInput
                // icon={<Icon name="envelope-o" type="FontAwesome" style={styles.inputIconStyle} />}
                placeholder="State"
                inputRef={'state'}
                ref={'state'}
                label={'State'}
                value={state}
                returnKeyType={'next'}
                onChangeText={state => this.setState({state})}
                onSubmitEditing={() => this._onSubmitEditing('state', 'zip')}
              />

              <LoginInput
                // icon={<Icon name="envelope-o" type="FontAwesome" style={styles.inputIconStyle} />}
                placeholder="Zip"
                inputRef={'zip'}
                ref={'zip'}
                label={'Zip'}
                value={zip}
                returnKeyType={'next'}
                onChangeText={zip => this.setState({zip})}
                onSubmitEditing={() => this._onSubmitEditing('zip', 'phone')}
              /> */}

              <LoginInput
                // icon={<Icon name="envelope-o" type="FontAwesome" style={styles.inputIconStyle} />}
                placeholder="Phone"
                inputRef={'phone'}
                ref={'phone'}
                label={'Phone'}
                value={phone}
                returnKeyType={'next'}
                onChangeText={phone => this.setState({phone})}
                onSubmitEditing={() => this._onSubmitEditing('phone', null)}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 50,
              }}>
              <RoundedButton
                text="Proceed Order"
                textColor={'white'}
                fontsize={22}
                customStyle={{
                  width: '100%',
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  height: 40,
                  backgroundColor: Constants.Colors.primaryGreen,
                }}
                handleOnPress={() => this.onSubmit()}
              />
            </View>
          </View>
        </ScrollView>
        {Utils.showSpinner(loading)}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.main.userData,
    userLocation: state.main.userLocation,
    cartData: state.main.cartData,
  };
};
export default connect(mapStateToProps)(Checkout);
