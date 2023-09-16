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

class TransctionHistoryUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      userLocation: this.props.userLocation,
      loading: false,
      data: [],
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
            {item.wallet_detail_type != 0 ? item.wallet_detail_desc : 'Top UP'}
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
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getTransction();
    });
  }

  componentWillUnmount() {
    this.focusListener();
  }

  getTransction() {
    const {userData} = this.state;

    this.setState({
      loading: true,
    });

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
          title="Sehat Wallet"
          showBack={true}
          onRightPress={() => {
            this.onRightPress();
          }}
          // addTrans={true}
          onLeftPress={() => {
            this.props.navigation.goBack();
          }}
        />

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
              flexDirection: 'row',
              // backgroundColor: 'red',
            }}>
            <View style={{flex: 1}}>
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
            <View
              style={{
                backgroundColor: Constants.Colors.primaryBlue,
                width: 100,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <Text style={{color: 'white'}}>Pay 200</Text>
              </TouchableOpacity>
            </View>
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
            <FlatList
              data={this.state.data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderRequest}
              scrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
            <View style={{alignItems: 'flex-end'}}>
              <View style={styles.totalWrapper}>
                <Text style={{color: 'white', fontSize: 18, paddingRight: 10}}>
                  Balance : {this.state.total}/-
                </Text>
              </View>
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
  };
};
export default connect(mapStateToProps)(TransctionHistoryUser);
