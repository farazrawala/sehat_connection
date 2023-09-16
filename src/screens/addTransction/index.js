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
// import {Icon} from 'native-base';
import {NavigationActions, StackActions} from 'react-navigation';
// import { Icon } from 'native-base';
import {
  Header,
  Heading,
  CustomCalendar,
  RoundedButton,
  SuggestionInput,
  CustomCheckBox,
  Renderdoctors,
} from '../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';

class TransctionHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      userLocation: this.props.userLocation,
      loading: false,
      data: [],
      request: [],
      verifyUser: {},
      mobilenumber: '03',
      amount: 0,
      loading: false,
      activeTab: 0,
      searchText: '',
      prescriptionId: 0,
      isVerifyUser: false,
      amountId: 0,
      amountReadOnly: true,
      total: this.props.route.params.total || 0,
    };
    // console.log('total_');
  }

  _renderRequest = ({item, index}) => {
    console.log('_item_', item);
    var ref = '';
    var statusText = 'Debited';
    if (item.wallet_detail_type == 0) {
      ref = item.signup_firstname + ' ' + item.signup_lastname;
    } else {
      ref = 'Sehat Connection';
      statusText = 'Credited';
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
          <Text style={styles.invoicetxt} />
          <Text
            style={[
              styles.debittxt,
              {
                color: item.wallet_detail_type == 0 ? 'red' : 'green',
              },
            ]}>
            {statusText} : {item.wallet_detail_amount}
          </Text>
        </View>
      </View>
    );
  };

  componentDidMount() {
    this.getTransction();
  }

  getTransction() {
    const {userData} = this.state;

    var payload = new FormData();
    payload.append('pharmacy_id', userData.pharmacy_id);
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
          data: responseJson.data,
          total,
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

  onVerify() {
    const {mobilenumber, userData, amount} = this.state;

    if (amount == '') {
      Utils.showToastMessage('Please enter amount', 'danger');
      return;
    }

    if (mobilenumber.length != 11) {
      Utils.showToastMessage('Invalid mobile number', 'danger');
      return;
    }

    this.setState({
      loading: true,
    });

    var payload = new FormData();
    payload.append('pharmacy_id', userData.pharmacy_id);
    payload.append('mobilenumber', mobilenumber);
    payload.append('amount', amount);
    Services.post('transction_verify_user', {}, payload, true)
      .then(responseJson => {
        console.log('responseJson', responseJson.data);
        if (responseJson.status == true) {
          this.setState({
            verifyUser: responseJson.data,
            isVerifyUser: true,
          });
          Keyboard.dismiss();
        } else {
          Utils.showToastMessage('User not found', 'danger');
          // return;
        }
        this.setState({
          loading: false,
        });
        // this.props.navigation.goBack();
      })
      .catch(error => {
        console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }

  onBtnPress() {
    const {mobilenumber, userData, amount} = this.state;

    if (amount == '') {
      Utils.showToastMessage('Please enter amount', 'danger');
      return;
    }

    if (mobilenumber.length != 11) {
      Utils.showToastMessage('Invalid mobile number', 'danger');
      return;
    }

    this.setState({
      loading: true,
    });

    var payload = new FormData();
    payload.append('pharmacy_id', userData.pharmacy_id);
    payload.append('mobilenumber', mobilenumber);
    payload.append('amount', amount);
    Services.post('add_transction_pharmacy', {}, payload, true)
      .then(responseJson => {
        console.log('responseJson', responseJson);
        this.setState({
          loading: false,
        });
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const {
      loading,
      activeTab,
      data,
      loadsData = [],
      showDatePicker,
      dateTimeModalType,
      amountId,
      amountReadOnly,
      isVerifyUser,
      request = [],
    } = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title="Add Balance"
          showBack={true}
          onLeftPress={() => {
            this.props.navigation.goBack();
          }}
        />

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Constants.Colors.backgrounGrey,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <Image
                source={Constants.online_pharmacy_banner}
                style={styles.bannerStyle}
              />
            </View>
          </View>

          <View style={styles.desContainer}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={[styles.nameHeadingStyle, {marginVertical: 0}]}>
                  Amount
                </Text>
              </View>
            </View>

            <View style={{width: '100%', alignItems: 'flex-start'}}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    amountReadOnly: false,
                    amountId: 200,
                    amount: 200,
                  })
                }
                style={styles.suggestionWrapper}>
                <View style={{width: 50}}>
                  <CustomCheckBox
                    isDropdown={false}
                    compType={'mapInput'}
                    inputPlaceHoler={''}
                    rightText="200 Rupees"
                    labelCustomStyle={
                      {
                        // color: Constants.Colors.primaryBlue,
                        // marginTop: -20,
                      }
                    }
                    value={amountId == 200 ? true : false}
                  />
                </View>
                <Text style={styles.medicineStyle}>200 Rupees</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    amountReadOnly: false,
                    amountId: 500,
                    amount: 500,
                  })
                }
                style={styles.suggestionWrapper}>
                <View style={{width: 50}}>
                  <CustomCheckBox
                    isDropdown={false}
                    compType={'mapInput'}
                    inputPlaceHoler={''}
                    rightText="500 Rupees"
                    labelCustomStyle={
                      {
                        // color: Constants.Colors.primaryBlue,
                        // marginTop: -20,
                      }
                    }
                    value={amountId == 500 ? true : false}
                    // value={dosageId == item.dosage_id ? true : false}
                  />
                </View>
                <Text style={styles.medicineStyle}>500 Rupees</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    amountId: 1000,
                    amount: 1000,
                    amountReadOnly: false,
                  })
                }
                style={styles.suggestionWrapper}>
                <View style={{width: 50}}>
                  <CustomCheckBox
                    isDropdown={false}
                    compType={'mapInput'}
                    inputPlaceHoler={''}
                    rightText="1000 Rupees"
                    labelCustomStyle={
                      {
                        // color: Constants.Colors.primaryBlue,
                        // marginTop: -20,
                      }
                    }
                    value={amountId == 1000 ? true : false}
                  />
                </View>
                <Text style={styles.medicineStyle}>1000 Rupees</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState(
                    {
                      amountId: 5000,
                      amount: 5000,
                      amountReadOnly: false,
                    },
                    console.log('_Amount_', this.state.amount),
                  );
                }}
                style={styles.suggestionWrapper}>
                <View style={{width: 50}}>
                  <CustomCheckBox
                    isDropdown={false}
                    compType={'mapInput'}
                    inputPlaceHoler={''}
                    rightText="5000 Rupees"
                    labelCustomStyle={
                      {
                        // color: Constants.Colors.primaryBlue,
                        // marginTop: -20,
                      }
                    }
                    value={amountId == 5000 ? true : false}
                  />
                </View>
                <Text style={styles.medicineStyle}>5000 Rupees</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    amountId: 0,
                    amountReadOnly: true,
                  })
                }
                style={styles.suggestionWrapper}>
                <View style={{width: 50}}>
                  <CustomCheckBox
                    isDropdown={false}
                    compType={'mapInput'}
                    inputPlaceHoler={''}
                    rightText="Other Amount"
                    value={amountId == 0 ? true : false}
                  />
                </View>
                <Text style={styles.medicineStyle}>Other Amount</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrapper}>
                {!amountReadOnly ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      flex: 1,
                      width: '100%',
                      paddingHorizontal: 20,
                    }}>
                    <Text>{this.state.amount}</Text>
                  </View>
                ) : (
                  <TextInput
                    style={styles.searchInput}
                    onChangeText={text => {
                      this.setState({amount: text});
                    }}
                    maxLength={11}
                    placeholder="Enter Amount"
                    editable={amountReadOnly}
                    returnKeyType="done"
                    keyboardType="number-pad"
                    value={this.state.amount}
                    defaultValue={this.state.amount}
                  />
                )}
              </View>
            </View>

            {/* isVerifyUser */}

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={[styles.nameHeadingStyle, {marginVertical: 0}]}>
                  Mobile Number
                </Text>
              </View>
            </View>

            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrapper}>
                <TextInput
                  style={styles.searchInput}
                  onChangeText={text => {
                    this.setState({mobilenumber: text}, () => {
                      if (text.length == 11) {
                        this.onVerify();
                      }
                    });
                  }}
                  maxLength={11}
                  placeholder="Mobile Number"
                  returnKeyType="done"
                  keyboardType="number-pad"
                  value={this.state.mobilenumber}
                />
              </View>
            </View>

            {isVerifyUser ? (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styles.nameHeadingStyle,
                        {marginVertical: 0, color: 'black', fontSize: 15},
                      ]}>
                      {this.state.verifyUser.signup_firstname}{' '}
                      {this.state.verifyUser.signup_lastname}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    flex: 1,
                    width: '100%',
                    // paddingHorizontal: ,
                  }}>
                  <Text
                    style={{fontSize: 20, color: Constants.Colors.primaryBlue}}
                  />
                </View>
              </View>
            ) : null}

            {isVerifyUser ? (
              <View style={{alignItems: 'flex-end'}}>
                <View style={styles.totalWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      this.onBtnPress();
                    }}>
                    <Text
                      style={{color: 'white', fontSize: 16, paddingRight: 10}}>
                      Topup >>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
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
export default connect(mapStateToProps)(TransctionHistory);
