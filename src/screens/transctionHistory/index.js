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
      total: 0,
      request: [],
      balance: 0,
      activeTab: 0,
      searchText: '',
      prescriptionId: 0,
      // item: props.navigation.state.params.item || {},
    };
    // console.log('Medicals _', this.state.userData);
  }

  _renderRequest = ({item, index}) => {
    const {balance} = this.state;
    console.log('_balance_', balance);
    var ref = '';
    var ref2 = '';
    var temp = balance;
    // signup_contact;
    var statusText = 'Topup';
    var amount = 0;
    if (item.wallet_detail_type == 0) {
      ref = item.signup_firstname + ' ' + item.signup_lastname;
      temp += parseInt(item.wallet_detail_amount);
    } else {
      ref = 'Sehat Connection';
      // balance -= item.wallet_detail_amount;
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

          {item.wallet_detail_type == 0 ? (
            <Text>{item.signup_contact}</Text>
          ) : null}
          <Text style={styles.invoicetxt}>{ref}</Text>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.invoicetxt} />
          {/* <Text style={styles.invoicetxt}>Balance : {temp}</Text> */}
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
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.getTransction();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  getTransction() {
    const {userData} = this.state;

    this.setState({
      loading: true,
    });

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
    this.props.navigation.navigate('AddTransction', {total: this.state.total});
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
          onRightPress={() => {}}
          // addTrans={true}
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
          <View style={styles.desContainer}>
            <View style={styles.bannerStyle}>
              <Text style={styles.pharmacyheading}>Rehan Medicos</Text>
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
                <Image
                  source={Constants.wallet_money}
                  style={styles.bannerIcon}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 10,
                    alignItems: 'flex-start',
                    // borderWidth: 1,
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
                    -{this.state.total} Rs.
                  </Text>
                </View>
                <TouchableOpacity onPress={() => this.onRightPress()}>
                  <View
                    style={{
                      width: 120,
                      // marginLeft: 20,
                      height: 40,
                      marginRight: 10,
                      borderRadius: 7,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      backgroundColor: Constants.Colors.primaryGreen,
                    }}>
                    <Text style={{color: 'white'}}>Add Top up</Text>
                    <AntDesign
                      name="doubleright"
                      type="AntDesign"
                      style={styles.suggestionAdd}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={[styles.nameHeadingStyle, {marginVertical: 15}]}>
                  Transection History
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
            {/* <View style={{alignItems: 'flex-end'}}>
              <View style={styles.totalWrapper}>
                <Text style={{color: 'white', fontSize: 18, paddingRight: 10}}>
                  Balance : {this.state.total}/-
                </Text>
              </View>
            </View> */}
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
