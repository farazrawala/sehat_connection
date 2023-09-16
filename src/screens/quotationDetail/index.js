import React, {PureComponent} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import mainStyle from '../../components/generalStyle/style';
import * as Animatable from 'react-native-animatable';
import {debounce, set} from 'lodash';
// import {Icon} from 'native-base';
import {NavigationActions, StackActions} from 'react-navigation';
// import { Icon } from 'native-base';
import {getDistance} from 'geolib';
import {
  Header,
  RoundedButton,
  SuggestionInput,
  GoogleAutoComplete,
  Renderdoctors,
} from '../../components';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';

class QuotationPharmacy extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      loading: true,
      data: [],
      addressTemp: '',
      phone: '',
      isLocationVisible: true,
      quantity: '',
      inputData: [
        // {key: '', value: ''},
        // {key: '', value: ''},
        // {key: '', value: ''},
      ],
      inputs: [],
      instructions: '',
      address: '',
      medicines: [],
      discounts: [0, 0],
      retailPrice: [],
      userDetails: [],
      availibilties: [],
      activeTab: 0,
      searchText: '',
      prescriptionId: 0,
      deliveryCharges: 100,
      medicinceCharges: 0,

      item:  this.props.route.params.item || {},
    };

    console.log('QuotationPharmacy__item ', this.state.item);
  }

  get_api_data() {
    const {
      searchText = '',
      item,
      inputData = [],
      availibilties = [],
    } = this.state;
    var retailPrice = [];
    var payload = new FormData();
    payload.append('request_pharmacy_id', item.request_pharmacy_id);
    Services.post('get_prescription_by_pharmist', {}, payload, true)
      .then(responseJson => {
        console.log('get_prescription_by_pharmist', responseJson);

        for (var i = 0; i < responseJson.data.length; i++) {
          inputData.push({key: '', value: 0});
          retailPrice.push(responseJson.data[i].medicine_size_price);
          // console.log(
          //   '_retailPrice__',
          //   ,
          // );
          if (item.request_pharmacy_request_status == 0) {
            availibilties.push(true);
          } else {
            if (item.data[i].quotation_pharmacy_is_available == 0)
              availibilties.push(false);
            else availibilties.push(true);
          }
        }

        console.log('retailPrice__', retailPrice);
        console.log('inputData__', inputData);

        if (responseJson.status == 1) {
          this.setState({
            medicines: responseJson.data,
            loading: false,
            addressTemp: item.request_pharmacy_address,
            inputData: inputData,
            availibilties: availibilties,
          });
        }
        this.setState({retailPrice});
      })
      .catch(error => {
        console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }

  componentDidMount() {
    const {item, userData} = this.state;
    console.log('componentDidMount_item_', item);
    this.get_api_data();
    this.setState({medicinceCharges: item.total_amount});
  }

  onHandleChange(index, type, value) {
    const {inputData} = this.state;
    // console.log(index,, value);
    // me
    inputData[0].type;

    this.setState({});
  }

  updateState = (index, value) => {
    // console.log(index, value);
    // if(sprice == 'sprice' )
    const userDetails = [...this.state.userDetails];
    userDetails[index].value = value;
    userDetails[index].key = index;

    console.log(userDetails);
    this.setState({userDetails: userDetails});
  };

  inputHandler = (sp, key) => {
    const {
      retailPrice = [],
      discounts = [],
      deliveryCharges,
      medicines = [],
    } = this.state;

    const _inputs = [...this.state.inputData];
    _inputs[key].value = sp;
    _inputs[key].key = key;

    console.log('_inputs' + key, _inputs);

    var rp = retailPrice[key];
    var diff = rp - sp;
    var disc = 100 - (sp * 100) / rp;
    disc = parseFloat(disc).toFixed(0);
    if (disc > 100) disc = 100;
    discounts[key] = disc;
    if (disc < 0) disc = 0;
    var medicinceCharges = 0;
    for (var i = 0; i < _inputs.length; i++) {
      if (_inputs[i].value != '')
        medicinceCharges +=
          parseInt(_inputs[i].value) * medicines[i].order_item_qty;
    }
    // console.log('_invalue', medicinceCharges);
    this.setState({
      inputData: _inputs,
      medicinceCharges,
    });
  };

  _onSubmitDispatch(id) {
    const {item} = this.state;

    var payload = new FormData();
    payload.append('request_pharmacy_id', item.request_pharmacy_id);
    payload.append('request_pharmacy_request_status', id);

    this.setState({
      loading: true,
    });

    console.log('_my_payload_', payload);
    // return false;

    Services.post('pharmay_order_status', {}, payload, true)
      .then(responseJson => {
        console.log('pharmay_order_status', responseJson);
        // return false;

        this.setState({
          loading: false,
        });
        // this.props.navigation.navigate('QuotationPharmacy');
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log('_error', error);
        this.setState({
          loading: false,
        });
      });
  }
  _onConfirmOrder() {
    const {
      userData,
      item,
      medicines,
      inputData,
      availibilties = [],
      instructions,
      address,
    } = this.state;
    var payload = new FormData();
    payload.append('request_pharmacy_id', item.request_pharmacy_id);
    payload.append('request_pharmacy_comments', instructions);
    payload.append('request_pharmacy_address', address);

    if (address == '') {
      // utils.showToast('Address Required');
      Utils.showToastMessage('Complete Address Required');
      return false;
    }
    this.setState({
      loading: true,
    });

    console.log('_payload_', payload);
    // return false;

    Services.post('pharmay_confirm_order', {}, payload, true)
      .then(responseJson => {
        console.log('pharmay_confirm_order', responseJson);
        this.setState({
          loading: false,
        });
        Utils.showToastMessage('Order successfully confirmed.');
        // this.props.navigation.navigate('QuotationPharmacy');
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log('_error', error);
        this.setState({
          loading: false,
        });
      });
  }
  _onSubmitResponse() {
    const {
      userData,
      item,
      medicines,
      inputData,
      medicinceCharges,
      deliveryCharges,
      quantity,
      availibilties = [],
    } = this.state;

    // console.log('availibilties__', availibilties);

    // return false;
    const _inputs = [...this.state.inputData];
    var medicineIds = [];
    var salesPrice = [];
    var availibility = [];

    medicines.map((index, value) => {
      medicineIds.push(medicines[value].medicine_id);
      salesPrice.push(inputData[value].value);
      availibility.push(availibilties[value] == true ? 1 : 0);
      // console.log('availibilties[index]');
    });

    console.log('_medicineIds_', medicineIds);
    console.log('salesPrice_', salesPrice);
    console.log('availibility_', availibility);

    // return false;
    var total_amount = 0;
    for (var i = 0; i < _inputs.length; i++) {
      total_amount += parseInt(_inputs[i].value);
      // if (_inputs[i].value == '') {
      //   Utils.showToastMessage('All fields are required.', 'danger');
      //   return false;
      // }
    }
    if (total_amount < 1) {
      Utils.showToastMessage('Price fields is required.', 'danger');
      return false;
    }
    // console.log('total_amount', total_amount);
    // return false;

    var payload = new FormData();
    payload.append('quotation_pharmacy_userid', userData.signup_id);
    payload.append('quotation_pharmacy_pharmacy_id', userData.user_pharmacy_id);
    payload.append(
      'quotation_pharmacy_consultation_id',
      item.request_pharmacy_consult_id,
    );
    payload.append('quotation_pharmacy_request_id', item.request_pharmacy_id);
    payload.append('quotation_pharmacy_medicine_id', medicineIds.toString());
    payload.append('quotation_pharmacy_is_available', availibility.toString());
    payload.append('quotation_pharmacy_qty', quantity.toString());
    payload.append('quotation_pharmacy_price', salesPrice.toString());

    payload.append('request_pharmacy_delivery', deliveryCharges);
    payload.append('request_pharmacy_medicine', medicinceCharges);
    payload.append(
      'request_pharmacy_total',
      medicinceCharges + deliveryCharges,
    );

    this.setState({
      loading: true,
    });

    console.log('_payload_', payload);
    // return false;

    Services.post('send_qoutation_by_pharmacy', {}, payload, true)
      .then(responseJson => {
        console.log('send_qoutation_by_pharmacy', responseJson);
        this.setState({
          loading: false,
        });
        this.props.navigation.navigate('QuotationPharmacy');
      })
      .catch(error => {
        console.log('_error', error);
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
      _inputs = [],
      userData,
      isLocationVisible = false,
      loadsData = [],
      inputData = [],
      showDatePicker,
      dateTimeModalType,
      medicines = [],
      discounts = [],
      retailPrice = [],
      deliveryCharges,
      medicinceCharges,
      availibilties = [],
      instructions,
      address,
      item,
    } = this.state;

    console.log('__item__', item);

    var status = 'Pending';
    if (item.request_pharmacy_request_status == 1) status = 'Quoted';
    if (item.request_pharmacy_request_status == 2) status = 'Approved';
    if (item.request_pharmacy_request_status == 3) status = 'Reject';
    if (item.request_pharmacy_request_status == 4) status = 'Ready';
    if (item.request_pharmacy_request_status == 5) status = 'Dispatch';
    // if (item.request_pharmacy_request_status == 6) status = 'Order Dispatched ';

    // console.log('data[0]', );

    var color = 'orange';
    if (item.request_pharmacy_request_status == 1)
      color = Constants.Colors.primaryBlue;
    else if (item.request_pharmacy_request_status == 2)
      color = Constants.Colors.primaryGreen;
    else if (item.request_pharmacy_request_status == 3)
      color = Constants.Colors.red;
    else if (item.request_pharmacy_request_status == 4)
      color = Constants.Colors.primaryGreen;

    return (
      <View style={styles.Container}>
        <Header
          title="Detail"
          showBack={true}
          // showShare={true}
          onRightPress={() => {}}
          onLeftPress={() => {
            this.props.navigation.goBack();
          }}
        />

        {/* <GoogleAutoComplete
          isVisible={isLocationVisible}
          onDismiss={() => {
            this.setState({
              isLocationVisible: false,
            });
          }}
          fieldIndex={99}
          onSelectLocation={(detail, marker) => {
            // this.onLocationSeclect(99, detail, marker);
            console.log(detail);
          }}
        /> */}

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Constants.Colors.backgrounGrey,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.desContainer}>
            <View style={styles.topWrapper}>
              <View style={styles.topContSno}>
                <Text style={{color: 'white'}}>
                  R-{item.request_pharmacy_consult_id}
                </Text>
              </View>
              <View style={{flex: 1, marginLeft: 15}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold', color: color}}>
                    {item.pharmacy_name}
                  </Text>
                </View>

                <Text style={styles.topContDate}>
                  {item.request_pharmacy_createdon}
                </Text>
                {/* <Text>Saddar karachi (1.5 km)</Text> */}
                <View style={{flexDirection: 'row'}}>
                  <Text>Status : </Text>
                  <Text style={{fontWeight: 'bold', color: color}}>
                    {status}
                  </Text>
                </View>
              </View>
            </View>

            {userData.signup_type == 5 ||
            userData.signup_type == 3 ||
            (userData.signup_type == 2 &&
              item.request_pharmacy_request_status != 1)
              ? inputData.map((input, key) => (
                  <View style={styles.medicineAddedWrapper}>
                    <Text style={{marginVertical: 5}}>
                      {key + 1} ) {medicines[key].medicine_name}{' '}
                      {Utils.getMedicineType(medicines[key].medicine_type)}
                      {medicines[key].medicine_strength}{' '}
                      {medicines[key].medicine_type} Pack of{' '}
                      {medicines[key].medicine_size_size}
                    </Text>
                    {/* <Text
                      style={{
                        color: Constants.Colors.primaryBlue,
                        fontSize: 13,
                        marginLeft: 20,
                        fontWeight: 'bold',
                        marginBottom: 7,
                      }}>
                      Pack of {medicines[key].medicine_size_size}
                    </Text> */}
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: 130,
                          marginLeft: 20,
                          alignItems: 'center',
                        }}>
                        <Text style={[styles.inputlableStyle]}>Price : </Text>
                        <View
                          style={[styles.inputInnerWrapper, {marginLeft: 0}]}>
                          {item.request_pharmacy_request_status != 0 ? (
                            <View style={styles.inputInnerWrapper}>
                              <Text style={{fontWeight: 'bold'}}>
                                {item.data[key]?.quotation_pharmacy_price}
                              </Text>
                            </View>
                          ) : (
                            <TextInput
                              style={styles.inputStyle}
                              keyboardType="numeric"
                              placeholder="0"
                              value={input.value}
                              onChangeText={text =>
                                this.inputHandler(text, key)
                              }
                            />
                          )}
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: Constants.Colors.primaryBlue,
                            fontSize: 13,
                            marginLeft: 20,
                            fontWeight: 'bold',
                            marginBottom: 6,
                          }}>
                          Quantity : {medicines[key].order_item_qty}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.inputContainer}>
                      <View style={styles.inputWrapper}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          {/* <Text style={styles.inputlableStyle}>
                            Retail Price :{' '}
                          </Text>
                          <View style={styles.inputInnerWrapper}>
                            <Text style={{fontWeight: 'bold'}}>
                              {retailPrice[key]}
                            </Text>
                          </View> */}
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: 10,
                          }}>
                          {/* <Text style={styles.inputlableStyle}>
                            Discount %:{' '}
                          </Text>
                          <View
                            style={[
                              styles.inputInnerWrapper,
                              {borderColor: Constants.Colors.primaryBlue},
                            ]}>
                            <Text style={{fontWeight: 'bold'}}>
                              {discounts[key]}
                            </Text>
                          </View> */}
                        </View>
                      </View>

                      <View style={styles.inputWrapper}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: Constants.Colors.primaryBlue,
                              fontSize: 13,
                              marginLeft: 20,
                              fontWeight: 'bold',
                              marginBottom: 6,
                            }}>
                            Total :
                            {item.data[key]?.quotation_pharmacy_price
                              ? item.data[key].quotation_pharmacy_price *
                                medicines[key].order_item_qty
                              : null}
                            {input.value
                              ? input.value * medicines[key].order_item_qty
                              : null}{' '}
                            Rupees
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: 30,
                          }}>
                          {/* <Text
                            style={[styles.inputlableStyle, {marginLeft: 30}]}>
                            {input.value === '' || input.value === 0
                              ? 'Availablity'
                              : 'Available'}
                          </Text> */}
                          <TouchableOpacity
                            onPress={() => {
                              if (item.request_pharmacy_request_status == 0) {
                                availibilties[key] = !availibilties[key];
                                console.log('availibilties', availibilties);
                                console.log(
                                  'availibilties_key',
                                  inputData[key],
                                );
                                this.setState({
                                  availibilties,
                                });
                              }
                            }}
                            style={[
                              styles.inputInnerWrapper,
                              {width: 30, borderWidth: 0},
                            ]}>
                            {/* <View
                              style={[
                                styles.availabilityStyle,
                                {
                                  backgroundColor:
                                    input.value === '' || input.value === 0
                                      ? 'grey'
                                      : Constants.Colors.primaryGreen,
                                },
                              ]}
                            /> */}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))
              : null}

            {userData.signup_type == 5 ? (
              <View style={styles.deliveryWrapper}>
                {item.request_pharmacy_request_status == 0
                  ? inputData.map((input, key) => (
                      // <View
                      //   style={{
                      //     flexDirection: 'row',
                      //     justifyContent: 'space-between',
                      //   }}>
                      //   <Text style={styles.deliveryText}>
                      //     {medicines[key].medicine_name}(
                      //     {medicines[key].order_item_qty} X {''}
                      //     {inputData[key].value ? inputData[key].value : 0})
                      //   </Text>
                      //   <Text style={styles.deliveryText}>
                      //     {inputData[key].value * medicines[key].order_item_qty}
                      //   </Text>
                      // </View>
                      <View />
                    ))
                  : null}
                {item.request_pharmacy_request_status == 0 ||
                item.request_pharmacy_request_status == 2 ? (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.deliveryText}>
                        Delivery Charges ({/* item */}
                        {getDistance(
                          {
                            latitude: parseFloat(item.pharmacy_lat),
                            longitude: parseFloat(item.pharmacy_long),
                          },
                          {
                            latitude: item.request_pharmacy_lat,
                            longitude: item.request_pharmacy_long,
                            // latitude: 0,
                            // longitude: 0,
                          },
                        ) / 1000}{' '}
                        km)
                      </Text>
                      <Text style={styles.deliveryText}>
                        {deliveryCharges}{' '}
                      </Text>
                    </View>

                    <View style={styles.hrStyle} />
                  </View>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingRight: 25,
                  }}>
                  <Text style={styles.invoiceTextStyle}>Invoice Total </Text>
                  <Text style={styles.invoiceTotalStyle}>
                    {/* {parseInt(medicinceCharges)} -{parseInt(deliveryCharges)} - */}
                    {item.request_pharmacy_request_status == 1
                      ? item.request_pharmacy_total
                      : parseInt(medicinceCharges) + parseInt(deliveryCharges)}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.deliveryWrapper}>
                {inputData.map((input, key) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.deliveryText}>
                      {medicines[key].medicine_name} (
                      {medicines[key].order_item_qty} X{' '}
                      {item.data[key]?.quotation_pharmacy_price})
                    </Text>
                    <Text style={styles.deliveryText}>
                      {item.data[key].quotation_pharmacy_price < 1
                        ? 'N/A'
                        : medicines[key].order_item_qty *
                          item.data[key]?.quotation_pharmacy_price}
                    </Text>
                  </View>
                ))}
                <View style={styles.hrStyle} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.deliveryText}>
                    Delivery Charges {'   '} (1.5 km)
                  </Text>
                  <Text style={styles.deliveryText}>{deliveryCharges} </Text>
                </View>

                <View style={styles.hrStyle} />
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style={styles.invoiceTextStyle}>Invoice Total</Text>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 25,
                    }}>
                    <Text style={styles.invoiceTotalStyle}>
                      {item.request_pharmacy_total != 0
                        ? item.request_pharmacy_total
                        : medicinceCharges + deliveryCharges}
                    </Text>
                    <Text style={{color: 'white'}}>Rupees</Text>
                  </View>
                </View>
              </View>
            )}

            {userData.signup_type == 3 ||
            (userData.signup_type == 2 &&
              item.request_pharmacy_request_status == 1) ? (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: Constants.Colors.primaryBlue,
                      marginTop: 10,
                      paddingLeft: 5,
                    }}>
                    Phone :{' '}
                  </Text>
                  <View style={{flex: 1}}>
                    <TextInput
                      multiline={true}
                      style={styles.phoneStyle}
                      placeholder="Phone :"
                      // defaultValue={userData.signup_contact}
                      onChangeText={val => this.setState({phone: val})}
                      value={userData.signup_contact}
                    />
                  </View>
                </View>

                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Constants.Colors.primaryBlue,
                    marginTop: 10,
                    paddingLeft: 5,
                  }}>
                  Delivery Address :{' '}
                </Text>
                <Text
                  style={{
                    color: Constants.Colors.primaryBlue,
                    marginBottom: 5,
                    paddingLeft: 5,
                  }}>
                  {this.state.addressTemp}
                </Text>

                <TextInput
                  multiline={true}
                  style={styles.instructionStyle}
                  placeholder="House No. / Flat No."
                  onChangeText={val => this.setState({address: val})}
                  value={this.state.address}
                />
                <TextInput
                  multiline={true}
                  style={styles.instructionStyle}
                  // keyboardType="numeric"
                  placeholder="Delivery Instructions"
                  onChangeText={val => this.setState({instructions: val})}
                  value={this.state.instructions}
                />
              </View>
            ) : null}

            {item.request_pharmacy_request_status == 0 &&
            medicinceCharges > 0 ? (
              <RoundedButton
                text="Submit Response"
                textColor={'white'}
                fontsize={22}
                customStyle={mainStyle.loginBtn}
                handleOnPress={() => {
                  this._onSubmitResponse();
                }}
              />
            ) : null}

            {(userData.signup_type == 3 || userData.signup_type == 2) &&
            item.request_pharmacy_request_status == 1 ? (
              <View style={{marginVertical: 10}}>
                <RoundedButton
                  text="Confirm Order"
                  textColor={'white'}
                  fontsize={22}
                  customStyle={[mainStyle.loginBtn, {paddingHorizontal: 10}]}
                  handleOnPress={() => {
                    // this._onConfirmOrder();
                    this.props.navigation.navigate('PaymentSelection', {
                      amount: item.request_pharmacy_total,
                      type: 'medicine',
                      paramData: item,
                      instructions,
                      address,
                    });
                  }}
                />
              </View>
            ) : null}

            {item.request_pharmacy_request_status > 2 ? (
              <View>
                <Text style={{marginVertical: 15}}>
                  Pin Location : {item.request_pharmacy_address}{' '}
                </Text>
                {item.pharmacy_is_deliver == 1 ? (
                  <Text style={{marginVertical: 15}}>
                    Delivery Address : {item.request_pharmacy_complete_address}
                  </Text>
                ) : null}
              </View>
            ) : null}

            {item.request_pharmacy_request_status == 4 ? (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <RoundedButton
                  text="Dispatch"
                  textColor={'white'}
                  fontsize={22}
                  customStyle={[mainStyle.loginBtn, {paddingHorizontal: 10}]}
                  handleOnPress={() => {
                    this._onSubmitDispatch(5);
                  }}
                />
              </View>
            ) : null}

            {item.request_pharmacy_request_status == 2 &&
            userData.signup_type == 5 ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1}}>
                    <RoundedButton
                      text="Ready to Deliver"
                      textColor={'white'}
                      fontsize={15}
                      arrowIcon={true}
                      customStyle={[
                        mainStyle.loginBtn,
                        {paddingHorizontal: 10},
                      ]}
                      handleOnPress={() => {
                        this._onSubmitDispatch(4);
                      }}
                    />
                  </View>
                  <View style={{width: 19}} />
                  <View style={{flex: 1}}>
                    <RoundedButton
                      text="Cancel"
                      textColor={'white'}
                      fontsize={15}
                      arrowIcon={true}
                      customStyle={[
                        mainStyle.loginBtn,
                        {paddingHorizontal: 10},
                      ]}
                      handleOnPress={() => {
                        this._onSubmitDispatch(3);
                      }}
                    />
                  </View>
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
  };
};
export default connect(mapStateToProps)(QuotationPharmacy);
