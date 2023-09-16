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
import {getDistance} from 'geolib';
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

class QuotationPharmacy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      userLocation: this.props.userLocation,

      loading: true,
      data: [],
      pharamcies: [
        // {}, {}, {}
      ],
      activeTab: 0,
      searchText: '',
      prescriptionId: 0,
      // item: props.navigation.state.params.item || {},
    };
    console.log('Medicals _', this.state.userData);
  }
  get_api_data() {
    const {searchText = ''} = this.state;

    var payload = new FormData();
    // payload.append('request_pharmacy_pharmacyid', userData.user_pharmacy_id);
    Services.post('get_request_from_pharmacy', {}, payload, true)
      .then(responseJson => {
        // console.log('get_api_data', responseJson);

        if (responseJson.status == 1) {
          this.setState({
            data: responseJson.data,
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

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener();
  }

  componentDidMount() {
    // console.log('currentmedicines__', Utils.getconsultantMedicine());
    // this.get_api_data();
    const {userData} = this.state;

    console.log('userData', userData);

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getPrescription();
    });
  }

  getPrescription() {
    const {pharamcies = [], prescriptionId = '', userData} = this.state;

    // console.log('_userData_', userData);

    var payload = new FormData();
    payload.append('request_pharmacy_pharmacyid', userData.pharmacy_id);
    Services.post('get_request_from_pharmacy', {}, payload, true)
      .then(responseJson => {
        console.log('get_prescription', responseJson);

        if (responseJson.status == 1) {
          this.setState({
            pharamcies: responseJson.data,
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

  _renderListing = ({item, index}) => {
    const {activeTab} = this.state;
    return (
      <View style={{zIndex: 100}}>
        <View
          onPress={() => {
            // this.onPressTabActive(index);
          }}
          style={styles.sectionCotainer}>
          <View style={styles.iconWrapper}>
            {/* <Image
              source={Constants.scheduled_icon}
              style={styles.tabIconStyle}
            /> */}
            <Text style={styles.tokenStyle}>{item.consultation_token}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <View
              onPress={() => {
                // this.onPressTabActive(index);
                this.props.navigation.navigate('PatientProfile');
              }}>
              <Image source={Constants.men_avatar} style={styles.avatarStyle} />
            </View>
          </View>
          <View style={styles.centerTextWrapper}>
            <Text style={styles.tabTextStyle}>
              {/* {Utils.capitalizeFirstLetter(item.pharmacy_name)} */}
            </Text>
            <Text style={styles.dateTextStyle}>
              {item.pharmacy_auto_complete}{' '}
            </Text>
          </View>
          <View style={styles.iconWrapper} />
        </View>
      </View>
    );
  };

  onChangeText = text => {
    // if (text.length > 2) {
    //   this.setState({
    //     resultsVisible: false,
    //     searchText: text,
    //   });
    //   this.debounceHandler(text);
    // } else {
    //   this.setState({
    //     resultsVisible: true,
    //     searchText: text,
    //     locationPrediction: [],
    //     data: [],
    //   });
    // }
    // this.setState({});
  };

  onClickSuggestion(item) {
    const {addedMedicines = [], prescriptionId} = this.state;
    // addedMedicines.push(item);

    this.props.navigation.navigate('Medicine', {item, prescriptionId});
    this.setState({addedMedicines, data: [], searchText: ''});
    // Utils.setConsultantMedicine(addedMedicines);
  }
  onSearchClick() {
    const {searchText, prescriptionId} = this.state;

    if (searchText == '') {
      Utils.showToastMessage('Medicine name cannot be empty.');
      return false;
    }
    this.setState({
      loading: true,
    });
    var payload = new FormData();
    payload.append('medicine_name', searchText);
    Services.post('medicine_add', {}, payload, true)
      .then(responseJson => {
        console.log('medicine_add', responseJson);
        if (responseJson.status == 1) {
          this.setState({
            loading: false,
            searchText: '',
          });
          this.props.navigation.navigate('Medicine', {
            item: responseJson.data,
            prescriptionId,
          });
        }
      })
      .catch(error => {
        // console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }

  onPressDetail(item) {
    // const {item, userData} = this.state;
    // console.log(item);
    this.props.navigation.navigate('QuotationDetail', {
      item: item,
    });
  }
  _renderRequest = ({item, index}) => {
    const {userData, pharamcies = [], userLocation} = this.state;

    var color = 'orange';
    var statusText = 'Pending';
    if (item.request_pharmacy_request_status == 1) {
      color = Constants.Colors.primaryBlue;
      statusText = 'Quoted';
    } else if (item.request_pharmacy_request_status == 2) {
      color = Constants.Colors.primaryGreen;
      statusText = 'Approved';
    } else if (item.request_pharmacy_request_status == 3) {
      color = Constants.Colors.red;
      statusText = 'Cancel';
    } else if (item.request_pharmacy_request_status == 4) {
      color = Constants.Colors.primaryGreen;
      statusText = 'Ready';
    } else if (item.request_pharmacy_request_status == 5) {
      color = Constants.Colors.primaryGreen;
      statusText = 'Rider Arrived';
    } else if (item.request_pharmacy_request_status == 6) {
      color = Constants.Colors.primaryGreen;
      statusText = 'On the Way';
    } else if (item.request_pharmacy_request_status == 7) {
      color = Constants.Colors.primaryGreen;
      statusText = 'Delivered';
    }

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('QuotationDetail', {item});
        }}
        style={styles.medicineAddedWrapper}>
        <View
          style={{
            flex: 1,
            paddingRight: 5,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
            }}>
            <View style={styles.textNogb}>
              <Text style={styles.medicineTxtNO}>
                {pharamcies.length - index} - R {item.order_id} -{' '}
                {getDistance(
                  {
                    latitude: userData.pharmacy_lat,
                    longitude: userData.pharmacy_long,
                  },
                  {
                    latitude: item.request_pharmacy_lat,
                    longitude: item.request_pharmacy_long,
                    // latitude: 0,
                    // longitude: 0,
                  },
                ) / 1000}{' '}
                km
                {/* {item.request_pharmacy_id} */}
              </Text>
            </View>
            <Text>{item.request_pharmacy_createdon}</Text>
          </View>
          <View
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 0,
              width: 150,
              paddingLeft: 20,
              borderWidth: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 5,
                borderWidth: 0,
                paddingLeft: 10,
                width: 130,
                // backgroundColor: 'green',
                alignItems: 'center',
              }}>
              <View
                style={[styles.indicatingCircleStyle, {backgroundColor: color}]}
              />
              <View
                style={{
                  borderWidth: 0,
                  width: 80,
                }}>
                <Text style={{fontSize: 13}}>{statusText}</Text>
              </View>
              <View style={{}}>
                <Icon
                  name="doubleright"
                  type="AntDesign"
                  style={styles.suggestionAdd}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', borderWidth: 0, width: '100%'}}>
              <View style={{width: 18, borderWidth: 0}} />
            </View>
          </View>
          {/* 
          <Icon
                name="doubleright"
                type="AntDesign"
                style={styles.suggestionAdd}
              /> */}
        </View>
        <View
          style={{
            flex: 1,
            paddingRight: 10,
          }}>
          {/* <Text>
            Distance :{' '}
            {getDistance(
              {
                latitude: userData.pharmacy_lat,
                longitude: userData.pharmacy_long,
              },
              {
                latitude: item.request_pharmacy_lat,
                longitude: item.request_pharmacy_long,
              },
            ) / 1000}{' '}
            km
          </Text> */}
        </View>
      </TouchableOpacity>
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
    } = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title="Pharmacy Requests"
          showBack={true}
          onLeftPress={() => {
            this.props.navigation.goBack();
          }}
        />
        {/* <SuggestionInput
          data={this.state.data}
          value={this.state.searchText}
          placeHolder="Search Request ."
          suggestionTitle=""
          showFilter={false}
          showSearch={false}
          showArrow={true}
          onChangeText={value => this.onChangeText(value)}
          onSuggestionClick={item => this.onClickSuggestion(item)}
          onSearchClick={() => this.onSearchClick()}
        /> */}
        {/* <View style={{flexDirection: 'row'}}>
          <View style={styles.filterWrapper}>
            <View style={styles.statusWrapper} />
            <Text>Pending</Text>
          </View>
        </View> */}
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Constants.Colors.backgrounGrey,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.desContainer}>
            <FlatList
              data={this.state.pharamcies}
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
export default connect(mapStateToProps)(QuotationPharmacy);
