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
// import * as Animatable from 'react-native-animatable';
// import {debounce, set} from 'lodash';
// // import {Icon} from 'native-base';
// import {NavigationActions, StackActions} from 'react-navigation';
// import { Icon } from 'native-base';
import {
  Header,
  Heading,
  CustomCalendar,
  RoundedButton,
  SuggestionInput,
  Renderdoctors,
} from '../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';

class TransctionHistoryUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      userLocation: this.props.userLocation,
      loading: false,
      data: [],
      coupon_name: '',
      total: 0,
      request: [],
      activeTab: 0,
      searchText: '',
      prescriptionId: 0,
      // item: props.navigation.state.params.item || {},
    };
    // console.log('Medicals _', this.state.userData);
  }

  _renderRequest = ({item, index}) => {
    // console.log('_item_', item);
    var ref = '';
    var statusText = 'Debited';
    if (item.wallet_detail_type == 0) {
      ref = item.pharmacy_name;
      statusText = 'Credited';
    } else {
      ref = 'Sehat Connection';
    }

    return (
      <View style={styles.requestContainer}>
        <View style={{flex: 2}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.invoicenumber}>
              00{item.wallet_detail_id}) {item.wallet_detail_createdon}
            </Text>
          </View>
          <Text style={styles.invoicetxt}>{ref}</Text>
        </View>

        <View style={{flex: 1}}>
          <Text style={{fontSize: 10, color: 'black'}}>
            {/* {item.wallet_detail_type != 0 ? item.wallet_detail_desc : 'Top UP'} */}
            {item.wallet_detail_desc}
          </Text>
          <Text
            style={[
              styles.debittxt,
              {
                color: item.wallet_detail_type != 0 ? 'red' : 'green',
              },
            ]}>
            {statusText} : {item.wallet_detail_amount}
          </Text>
        </View>
      </View>
    );
  };

  componentDidMount() {
    // this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.getTransction();
    // });
  }

  onPressApplyCoupon() {
    const {userData, coupon_name} = this.state;

    if (coupon_name == '') {
      Utils.showToastMessage('Please enter coupon code');
      return false;
    }
    this.setState({
      loading: true,
    });

    var payload = new FormData();
    payload.append('coupon_name', coupon_name);
    payload.append('verify_coupon_user_id', userData.signup_id);
    Services.post('verify_coupon', {}, payload, true)
      .then(responseJson => {
        //
        console.log('going for transcation add');
        //

        if (responseJson.status == 1) {
          var payload = new FormData();
          payload.append('pharmacy_id', 544);
          payload.append('mobilenumber', userData.signup_contact);
          payload.append('amount', responseJson.data.coupon_amount);
          payload.append('wallet_detail_type', 0);
          payload.append('wallet_detail_desc', 'Coupon : ' + coupon_name);
          Services.post('use_wallet_trans', {}, payload, true)
            .then(responseJson => {
              console.log('use_wallet_trans_esponseJson', responseJson);
              this.getTransction();
              this.setState({
                coupon_name: '',
              });

              alert('Coupon Applied Successfully.');
            })
            .catch(error => {
              alert('Invalid Coupon code');
            });
        } else if (responseJson.status == 2) {
          this.setState({
            loading: false,
          });
          alert('Already Used');
        } else {
          this.setState({
            loading: false,
          });
          alert('Invalid Coupon code');
        }
      })
      .catch(error => {
        console.log('_error', error);
        this.setState({
          loading: false,
        });
        alert('Invalid Coupon code');
      });
  }

  componentWillUnmount() {
    // this.focusListener.remove();
  }

  getTransction() {
    const {userData} = this.state;

    // this.setState({
    //   loading: true,
    // });

    var payload = new FormData();
    // payload.append('pharmacy_id', userData.pharmacy_id);
    payload.append('signup_id', userData.signup_id);
    Services.post('get_transction_history', {}, payload, true)
      .then(responseJson => {
        var total = 0;
        responseJson.data.map(value => {
          // console.log('_value_', value);
          if (value.wallet_detail_type == 0) {
            total += parseInt(value.wallet_detail_amount);
          } else {
            total -= parseInt(value.wallet_detail_amount);
          }
        });

        this.setState({
          data: responseJson.data.reverse(),
          total,
          loading: false,
        });
      })
      .catch(error => {
        console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }

  onRightPress() {
    this.props.navigation.navigate('AddTransction');
  }

  render() {
    const {
      loading,
      activeTab,
      data,
      loadsData = [],
      showDatePicker,
      dateTimeModalType,
      request = [],
    } = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title="Sehat Wallet "
          showBack={true}
          onRightPress={() => {
            this.onRightPress();
          }}
          // addTrans={true}
          onLeftPress={() => {
            this.props.navigation.goBack();
            // this.props.navigation.goBack();
            // this.props.navigation.dispatch(NavigationActions.back())
          }}
        />

        <View
          style={{
            height: 70,
            width: '100%',
            justifyContent: 'center',
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 1, paddingHorizontal: 10}}>
              <TextInput
                style={styles.numberInputStyle}
                onChangeText={text => {
                  this.setState({coupon_name: text});
                }}
                onSubmitEditing={() => {
                  // onSubmitEditing = {onSubmitEditing};
                  // this.onPressSearchMemberBtn();
                }}
                placeholder="Coupon code"
                value={this.state.coupon_name}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                // this.props.navigation.navigate('');
                this.onPressApplyCoupon();
              }}>
              <View style={styles.totalWrapper}>
                <Text style={{color: 'white', fontSize: 18, paddingRight: 10}}>
                  Apply Coupon
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bannerStyle}>
          <View
            style={{
              paddingHorizontal: 30,
              flexDirection: 'row',

              justifyContent: 'space-between',
            }}>
            <Image
              source={Constants.wallet_banner_icon}
              style={styles.bannerIcon}
            />
            <View style={{flex: 1}} />
            <Image source={Constants.wallet_money} style={styles.bannerIcon} />
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 10,
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                color: Constants.Colors.primaryGreen,
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Wallet Balance
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: Constants.Colors.primaryBlue,
              }}>
              {this.state.total} Rs.
            </Text>
          </View>
        </View>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Constants.Colors.backgrounGrey,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.desContainer}>
            <View style={{alignItems: 'flex-end', marginBottom: 20}}>
              <View style={styles.totalWrapper}>
                <Text style={{color: 'white', fontSize: 18, paddingRight: 10}}>
                  Balance : {this.state.total}/-
                </Text>
              </View>
            </View>
            <FlatList
              data={this.state.data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderRequest}
              scrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
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
  };
};
export default connect(mapStateToProps)(TransctionHistoryUser);
