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
import {getDistance} from 'geolib';
import styles from './styles';
// import * as Animatable from 'react-native-animatable';
import {debounce, set} from 'lodash';
// import {Icon} from 'native-base';
// import {NavigationActions, StackActions} from 'react-navigation';
// import { Icon } from 'native-base';
import {
  Header,
  RoundedButton,
  SuggestionInput,
  PharmacyRequestModal,
} from '../../components';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';


import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";



import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';
// import StarRating from 'react-native-star-rating';
// import {utils} from 'react-native-connectycube';

class Medicals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      userLocation: this.props.userLocation,
      cartData: this.props.cartData,
      loading: true,
      data: [],
      checkedPharmacies: [],
      pharamcies: [],
      activeTab: 0,
      isRequestModal: false,
      searchText: '',
      prescriptionId: 0,
      item:  this.props.route.params?.item || {},
    };
    // console.log('Medicals _', this.state.item);
  }
  get_api_data() {
    const {searchText = ''} = this.state;

    if (searchText.length < 2) return false;

    var payload = new FormData();
    // payload.append('medicine_name', searchText);
    Services.post('pharmacy_list', {}, payload, true)
      .then(responseJson => {
        console.log('pharmacy_list', responseJson);

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
    // this.focusListener.remove();
  }

  _onPressCheck(item) {
    const {checkedPharmacies = []} = this.state;

    var newItem = item.pharmacy_id;
    var array = checkedPharmacies;
    const index = array.indexOf(item.pharmacy_id);

    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.indexOf(newItem) === -1
        ? array.push(newItem)
        : console.log('This item already exists');
    }

    // console.log(array);
    this.setState({checkedPharmacies: array});
    console.log('_onPressCheck', this.state.checkedPharmacies);
  }

  componentDidMount() {
    this.getPrescription();
  }

  getPrescription() {
    const {
      pharamcies = [],
      prescriptionId = '',
      checkedPharmacies,
    } = this.state;
    var deliveryAddress = Utils.getUserDeliveryLocation();

    console.log('deliveryAddress', deliveryAddress);



    var payload = new FormData();
    // payload.append('lat','');
    payload.append('lat', deliveryAddress.latitude != undefined ? deliveryAddress.latitude : '');
    payload.append('long', deliveryAddress.longitude!= undefined?deliveryAddress.longitude:'' );
    Services.post('pharmacy_list', {}, payload, true)
      .then(responseJson => {
        console.log('pharmacy_list', responseJson);
        // array.push(newItem)
        // responseJson.data.map(())
        var array = checkedPharmacies;
        responseJson.data.map((item, index) => {
          array.push(item.pharmacy_id);
        });

        console.log('checkedPharmacies', array);
        console.log('checkedPharmacies__', responseJson.data);


        // if (responseJson.status == 1) {
          this.setState({
            pharamcies: responseJson.data,
            loading: false,
            checkedPharmacies: array,
          });
        // }  


        setTimeout(() => {

        console.log('test',this.state.pharamcies);


        },3000)






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
              {Utils.capitalizeFirstLetter(item.pharmacy_name)}
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

  _onMedicinePress = item => {
    const {addedMedicines, prescriptionId} = this.state;
    // console.log('item', item);

    this.props.navigation.navigate('Medicine', {item, prescriptionId});

    addedMedicines.push(item);

    // console.log('item___', item);
    // console.log('addedMedicines', addedMedicines);

    this.setState({addedMedicines});
  };

  debounceSearchResults = loc => {
    const {searchText} = this.state;
    var payload = new FormData();
    var deliveryAddress = Utils.getUserDeliveryLocation();

    // payload.append('medicine_name', searchText);
    payload.append('lat', deliveryAddress.latitude);
    payload.append('long', deliveryAddress.longitude);

    Services.post('medicine_list', {}, payload, true)
      .then(responseJson => {
        // console.log('debounceSearchResults', responseJson);

        if (responseJson.status == 1) {
          this.setState({
            data: responseJson.data,
            loading: false,
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
  };

  debounceHandler = debounce(this.debounceSearchResults, 100);

  onChangeText = text => {
    if (text.length > 2) {
      this.setState({
        resultsVisible: false,
        searchText: text,
      });
      this.debounceHandler(text);
    } else {
      this.setState({
        resultsVisible: true,
        searchText: text,
        locationPrediction: [],
        data: [],
      });
    }
    // this.setState({});
  };

  removeMedicineRequest(id) {
    const {prescriptionId} = this.state;
    // console.log('id', id);
    var payload = new FormData();
    payload.append('prescriptionId', prescriptionId);
    Services.post('remove_prescription/' + id, {}, payload, true)
      .then(responseJson => {
        // console.log('debounceSearchResults', responseJson);
        // if (responseJson.status == 1) {
        //   this.setState({
        //     data: responseJson.data,
        //     loading: false,
        //   });
        // }

        this.setState({
          addedMedicines: responseJson.data,
          loading: false,
        });
      })
      .catch(error => {
        // console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }
  _onRemoveMedicine(id) {
    Alert.alert(
      'Sehat Connection',
      'Are you sure you want to remove this medicine from prescription ?',
      [
        {
          text: 'Cancel',
          // onPress: () => this.onCancelPress(),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.removeMedicineRequest(id)},
      ],
      {cancelable: false},
    );
  }
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

  saverOrder() {
    const {
      item,
      userData,
      checkedPharmacies = [],
      userLocation,
      cartData = [],
    } = this.state;

    // console.log('_checkedPharmacies_', );
    // return false;
    if (checkedPharmacies.length < 1) {
      Utils.showToastMessage('Please select any one store.', 'danger');
      return false;
    }

    this.setState({
      loading: true,
    });

    var payload = new FormData();
    payload.append('signup_id', userData.signup_id);
    cartData.map((item, index) => {
      payload.append('products[' + index + '][id]', item.medicine_id);
      payload.append(
        'products[' + index + '][strength]',
        item.medicine_size[item.sizeId].medicine_size_id,
      );
      payload.append('products[' + index + '][qty]', item.qty);
    });

    Services.post('save_order', {}, payload, true)
      .then(responseJson => {
        // console.log('save_order');
        this.onPressGetQuote(responseJson.ins);
        // console.log('save_order');
      })
      .catch(error => {
        // console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }

  onPressGetQuote(orderId) {
    const {
      item,
      userData,
      checkedPharmacies = [],
      userLocation,
      cartData = [],
    } = this.state;

    this.setState({
      loading: true,
    });

    var payload = new FormData();

    var deliveryAddress = Utils.getUserDeliveryLocation();

    payload.append('request_pharmacy_consult_id', orderId);

    payload.append('request_pharmacy_lat', deliveryAddress.latitude);
    payload.append('request_pharmacy_long', deliveryAddress.longitude);
    payload.append('request_pharmacy_address', deliveryAddress.address);

    payload.append('request_pharmacy_userid', userData.signup_id);
    payload.append('request_pharmacy_is_counter', 1);
    payload.append('request_pharmacy_user_role', userData.signup_type);

    payload.append('request_pharmacy_pharmacyid', checkedPharmacies.toString());

    Services.post('send_pharmacy_request', {}, payload, true)
      .then(responseJson => {
        console.log('send_pharmacy_request', responseJson);

        if (responseJson.status == 1) {
          this.setState({
            loading: false,
            isRequestModal: true,
          });
        }
        Utils.showToastMessage('Quotation send to Pharmist', 'danger');
      })
      .catch(error => {
        // console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }
  // _onPressCheck(item) {
  //   const {checkedPharmacies = []} = this.state;

  //   var newItem = item.pharmacy_id;
  //   var array = checkedPharmacies;
  //   const index = array.indexOf(item.pharmacy_id);

  //   if (index > -1) {
  //     array.splice(index, 1);
  //   } else {
  //     array.indexOf(newItem) === -1
  //       ? array.push(newItem)
  //       : console.log('This item already exists');
  //   }

  //   // console.log(array);
  //   this.setState({checkedPharmacies: array});
  //   console.log('_onPressCheck', this.state.checkedPharmacies);
  // }
  // _renderMedicals = ({item, index}) => {
  //   const {checkedPharmacies = [], userLocation} = this.state;

  //   var tempstart = 'pm';
  //   var timeStart = parseInt(item.pharmacy_time_start);
  //   if (timeStart < 1200) {
  //     tempstart = 'am';
  //     timeStart = timeStart / 100;
  //   } else {
  //     timeStart = timeStart - 1200;
  //     timeStart = timeStart / 100;
  //   }

  //   // console.log('_render_Medicals_', item);

  //   var tempend = 'pm';
  //   var timEnds = parseInt(item.pharmacy_time_ends);
  //   if (timEnds < 1200) {
  //     tempend = 'am';
  //     timEnds = timEnds / 100;
  //   } else {
  //     timEnds = timEnds - 1200;
  //     timEnds = timEnds / 100;
  //   }

  //   var checkBox = true;
  //   if (checkedPharmacies.indexOf(item.pharmacy_id) !== -1) checkBox = false;

  //   var deliveryAddress = Utils.getUserDeliveryLocation();

  //   console.log(deliveryAddress, 'deliveryAddress');
  //   console.log('_item_medical', item);

  //   return (
  //     <View style={styles.medicineAddedWrapper}>
  //       <View style={styles.checkBoxContainer}>
  //         <TouchableOpacity
  //           onPress={() => {
  //             this._onPressCheck(item);
  //           }}
  //           style={styles.checkboxUncheckStyle}>
  //           <MaterialCommunityIcons
  //             type="MaterialCommunityIcons"
  //             name={
  //               checkBox
  //                 ? 'checkbox-blank-circle-outline'
  //                 : 'checkbox-marked-circle-outline'
  //             }
  //             style={styles.checkboxIconStyle}
  //           />
  //         </TouchableOpacity>
  //       </View>
  //       <View style={{flex: 1, paddingRight: 10}}>
  //         <Text style={styles.medicineTxtStyle} numberOfLines={1}>
  //           {item.pharmacy_name.replace(/&amp;/g, '&')}
  //         </Text>

  //         <Text numberOfLines={2} style={styles.medicineDescStyle}>
  //           {item.pharmacy_address != null && item.pharmacy_address != ''
  //             ? item.pharmacy_address
  //             : item.pharmacy_auto_complete}
  //         </Text>
  //         {/* item.pharmacy_address */}
  //         {/* <Text>
  //           {timeStart.toFixed(2) + ' ' + tempstart + ' '} -
  //           {' ' + timEnds.toFixed(2) + ' ' + tempend}
  //         </Text> */}
  //       </View>
  //       <View style={styles.getQuoteWrapper}>
  //         <Text style={styles.getQuoteWrapperText}>
  //           {
  //             deliveryAddress.latitude != undefined ?
  //             getDistance(
  //               {
  //                 latitude: deliveryAddress.latitude,
  //                 longitude: deliveryAddress.longitude,
  //               },
  //               {
  //                 latitude: item.pharmacy_lat,
  //                 longitude: item.pharmacy_long,
  //               },
  //             ) / 1000 + "km"  : null
  //           }

  //           {/* km */}
  //         </Text>
  //         {/* <Text>{parseFloat(item.distance).toFixed(2)}</Text> */}
  //         {/* <StarRating
  //           disabled={false}
  //           maxStars={5}
  //           starSize={13}
  //           rating={4.5}
  //           fullStarColor={Constants.Colors.primaryYellow}
  //           // selectedStar={rating => this.onStarRatingPress(rating)}
  //         /> */}
  //         {/* <Text style={{}}>Delivery Charges : 100 Pkr</Text> */}
  //       </View>
  //     </View>
  //   );
  // };
  // _onPressSubmit


  _renderMedicals = ({item, index}) => {
    const {checkedPharmacies = [], userLocation} = this.state;

    var tempstart = 'pm';
    var timeStart = parseInt(item.pharmacy_time_start);
    if (timeStart < 1200) {
      tempstart = 'am';
      timeStart = timeStart / 100;
    } else {
      timeStart = timeStart - 1200;
      timeStart = timeStart / 100;
    }

    // console.log('_render_Medicals_', item);

    var tempend = 'pm';
    var timEnds = parseInt(item.pharmacy_time_ends);
    if (timEnds < 1200) {
      tempend = 'am';
      timEnds = timEnds / 100;
    } else {
      timEnds = timEnds - 1200;
      timEnds = timEnds / 100;
    }

    var checkBox = true;
    if (checkedPharmacies.indexOf(item.pharmacy_id) !== -1) checkBox = false;

    var deliveryAddress = Utils.getUserDeliveryLocation();

    console.log(deliveryAddress, 'deliveryAddress');
    console.log('_item_medical', item);

    return (
      <View style={styles.medicineAddedWrapper}>
        <View style={styles.checkBoxContainer}>
          <TouchableOpacity
            onPress={() => {
              this._onPressCheck(item);
            }}
            style={styles.checkboxUncheckStyle}>
            <MaterialCommunityIcons
              // type="MaterialCommunityIcons"
              name={
                checkBox
                  ? 'checkbox-blank-circle-outline'
                  : 'checkbox-marked-circle-outline'
              }
              style={styles.checkboxIconStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, paddingRight: 10}}>
          <Text style={styles.medicineTxtStyle} numberOfLines={1}>
            {item.pharmacy_name.replace(/&amp;/g, '&')}
          </Text>

          <Text numberOfLines={2} style={styles.medicineDescStyle}>
            {item.pharmacy_address != null && item.pharmacy_address != ''
              ? item.pharmacy_address
              : item.pharmacy_auto_complete}
          </Text>
          {/* item.pharmacy_address */}
          {/* <Text>
            {timeStart.toFixed(2) + ' ' + tempstart + ' '} -
            {' ' + timEnds.toFixed(2) + ' ' + tempend}
          </Text> */}
        </View>
        <View style={styles.getQuoteWrapper}>
          <Text style={styles.getQuoteWrapperText}>
            {getDistance(
              {
                latitude: deliveryAddress.latitude,
                longitude: deliveryAddress.longitude,
              },
              {
                latitude: item.pharmacy_lat,
                longitude: item.pharmacy_long,
              },
            ) / 1000}{' '}
            km
          </Text>
          {/* <Text>{parseFloat(item.distance).toFixed(2)}</Text> */}
          {/* <StarRating
            disabled={false}
            maxStars={5}
            starSize={13}
            rating={4.5}
            fullStarColor={Constants.Colors.primaryYellow}
            // selectedStar={rating => this.onStarRatingPress(rating)}
          /> */}
          {/* <Text style={{}}>Delivery Charges : 100 Pkr</Text> */}
        </View>
      </View>
    );
  };
  render() {
    const {loading, pharamcies, isRequestModal, checkedPharmacies} = this.state;

    console.log('render_');
    return (
      <View style={styles.Container}>
        <PharmacyRequestModal
          modalVisible={isRequestModal}
          pharamcies={pharamcies}
          checkedPharmacies={checkedPharmacies}
          onReturnHome={() => {
            this.setState({
              isRequestModal: false,
            });
            this.props.navigation.navigate('App', {
                // screen: "Welcome",
                initial: false,
              });
          }}
        />
        <Header
          title="Nearest Pharmacies"
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
              data={this.state.pharamcies}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderMedicals}
              scrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <RoundedButton
            text="Send Request"
            textColor={'white'}
            fontsize={15}
            customStyle={styles.loginBtn}
            handleOnPress={() => {
              this.saverOrder();
            }}
          />
        </ScrollView>
        {Utils.showSpinner(loading)}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userLocation: state.main.userLocation,
    userData: state.main.userData,
    cartData: state.main.cartData,
  };
};
export default connect(mapStateToProps)(Medicals);
