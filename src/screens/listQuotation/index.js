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

// import {NavigationActions, StackActions} from 'react-navigation';

import {
  Header,
  Heading,
  CustomCalendar,
  RoundedButton,
  SuggestionInput,
  Renderdoctors,
} from '../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Entypo from "react-native-vector-icons/Entypo";

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';

class ListQuotation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      userLocation: this.props.userLocation,
      loading: false,
      data: [],
      request: [],
      loading: true,
      activeTab: 0,
      searchText: '',
      prescriptionId: 0,
      // item: props.navigation.state.params.item || {},
    };
    // console.log('Medicals _', this.state.userData);
  }

  componentWillUnmount() {
    // this.focusListener.remove();
    this._unsubscribe();
  }

  componentDidMount() {
    const {userLocation} = this.state;

    console.log('userLocation', userLocation);

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getQuotationList();
    });
  }

  getQuotationList() {
    const {request = [], prescriptionId = '', userData} = this.state;

    console.log('userData__', userData);

    var payload = new FormData();
    payload.append('request_pharmacy_userid', userData.signup_id);
    Services.post('get_qoutation_request_by_user', {}, payload, true)
      .then(responseJson => {
        console.log('get_qoutation_request_by_user', responseJson);
        if (responseJson.status == 1) {
          this.setState({
            request: responseJson.data,
            loading: false,
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

  _renderRequest = ({item, index}) => {
    var tempstart = 'pm';
    var timeStart = parseInt(item.pharmacy_time_start);
    if (timeStart < 1200) {
      tempstart = 'am';
      timeStart = timeStart / 100;
    } else {
      timeStart = timeStart - 1200;
      timeStart = timeStart / 100;
    }

    var tempend = 'pm';
    var timEnds = parseInt(item.pharmacy_time_ends);
    if (timEnds < 1200) {
      tempend = 'am';
      timEnds = timEnds / 100;
    } else {
      timEnds = timEnds - 1200;
      timEnds = timEnds / 100;
    }

    // var arrowIcon = Constants.Colors.primaryBlue;
    // item.request_pharmacy_request_status == 2
    //   ? (arrowIcon = Constants.primaryGreen)
    //   : null;

    return (
      <View style={styles.requestContainer}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 80,
              height: 30,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Constants.Colors.primaryGreen,
            }}>
            <Text style={{color: 'white'}}>
              R-{index + 1} / {item.request_pharmacy_consult_id}
            </Text>
          </View>
          <Text style={styles.pharmacyName}>{item.pharmacy_name}</Text>
        </View>

        <Text style={styles.pharmacyDesc} numberOfLines={1}>
          {item.pharmacy_auto_complete}
        </Text>
        {/* <Text style={styles.pharmacyDesc}>
          {timeStart.toFixed(2) + ' ' + tempstart + ' '} -
          {' ' + timEnds.toFixed(2) + ' ' + tempend}
        </Text> */}
        {item.available_percent != 0 ? <View style={styles.breakLIne} /> : null}

        <View style={styles.flexDirectStyl}>
          <View style={{flex: 1}}>
            <View style={styles.flexDirectStyl}>
              {item.available_percent != 0 ? (
                <View style={{flexDirection: 'row'}}>
                  <Text>Stock Availability = </Text>
                  <Text>{item.available_percent + ' %'}</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.flexDirectStyl}>
              {item.total_amount != 0 ? (
                <View style={{flexDirection: 'row'}}>
                  <Text>Invoice Total = </Text>
                  <Text>{item.request_pharmacy_total}</Text>
                </View>
              ) : null}
            </View>
          </View>
          {item.request_pharmacy_request_status != 0 ? (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('QuotationDetail', {
                  item: item,
                });
              }}
              style={{
                width: 65,
                justifyContent: 'center',
                alignItems: 'flex-end',
                // backgroundColor: 'yellow',
                height: 45,
              }}>
              <Entypo
                type="Entypo"
                name="arrow-bold-right"
                style={[
                  styles.arrowIcon,
                  {
                    color:
                      item.request_pharmacy_request_status == 2
                        ? Constants.Colors.primaryGreen
                        : Constants.Colors.primaryBlue,
                  },
                ]}
              />
              {item.request_pharmacy_request_status == 2 ? (
                <Text
                  style={{fontSize: 8, color: Constants.Colors.primaryGreen}}>
                  Order Placed
                </Text>
              ) : null}
              {item.request_pharmacy_request_status == 4 ? (
                <Text
                  style={{fontSize: 8, color: Constants.Colors.primaryGreen}}>
                  Order is ready
                </Text>
              ) : null}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

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
          title="List of Orders"
          showBack={true}
          // showShare={true}
          onRightPress={() => {}}
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
            <FlatList
              data={this.state.request}
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
export default connect(mapStateToProps)(ListQuotation);
