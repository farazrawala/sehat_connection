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
  ActivityIndicator,
  Image as Img,
  KeyboardAvoidingView,
  Keyboard,
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


import FontAwesome from "react-native-vector-icons/FontAwesome";



import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';

class ConsultationHistory extends PureComponent {
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
    // console.log('redirectConsultId_', this.props.navigation.state.params);
  }
  get_api_data() {
    const {userData, asistantData, doctorData} = this.state;
    console.log('userData', userData);

    var payload = new FormData();

    console.log('userData_conhistory', userData);

    if (userData.signup_type == 1)
      payload.append('consultation_doctor_id', userData.signup_id);
    else {
      payload.append('consultation_created_by', userData.signup_id);
    }

    payload.append('history', 1);
    Services.post('get_doctor_consultation', {}, payload, true)
      .then(responseJson => {
        console.log('get_doctor_consultation', responseJson);

        if (responseJson.status == 1) {
          this.setState({
            data: responseJson.data.reverse(),
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

  routeScreen() {
    // if (
    //   this.props.navigation.state.params &&
    //   this.props.navigation.state.params.redirectConsultId > 0
    // ) {
    //   console.log('redirect');
    //   // this.props.navigation.navigate('ConsultationHistory');
    //   // this.props.navigation.navigate('ConsultationHistory', {
    //   //   redirectConsultId: 13,
    //   // });
    // }
  }

  componentDidMount() {
    // this.get_api_data();

    this.get_api_data();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.get_api_data();
    });

    this.routeScreen();
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
  _onPressConsultationStatus(consultation_id, status = 3) {
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
              <Text style={styles.descTextSTyle}>Consultation With : </Text>
              <Text style={styles.descTextSTyle}>Consultation Clinic : </Text>
              <Text style={styles.descTextSTyle}>Consultation Fee : </Text>
              <Text style={styles.descTextSTyle}>Consultation Type : </Text>
              {/* <Text style={styles.descTextSTyle}>By : </Text> */}
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.descTextSTyle}>
                Dr.{' '}
                {Utils.capitalizeFirstLetter(item.doctr[0].signup_firstname)}{' '}
              </Text>
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
            <RoundedButton
              text="Move to Waiting List"
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
                  'Are You sure you want to move this consultation back to waiting List ?',
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
                          0,
                        );
                      },
                    },
                  ],
                );
              }}
            />

            <RoundedButton
              text="Consultation Detail"
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
  renderPendingText(id) {
    if (id == 1) return 'Completed';
    if (id == 2) return 'Attended (Face to Face)';
    if (id == 3) return 'Did not attend';
    if (id == 4) return 'Cancelled';
    else return id;
  }
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

    console.log('userImage_', userImage);

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
                style={styles.avatarStyle}
                PlaceholderContent={<ActivityIndicator />}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.centerTextWrapper}>
            <View style={{flexDirection: 'row'}}>
              <Text numberOfLines={1} style={styles.tabTextStyle}>
                {Utils.capitalizeFirstLetter(item.signup_firstname)}{' '}
                {Utils.capitalizeFirstLetter(item.signup_lastname)}{' '}
                {/* {item.consultation_id} */}
              </Text>
            </View>
            <Text style={styles.dateTextStyle}>
              {item.consultation_createdon}{' '}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color:
                  item.consultation_consult_status == 4
                    ? 'red'
                    : Constants.Colors.primaryBlue,
                marginVertical: 3,
              }}>
              {this.renderPendingText(item.consultation_consult_status)}
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
          title="Consultation History"
          showBack={true}
          onLeftPress={() => {
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
                {data.length} patients found
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
                  <FontAwesome
                    name="search"
                    type="FontAwesome"
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
export default connect(mapStateToProps)(ConsultationHistory);
