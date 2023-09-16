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
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';
import styles from './styles';
// import * as Animatable from 'react-native-animatable';

import {Image} from 'react-native-elements';
// import {Icon} from 'native-base';
// import { Icon } from 'native-base';


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



// import Icon from "react-native-vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";




class Appointments extends PureComponent {
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
    // payload.append('consultation_is_paid', 1);
    Services.post('get_doctor_consultation', {}, payload, true)
      .then(responseJson => {
        console.log('get_doctor_consultation', responseJson);

        if (responseJson.status == 1) {
          this.setState({
            data: responseJson.data,
            // doctors: responseJson.doctors,
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

    var payload = new FormData();
    payload.append('to', userId);
    payload.append('from', userData.signup_id);
    Services.post('call_notify', {}, payload, true)
      .then(responseJson => {
        console.log('step_one_check_user_is_ready', responseJson);

        if (responseJson.status == 1) {
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
  _onPressConsultationStatus(consultation_id, status) {
    // consultation_id

    this.setState({loading: true});
    const {userData} = this.state;

    var payload = new FormData();
    payload.append('consultation_consult_status', status);
    payload.append('consultation_id', consultation_id);
    Services.post('update_consultation_status', {}, payload, true)
      .then(responseJson => {
        console.log('step_one_check_user_is_ready', responseJson);

        if (responseJson.status == 1) {
          this.setState({loading: false});
          Utils.showToastMessage(
            'Consultation status has been updated successfully.',
          );
          this.get_api_data();
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

  renderDetailView = (index, item) => {
    const {activeTab, data} = this.state;
    if (index == activeTab) {
      return (
        <View style={styles.descriptionContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.textWrapper}>
              <Text style={styles.descTextSTyle}>Consultation Clinic : </Text>
              <Text style={styles.descTextSTyle}>Consultation Fee : </Text>
              <Text style={styles.descTextSTyle}>Consultation Type : </Text>
              {/* <Text style={styles.descTextSTyle}>By : </Text> */}
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.descTextSTyle}>{item.hospital_name}</Text>
              <Text style={styles.descTextSTyle}>
                {Utils.getCurrency(item.doctor_schedule_currency)}{' '}
                {item.consultation_fee}
              </Text>
              <Text style={styles.descTextSTyle}>
                {item.consultation_type == 0 ? 'Unscheduled' : 'Scheduled'}
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', paddingLeft: 15}}>
            {/* <RoundedButton
              text="Audio Call"
              textColor={'white'}
              fontsize={12}
              customStyle={{
                marginTop: 15,
                padding: 3,
                marginHorizontal: 3,
                backgroundColor: Constants.Colors.primaryGreen,
              }}
              handleOnPress={() => {
                // this.props.navigation.navigate('ConsultationDetail');
                // this.onPressSignup();
              }}
            /> */}

            {/* <RoundedButton
              text="Mark as Attended"
              textColor={'white'}
              fontsize={12}
              customStyle={{
                marginTop: 15,
                padding: 3,
                marginHorizontal: 3,
                backgroundColor: Constants.Colors.primaryGreen,
              }}
              handleOnPress={() => {
                Alert.alert(
                  '',
                  'Are you sure you want to mark this consultations as attended ?',
                  [
                    {
                      text: 'No',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        this._onPressConsultationStatus(
                          item.consultation_id,
                          2,
                        );
                      },
                    },
                  ],
                );
              }}
            />

            <RoundedButton
              text="Cancel"
              textColor={'white'}
              fontsize={12}
              customStyle={{
                marginTop: 15,
                padding: 3,
                marginHorizontal: 3,
                backgroundColor: Constants.Colors.primaryGreen,
              }}
              handleOnPress={() => {
                Alert.alert(
                  '',
                  'Are you sure you want to cancel this consultation ?',
                  [
                    {
                      text: 'No',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        this._onPressConsultationStatus(
                          item.consultation_id,
                          4,
                        );
                      },
                    },
                  ],
                );
              }}
            /> */}

            {/* <RoundedButton
              text="Video Call"
              textColor={'white'}
              fontsize={12}
              customStyle={{
                marginTop: 15,
                padding: 3,
                marginHorizontal: 3,
                backgroundColor: Constants.Colors.primaryGreen,
              }}
              handleOnPress={() => {
                this.onPressCall(item.consultation_created_by);
              }}
            /> */}

            {/* <RoundedButton
              text="Video Call"
              textColor={'white'}
              fontsize={12}
              customStyle={{
                marginTop: 15,
                padding: 3,
                marginHorizontal: 3,
                backgroundColor: Constants.Colors.primaryGreen,
              }}
              handleOnPress={() => {
                this.onPressCall(item.consultation_created_by);
              }}
            /> */}

            <RoundedButton
              text="More Info"
              textColor={'white'}
              fontsize={12}
              customStyle={{
                marginTop: 15,
                padding: 3,
                marginHorizontal: 3,
                backgroundColor: Constants.Colors.primaryGreen,
              }}
              handleOnPress={() => {
                this.props.navigation.navigate('ConsultationDetail', {item});
                // this.onPressSignup();
              }}
            />
          </View>
        </View>
      );
    }
  };

  onPressTabActive(tab) {
    const {activeTab} = this.state;
    if (activeTab == tab) {
      this.setState({activeTab: 9999});
    } else {
      this.setState({activeTab: tab});
    }
  }

  //

  _renderSuggestion = ({item, index}) => {
    const {activeTab} = this.state;
    return (
      <View style={styles.suggestionWrapper}>
        <Text>lksjflka</Text>
      </View>
    );
  };

  _renderListing = ({item, index}) => {
    const {activeTab} = this.state;

    var userImage = '';
    if (
      item.signup_image != '' &&
      item.signup_image != null &&
      item.signup_image != 'undefined'
    )
      userImage = Constants.url + item.signup_image_path + item.signup_image;
    else if (item.signup_gendar == 'male')
      userImage = Constants.imgBaseUrl + 'men_avatar.png';
    else if (item.signup_gendar == 'female')
      userImage = Constants.imgBaseUrl + 'female_avatar.png';
    else userImage = Constants.imgBaseUrl + 'other_avatar.png';

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            // this.onPressTabActive(index);
          }}
          style={styles.sectionCotainer}>
          <View style={[styles.iconWrapper, {width: 35}]}>
            {/* <Image
                source={Constants.scheduled_icon}
                style={styles.tabIconStyle}
              /> */}
            <Text style={styles.tokenStyle}>{item.consultation_token}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <TouchableOpacity
              onPress={() => {
                // this.onPressTabActive(index);
                // this.props.navigation.navigate('PatientProfile');
              }}>
              <Image
                // source={Constants.men_avatar}
                source={{
                  uri: userImage,
                }}
                PlaceholderContent={<ActivityIndicator />}
                style={styles.avatarStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.centerTextWrapper}>
            <Text numberOfLines={1} style={styles.tabTextStyle}>
              {Utils.capitalizeFirstLetter(item.signup_firstname)}{' '}
              {Utils.capitalizeFirstLetter(item.signup_lastname)}
            </Text>
            <Text style={styles.dateTextStyle}>
              {item.consultation_createdon}{' '}
            </Text>
          </View>
          <View style={styles.iconWrapper}>
            <TouchableOpacity
              onPress={() => {
                this.onPressTabActive(index);
              }}>
              <Img
                source={Constants.downArrow}
                style={[
                  styles.downArrowStyle,
                  {
                    transform: [
                      {rotate: activeTab == index ? '180deg' : '0deg'},
                    ],
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {this.renderDetailView(index, item)}
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
    } = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title="Waiting List"
          showBack={true}
          onLeftPress={() => {
            // console.log(' On left Press ');
            // this.props.navigation.goBack();
            this.props.navigation.navigate('App');
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
            <View style={styles.profileContainer}>
              <Text style={styles.patienfoundStyle}>
                {data.length} consultations found
              </Text>

              <View style={styles.searchContainer}>
                <View style={styles.searchInputWrapper}>
                  <TextInput
                    style={styles.searchInput}
                    onChangeText={text => {
                      this.setState({searchText: text});
                    }}
                    placeholder="Search Patients"
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

            <FlatList
              data={this.state.data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderListing}
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
  };
};
export default connect(mapStateToProps)(Appointments);
