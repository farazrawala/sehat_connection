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
  Image as Img,
  ActivityIndicator,
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


class AssistantAppointments extends PureComponent {
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
    payload.append('consultation_created_by', userData.signup_id);
    // payload.append('consultation_doctor_id', userData.signup_id);
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



  componentWillUnmount() {
    // Remove the event listener
    // this.focusListener.remove();
    this.focusListener();
  }

  componentDidMount() {
    // this.get_api_data();

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.get_api_data();
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
            </View>

            <View style={styles.textWrapper}>
              <Text style={styles.descTextSTyle}>
                Dr.{' '}
                {Utils.capitalizeFirstLetter(item.doctr[0].signup_firstname)}
              </Text>
              <Text style={styles.descTextSTyle}>{item.hospital_name}</Text>
              <Text style={styles.descTextSTyle}>
                {Utils.getCurrency(item.doctor_schedule_currency)}{' '}
                {item.doctor_schedule_fees}
              </Text>
              <Text style={styles.descTextSTyle}>
                {item.consultation_type == 0 ? 'Un Scheduled' : 'Scheduled'}
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <RoundedButton
              text="Consultation Detail"
              textColor={'white'}
              fontsize={12}
              customStyle={{
                marginTop: 15,
                marginHorizontal: 5,
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
    // men_avatar

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

    console.log('_renderListing', item);

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            // this.onPressTabActive(index);
          }}
          style={styles.sectionCotainer}>
          <View style={[styles.iconWrapper, {width: 35}]}>
            <Text style={styles.tokenStyle}>{item.consultation_token}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <TouchableOpacity
              onPress={() => {
                // this.onPressTabActive(index);
                // this.props.navigation.navigate('PatientProfile');
              }}>
              <Image
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

              {/* <View style={styles.searchContainer}>
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
                  <Icon
                    name="filter"
                    type="FontAwesome"
                    style={styles.searchIcon}
                  />
                </View>
                <View style={styles.searchWrapper}>
                  <Icon
                    name="search1"
                    type="AntDesign"
                    style={styles.fitlerIcon}
                  />
                </View>
              </View> */}
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
export default connect(mapStateToProps)(AssistantAppointments);
