import React, {PureComponent} from 'react';
import {ScaledSheet} from 'react-native-size-matters';

import {
  View,
  Keyboard,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import {debounce, set} from 'lodash';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Header} from '../../components';
// import AutoCompleteInputField from '../AutoCompleteInputField';
import AppButton from '../appButton';
import {Utils} from '../../utils';
import AutoCompleteInput from 'react-native-autocomplete-input';
import Constants from '../../utils/Constants';
// import {Icon} from 'native-base';
export class AutoComplete extends PureComponent {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
    this.state = {
      locationPrediction: [],
      searchResults: false,
      resultsVisible: true,
      onLocationChangeStatus: true,
      address: '',
      initialRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0021,
      },
      loading: false,
      item: '',
      markerLatLon: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    };

    //]
  }

  componentDidMount() {
    this.onPressSetMyLocation();
    // this.onSubmitLocation()
    console.log('_componentDidMount loads_');
  }

  onPressSetMyLocation = () => {
    this.setState({
      loading: true,
    });
    if (Platform.OS === 'ios') {
      this.requestLocationPermissionIOS();
    } else if (Platform.OS === 'android') {
      this.requestLocationPermissionAndroid();
    }
    setTimeout(() => {
      this.setState({loading: false});
    }, 500);
  };

  requestLocationPermissionIOS = () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      info => {
        this.onLocationChange(info.coords);
        let latitude = info.coords.latitude;
        let longitude = info.coords.longitude;

        this.setState({
          markerLatLon: {
            latitude: latitude,
            longitude: longitude,
          },
        });
      },
      error => {
        console.log(error);
      },
    );
  };

  // shouldComponentUpdate(props, state) {
  //   console.log('_props_', props);
  //   console.log('_state_', state);
  //   // return false;
  // }

  requestLocationPermissionAndroid = () => {
    Geolocation.getCurrentPosition(
      info => {
        this.onLocationChange(info.coords);
        let latitude = info.coords.latitude;
        let longitude = info.coords.longitude;

        this.setState({
          markerLatLon: {
            latitude: latitude,
            longitude: longitude,
          },
        });
      },
      () => {
        alert('Location permissions denied');
      },
      {enableHighAccuracy: true, timeout: 5000},
    );
  };

  // onPressSetMyLocation = () => {
  //     if (Platform.OS === "ios") {
  //         this.requestLocationPermissionIOS();
  //     } else if (Platform.OS === "android") {
  //         this.requestLocationPermissionAndroid();
  //     }
  // };

  placesItemPressed = item => {
    // console.log('itme __ ', item);
    // this.setState({
    //   locationPrediction: [],
    //   searchResults: false,
    // });
    Keyboard.dismiss();
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAyFOKFuPvlou4KJV1LPXGRgi-gVk1q-qA&place_id=${
        item.place_id
      }&fields=geometry`,
    )
      .then(response => response.json())
      .then(response => {
        if (response.status == 'OK') {
          // console.log();
          this.setState({
            markerLatLon: {
              latitude: response.result.geometry.location.lat,
              longitude: response.result.geometry.location.lng,
              address: item.description,
            },
            address: item.description,
            searchResults: false,
            // locationPrediction: [],
            resultsVisible: true,
          });
        }
      })
      .catch(error => {
        console.log(error, 'Response in catch');
      });
  };

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

  backgroundPressed = () => {
    this.setState({
      resultsVisible: true,
    });
  };

  // LOCATION POINTER CHANGE
  onLocationChange = value => {
    console.log('onLocationChange ++ ', value);
    const {onLocationChangeStatus} = this.state;

    if (!onLocationChangeStatus) return false;

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
            console.log('response.status __ ', response.results);

            // this.setState({ })
            this.setState({
              markerLatLon: {
                latitude: value.latitude,
                longitude: value.longitude,
                latitudeDelta: value.latitudeDelta,
                longitudeDelta: value.longitudeDelta,
                address: response.results[1].formatted_address,
              },
              // initialRegion: {
              //   latitude: value.latitude,
              //   longitude: value.longitude,
              //   latitudeDelta: value.latitudeDelta,
              //   longitudeDelta: value.longitudeDelta,
              // },
              address: response.results[1].formatted_address,
              item: response.results[1],
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
  //UI RENDER =====================================================
  renderAutoplacesComplete = () => {
    const {resultsVisible, searchResults} = this.state;
    return (
      <View style={styles.autoCompleteContainer}>
        <Header
          title="Search Location"
          showBack={true}
          onLeftPress={this.props.onLeftPress}
        />

        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
          <AutoCompleteInput
            containerStyle={styles.autoCompleteField}
            keyExtractor={(item, index) => item.key}
            style={styles.autocomplete}
            inputContainerStyle={[styles.inputContainerStyle]}
            listStyle={styles.list}
            hideResults={true}
            autoCapitalize={'none'}
            placeholder="Search location"
            placeholderTextColor="grey"
            data={this.state.locationPrediction}
            onChangeText={text => this.onChangeText(text)}
            // onFocus={props.onFocus}
            // onBlur={props.onBlur}
            defaultValue={this.state.address}
            // renderItem={({item}) => <Text>suggestions </Text>}
          />
          {/* <Text
            style={{
              paddingLeft: 5,
              marginVertical: 10,
              fontWeight: 'bold',
              color: Constants.Colors.primaryBlue,
            }}>
            Enter Your Delivery Address :{' '}
          </Text>
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
                <Icon
                  type="Entypo"
                  name="circle-with-cross"
                  style={styles.backIcon}
                />
              </TouchableOpacity>
            </View>
          </View> */}

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
        </View>
      </View>
    );
  };

  onSubmitLocation = () => {
    const {onSelectLocation} = this.props;

    console.log('markerLatin', this.state.markerLatLon);
    console.log('markerLatin item', this.state.item);

    onSelectLocation(this.state.markerLatLon, this.state.item);
  };

  renderButton = () => {
    return (
      <View style={styles.buttonView}>
        {/* <AppButton
          style={{backgroundColor: Constants.Colors.primaryYellow}}
          buttonText="My Location"
          onPress={() => this.onPressSetMyLocation()}
        /> */}
        <View style={{marginVertical: 5}} />
        <AppButton
          buttonText="Submit "
          onPress={() => this.onSubmitLocation()}
        />
      </View>
    );
  };
  renderFixedPointer = () => {
    return (
      <View style={styles.fixedPointerContainer}>
        <Image
          source={require('../../assets/location.png')}
          style={styles.locationPin}
          resizeMode="contain"
        />
      </View>
    );
  };

  render() {
    const {loading} = this.state;

    console.log('_rederloads_');

    return (
      <TouchableWithoutFeedback onPress={() => this.backgroundPressed()}>
        <View style={styles.container}>
          <MapView
            initialRegion={
              {
                latitude: this.state.markerLatLon.latitude,
                longitude: this.state.markerLatLon.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
              // this.state.initialRegion
            }
            region={{
              latitude: this.state.markerLatLon.latitude,
              longitude: this.state.markerLatLon.longitude,
              // latitudeDelta: this.state.initialRegion.latitudeDelta,
              // longitudeDelta: this.state.initialRegion.longitudeDelta,

              // latitude: 37.78825,
              // longitude: -122.4324,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
            zoomEnabled={true}
            // pointerEvents="none"
            style={{flex: 1}}
            onRegionChangeComplete={
              value => {
                console.log('onLocationChange_', value);
                this.onLocationChange(value);
              } // this.onLocationChange(value)
            }
          />
          {this.renderAutoplacesComplete()}

          {this.renderButton()}

          {this.renderFixedPointer()}

          {Utils.showSpinner(loading)}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default AutoComplete;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  autoCompleteContainer: {
    flex: 1,
    position: 'absolute',
    // top: 50,
    width: '100%',
    alignSelf: 'center',
    zIndex: 1,
    // paddingHorizontal: 20
  },
  suggestionTxt: {
    fontSize: 12,
    color: 'black',
  },
  suggestionsTouchStyle: {
    backgroundColor: 'white',
    height: 40,
    // borderWidth: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  subContainer: {
    marginTop: 100,
    width: '100%',
  },
  buttonView: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    zIndex: 5,
    paddingHorizontal: 20,
    bottom: 50,
  },
  fixedPointerContainer: {
    flex: 1,
    top: Math.round(windowHeight / 2) - 15,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationPin: {
    height: 30,
    width: 30,
  },

  ///////
  autoCompleteField: {
    width: '100%',
    height: 60,
    borderRadius: '5@ms',
  },

  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Constants.Colors.primaryBlue,
    borderRadius: '5@ms',
    height: '43@ms',
    backgroundColor: 'white',
  },
  inputContainerStyle: {
    flex: 1,
    paddingLeft: 10,
  },

  list: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: '6@ms',
    marginTop: '4@ms',
    maxHeight: '200@ms',
    borderWidth: 0,
    width: '100%',
    margin: 0,
    // backgroundColor: 'white',
  },
  autoCompleteListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '13@ms0.3',
    paddingHorizontal: '8@ms0.3',
  },
  details: {
    fontSize: '13@ms0.3',
    fontFamily: 'Roboto-Regular',
    marginLeft: '4@ms',
  },
  locationIcon: {
    fontSize: '15@ms',
    color: 'green',
  },
  autocomplete: {
    paddingLeft: '20@ms',
    paddingTop: '12@ms',
    fontFamily: 'Roboto-Regular',
    fontSize: '14@ms',
    color: 'black',
  },
});
