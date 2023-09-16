import React, {PureComponent} from 'react';
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
import Geolocation from '@react-native-community/geolocation';
import {debounce, set} from 'lodash';
// import {Icon} from 'native-base';
// import {NavigationActions, StackActions} from 'react-navigation';
// import { Icon } from 'native-base';
import {Header, RoundedButton, LoginInput} from '../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// const {width, height} = Dimensions.get('window');
import Entypo from "react-native-vector-icons/Entypo";

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';

class AddLocation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      userLocation: this.props.userLocation,
      cartData: this.props.cartData,
      loading: false,
      data: [],
      request: [],
      searchResults: [],
      locationPrediction: [],
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

  componentDidMount() {}

  //GOOGLE PLACES AUTOCOMPLETE =====================================================
  debounceSearchResults = loc => {
    console.log('debounceSearchResults is working now', loc);

    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAyFOKFuPvlou4KJV1LPXGRgi-gVk1q-qA&input=${loc}`,
    )
      .then(response => response.json())
      .then(response => {
        this.setState({
          locationPrediction: response.predictions,
          searchResults: true,
        });
        console.log(response, 'This is location prediction from state');
      })
      .catch(error => {
        console.log(error, 'Response in catch');
      });
  };

  debounceHandler = debounce(this.debounceSearchResults, 500);

  onChangeText = text => {
    console.log('onChangeText+___', text);

    if (text.length > 3) {
      this.setState({
        resultsVisible: false,
        address: text,
      });
      this.debounceHandler(text);
    } else {
      this.setState({
        resultsVisible: true,
        locationPrediction: [],
        address: text,
      });
    }
    // this.setState({})
  };

  onContinue() {
    const {address} = this.state;
    if (address == '') {
      // Utils.showToastMessage('Addresss is required.');
      // Utils.showToastMessage('Please enter Phone Number!', 'danger');
      alert('Delivery address is required');
    } else {
      this.props.navigation.navigate('Medicals');
    }
  }
  _renderSuggestion = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.placesItemPressed(item);
        }}
        style={styles.suggestionsTouchStyle}>
        <Text style={styles.suggestionTxt} numberOfLines={1}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };

  placesItemPressed = item => {
    // console.log('itme __ ', item);
    // this.setState({
    //   locationPrediction: [],
    //   searchResults: false,
    // });

    this.setState({
      address: item.description,
    });

    Keyboard.dismiss();
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAyFOKFuPvlou4KJV1LPXGRgi-gVk1q-qA&place_id=${
        item.place_id
      }&fields=geometry`,
    )
      .then(response => response.json())
      .then(response => {
        if (response.status == 'OK') {
          console.log('cur_location', response.result.geometry);

          this.setState({
            markerLatLon: {
              latitude: response.result.geometry.location.lat,
              longitude: response.result.geometry.location.lng,
              address: item.description,
            },
            // address: item.description,
            searchResults: false,
            // locationPrediction: [],
            resultsVisible: true,
          });

          Utils.setUserDeliveryLocation({
            latitude: response.result.geometry.location.lat,
            longitude: response.result.geometry.location.lng,
            address: item.description,
          });

          console.log(
            '_setUserDeliveryLocation_',
            Utils.getUserDeliveryLocation(),
          );
        }
      })
      .catch(error => {
        console.log(error, 'Response in catch');
      });
  };

  onPressCurrentLocation() {
    if (Platform.OS === 'ios') {
      // this.requestLocationPermissionIOS();
    } else if (Platform.OS === 'android') {
      this.requestLocationPermissionAndroid();
    }
  }

  onLocationChange = value => {
    // const {onLocationChangeStatus} = this.state;
    // if (!onLocationChangeStatus) return false;

    if (value != []) {
      var address = '';
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          value.latitude
        },${
          value.longitude
        }&key=AIzaSyAyFOKFuPvlou4KJV1LPXGRgi-gVk1q-qA&fields=formatted_address`,
      )
        .then(response => response.json())
        .then(response => {
          address = response;
          if (response.status == 'OK') {
            // console.log('onLocationChange', response.results);
            this.setState({
              markerLatLon: {
                latitude: value.latitude,
                longitude: value.longitude,
                latitudeDelta: value.latitudeDelta,
                longitudeDelta: value.longitudeDelta,
                address: response.results[1].formatted_address,
              },
              address: response.results[1].formatted_address,
              item: response.results[1],
            });

            Utils.setUserDeliveryLocation({
              latitude: value.latitude,
              longitude: value.longitude,
              address: response.results[1].formatted_address,
            });
          }
        })
        .catch(error => {
          console.log(error, 'Response in catch');
        });
    }
    // console.log('add', value)
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
  };

  requestLocationPermissionAndroid = () => {
    Geolocation.getCurrentPosition(
      info => {
        console.log('requestLocationPermissionAndroid', info);
        this.onLocationChange(info.coords);
        // let latitude = info.coords.latitude;
        // let longitude = info.coords.longitude;
        // this.setState({
        //   markerLatLon: {
        //     latitude: latitude,
        //     longitude: longitude,
        //   },
        // });
      },
      () => {
        alert('Location permissions denied');
      },
      {enableHighAccuracy: false, timeout: 5000},
    );
  };
  render() {
    const {
      loading,
      searchResults,
      data,
      loadsData = [],
      cartData = [],
    } = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title="Delivery Address"
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
            <Text
              style={{
                paddingLeft: 5,
                marginVertical: 10,
                fontWeight: 'bold',
                color: Constants.Colors.primaryBlue,
              }}>
              Enter Your Delivery Address :{' '}
            </Text>
            {/* <Text>Lat : {this.state.latitude}</Text>
            <Text>Long : {this.state.longitude}</Text> */}
            <View style={styles.searchWrapper}>
              <View style={{flex: 1}}>
                <TextInput
                  onChangeText={text => this.onChangeText(text)}
                  style={styles.inputContainerStyle}
                  value={this.state.address}
                  placeholder="Current Location"
                  placeholderTextColor="grey"
                  onFocus={() => {
                    this.setState({
                      onLocationChangeStatus: false,
                    });
                  }}
                  onBlur={() => {
                    this.setState({
                      onLocationChangeStatus: true,
                    });
                  }}
                />
              </View>
              <View
                style={{
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      address: '',
                    });
                  }}>
                  <Entypo
                    type="Entypo"
                    name="circle-with-cross"
                    style={styles.backIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                marginVertical: 15,
                flexDirection: 'row',
              }}>
              <Entypo
                type="Entypo"
                name="location-pin"
                style={{
                  fontSize: 18,
                  marginRight: 3,
                  color: Constants.Colors.primaryBlue,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.onPressCurrentLocation();
                }}>
                <Text
                  style={{
                    color: Constants.Colors.primaryBlue,
                    marginRight: 5,
                  }}>
                  Current Location
                </Text>
              </TouchableOpacity>
            </View>

            {searchResults ? (
              <FlatList
                data={this.state.locationPrediction}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderSuggestion}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
              />
            ) : null}

            <RoundedButton
              text="Continue"
              textColor={'white'}
              fontsize={22}
              customStyle={{
                width: '70%',
                borderRadius: 20,
                paddingHorizontal: 10,
                height: 40,
                marginVertical: 20,
                backgroundColor: Constants.Colors.primaryGreen,
              }}
              handleOnPress={() => {
                this.onContinue();
              }}
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
    cartData: state.main.cartData,
  };
};
export default connect(mapStateToProps)(AddLocation);
