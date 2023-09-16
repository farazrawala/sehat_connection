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
  ActivityIndicator,
  Image as Img,
  // Image,
  Alert,
  Linking,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';
import styles from './styles';
// import * as Animatable from 'react-native-animatable';

import {Image} from 'react-native-elements';
// import {Icon} from 'native-base';
// import { Icon } from 'native-base';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  Header,
  Heading,
  CustomCalendar,
  RoundedButton,
  Renderdoctors,
} from '../../components';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';

class Labs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [
        // {},
        // {},
        // {},
      ],
      activeTab: 0,
      userData: this.props.userData,
    };
  }
  get_api_data() {
    const {userData, asistantData, doctorData} = this.state;
    console.log('userData', userData);

    var payload = new FormData();
    // payload.append('consultation_created_by', userData.signup_id);
    payload.append('consultation_doctor_id', userData.signup_id);
    Services.post('get_labs', {}, payload, true)
      .then(responseJson => {
        console.log('get_labs', responseJson);

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

  componentDidMount() {
    this.get_api_data();
  }

  onPressCall(userId) {
    const {userData} = this.state;

    // var payload = new FormData();
    // payload.append('to', userId);
    // payload.append('from', userData.signup_id);
    // Services.post('call_notify', {}, payload, true)
    //   .then(responseJson => {
    //     console.log('step_one_check_user_is_ready', responseJson);

    //     if (responseJson.status == 1) {
    //     }
    //   })
    //   .catch(error => {
    //     console.log('_error', error);

    //     // utils.showToast('Please check your internet connection');
    //     this.setState({
    //       loading: false,
    //     });
    //   });
  }

  _getdata = () => {
    const {searchText = '', data = []} = this.state;
    var _search = searchText.toLowerCase();
    return data.filter(item => {
      var itemName = item.labs_name.toLowerCase();
      return itemName.match(_search);
    });
  };

  _renderListing = ({item, index}) => {
    const {activeTab} = this.state;

    return (
      <View style={styles.labWrapper}>
        <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
          <Text
            style={{color: Constants.Colors.primaryBlue, fontWeight: 'bold'}}
            numberOfLines={1}>
            {item.labs_name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 15,
                marginTop: 3,
              }}>
              <View style={{padding: 1}}>
                <FontAwesome
                  name="phone"
                  type="FontAwesome"
                  style={{
                    fontSize: 13,
                    color: Constants.Colors.primaryBlue,
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${item.labs_contact}`);
                }}>
                <Text style={{fontSize: 10, paddingLeft: 5}}>
                  {item.labs_contact == ''
                    ? 'Not Available'
                    : item.labs_contact}
                </Text>
              </TouchableOpacity>
              {/* <Text
                  style={{
                    color: Constants.Colors.primaryBlue,
                    fontWeight: 'bold',
                  }}>
                  Call{' '}
                </Text> */}
            </View>

            {/* <Text style={{fontSize: 10}}>Area : {item.labs_area}</Text> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 15,
              paddingLeft: 5,
              marginTop: 10,
            }}>
            <View style={{padding: 1}}>
              <Entypo
                name="location-pin"
                type="Entypo"
                style={{
                  fontSize: 13,
                  color: Constants.Colors.primaryBlue,
                }}
              />
            </View>
            <TouchableOpacity onPress={() => this.onPressDirection(item)}>
              <Text numberOfLines={2} style={{fontSize: 10, paddingLeft: 5}}>
                {item.labs_address.trim()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: 85,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            flexDirection: 'row',
            marginTop: 45,
            backgroundColor: Constants.Colors.primaryBlue,
          }}>
          <TouchableOpacity onPress={() => this.onPressDirection(item)}>
            <Text style={{padding: 5, fontSize: 12, color: 'white'}}>
              Direction
            </Text>
          </TouchableOpacity>
          <View style={{padding: 1}}>
            <FontAwesome5
              name="directions"
              type="FontAwesome5"
              style={{
                fontSize: 15,
                color: 'white',
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  onPressDirection(item) {
    console.log('onPressDirection', item);

    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${item.labs_lat},${item.labs_long}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  }

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
          title="Labs"
          showBack={true}
          onLeftPress={() => {
            // console.log(' On left Press ');
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
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginBottom: 20,
                backgroundColor: Constants.Colors.backgrounGrey,

                // borderColor: 'white',
                // borderWidth: 2,
              }}>
              <Image
                source={Constants.video_doctor_banner}
                style={styles.bannerStyle}
              />
            </View>

            <View style={styles.profileContainer}>
              <Text style={styles.patienfoundStyle}>
                {data.length} Labs found
              </Text>

              <View style={styles.searchContainer}>
                <View style={styles.searchInputWrapper}>
                  <TextInput
                    style={styles.searchInput}
                    onChangeText={text => {
                      this.setState({searchText: text});
                    }}
                    placeholder="Search Labs"
                    returnKeyType="search"
                    value={this.state.searchText}
                  />
                </View>

                <View style={styles.filterWrapper}>
                  <FontAwesome
                    name="filter"
                    type="FontAwesome"
                    style={styles.searchIcon}
                  />
                </View>
                <View style={styles.searchWrapper}>
                  <AntDesign
                    name="search1"
                    type="AntDesign"
                    style={styles.fitlerIcon}
                  />
                </View>
              </View>
            </View>
            <View style={{paddingHorizontal: 20, marginTop: -30}}>
              <FlatList
                // data={this.state.data}
                data={this._getdata()}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderListing}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
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
  };
};
export default connect(mapStateToProps)(Labs);