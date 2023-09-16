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
} from 'react-native';
import styles from './styles';

// import {Icon} from 'native-base';
// // import { Icon } from 'native-base';
import {
  Header,
  CustomInput,
  CustomCalendar,
  RoundedButton,
  Renderdoctors,
} from '../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';


import AntDesign from "react-native-vector-icons/AntDesign";

class DoctorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      userData: this.props.userData,
      modalVisible: false,
      searchMember: '',
      tags: [],
     
      shift: this.props.route.params.doctor.shift,
      doctor: this.props.route.params.doctor,
      status: this.props.route.params.online,
      item: this.props.route.params.doctor,
      rating: this.props.route.params.rating,
      
    };

    // console.log('_shift_', props);
    console.log('_shift_1',this.props.route.params);
  }

  componentDidMount() {
    const {doctor} = this.state;

    console.log('doctor.signup_doctor_tags', doctor.signup_doctor_tags);
    if (doctor.signup_doctor_tags.trim() != '') {
      var tags = doctor.signup_doctor_tags.split(',');
      console.log('_doctor_tags', tags);
      // if (tag != '')
      if (tags.length > 0) this.setState({tags});
    }
  }

  renderModal() {
    const {modalVisible, searchMember, loading} = this.state;
    return (
      <View style={styles.modalContainer}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({modalVisible: false});
                }}
                style={styles.crossBtnWrapper}>
                <Text style={styles.crossTxtStyle}>X</Text>
              </TouchableOpacity>

              <Text style={styles.modalText}>
                Enter patient's contact number.
              </Text>
              <TextInput
                style={styles.numberInputStyle}
                keyboardType="number-pad"
                onChangeText={text => {
                  this.setState({searchMember: text});
                }}
                onSubmitEditing={() => {
                  // onSubmitEditing = {onSubmitEditing};
                  this.onPressSearchMemberBtn();
                }}
                maxLength={11}
                placeholder="Phone Number"
                value={searchMember}
              />

              <RoundedButton
                text="Search"
                textColor={'white'}
                fontsize={18}
                customStyle={{
                  width: 200,
                  height: 40,
                  marginTop: 50,
                }}
                handleOnPress={() => {
                  this.onPressSearchMemberBtn();
                }}
              />
            </View>
          </View>

          {Utils.showSpinner(loading)}
        </Modal>
      </View>
    );
  }

  onPressSearchMemberBtn = () => {
    const {searchMember, selectedDoctor} = this.state;
    if (searchMember.length < 11) {
      // Utils.showToastMessage("");
      alert('Number cannot be less than 11 digits');
    } else {
      this.setState({
        loading: true,
      });
      var payload = new FormData();
      payload.append('signup_contact', searchMember);
      Services.post('find_member', {}, payload, true)
        .then(responseJson => {
          console.log('find_member', responseJson);

          if (responseJson.status == 1) {
            this.props.navigation.navigate('patientFound', {
              selectedDoctor,
              members: responseJson.data,
              searchMember,
            });
            this.setState({
              loading: false,
              modalVisible: false,
            });
          } else {
            this.props.navigation.navigate('addMember', {
              selectedDoctor,
              searchMember,
              members: responseJson.data,
            });
            this.setState({
              loading: false,
              modalVisible: false,
            });
            // this.createConsultation();
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

    // this.setState({ modalVisible: !modalVisible })
    // this.props.navigation.navigate('patientFound')
  };

  _renderTags = ({item, index}) => {
    return <Text>hello world</Text>;
  };

  onRequestConsultationPress = item => {
    const {userData} = this.state;
    console.log('userData.signup_type', userData.signup_type);
    // return false;

    if (userData.signup_type == 2) {
      this.setState(
        {searchMember: userData.signup_contact, selectedDoctor: item},
        () => this.onPressSearchMemberBtn(),
      );
    } else {
      this.setState({modalVisible: true, selectedDoctor: item});
    }
    console.log('onRequestConsultationPressindex', item);
  };

  // "1"=>"Monday",
  // "2" => "Tuesday",
  // "3" => "Wednesday",
  // "4" => "Thursday",
  // "5" => "Friday",
  // "6" => "Saturday",
  // "0" => "Sunday",
  renderShift = ({item, index}) => {
    var day = 'Monday';
    if (item.doctor_schedule_day_id == 1) day = 'Mon';
    if (item.doctor_schedule_day_id == 2) day = 'Tues';
    if (item.doctor_schedule_day_id == 3) day = 'Wed';
    if (item.doctor_schedule_day_id == 4) day = 'Thurs';
    if (item.doctor_schedule_day_id == 5) day = 'Fri';
    if (item.doctor_schedule_day_id == 6) day = 'Sat';
    if (item.doctor_schedule_day_id == 0) day = 'Sun';

    var tempstart = 'PM';
    var timeStart = parseInt(item.doctor_schedule_start_time);
    if (timeStart < 1200) {
      tempstart = 'AM';
      timeStart = timeStart / 100;
    } else {
      timeStart = timeStart - 1200;
      timeStart = timeStart / 100;
    }

    var tempend = 'PM';
    var timEnds = parseInt(item.doctor_schedule_end_time);
    if (timEnds < 1200) {
      tempend = 'AM';
      timEnds = timEnds / 100;
    } else {
      timEnds = timEnds - 1200;
      timEnds = timEnds / 100;
    }
    if (timeStart == 0) timeStart = 12;

    timeStart = timeStart.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    timEnds = timEnds.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    return (
      <View style={styles.shiftWrapper}>
        <Text style={[styles.shiftText, {fontSize: 15}]}>{day} :</Text>
        <Text style={styles.shiftText}>
          {timeStart}:{tempstart} - {timEnds}:{tempend}
        </Text>
      </View>
    );
  };

  render() {
    const {
      loading,
      doctor,
      loadsData = [],
      item,
      showDatePicker,
      dateTimeModalType,
    } = this.state;

    var userImage = '';

    if (doctor.signup_image != '' && doctor.signup_image != null)
      userImage =
        Constants.url + doctor.signup_image_path + doctor.signup_image;
    else if (doctor.signup_gendar == 'male')
      userImage = Constants.imgBaseUrl + 'avatar_male.jpeg';
    else if (doctor.signup_gendar == 'female')
      userImage = Constants.imgBaseUrl + 'avatar_female.jpeg';

    // console.log('Doctor_image', userImage);

    return (
      <View style={styles.Container}>
        <Header
          title="Doctor's Profile"
          showBack={true}
          onLeftPress={() => {
            this.props.navigation.goBack();
          }}
        />

        {this.renderModal()}

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Constants.Colors.backgrounGrey,
          }}
          // bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.desContainer}>
            <View style={styles.profileBgWrapper}>
              <Image
                source={Constants.doctorProfileBg}
                style={styles.backgroundImageStyle}
              />
              <Image
                source={{
                  uri: userImage,
                }}
                style={styles.doctorAvatarStyle}
              />
              <Text style={styles.profileHeadingStyle}>
                Dr. {Utils.capitalizeFirstLetter(doctor.signup_firstname)}
              </Text>
              <Text style={styles.profileTitleStyle}>
                {doctor.category_name}
              </Text>
              <TouchableOpacity
                onPress={() => this.onRequestConsultationPress(item)}>
                {this.state.status ? (
                  <View style={styles.consultBtnWrapper}>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        marginLeft: 3,
                        height: 45,
                        borderRadius: 8,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: Constants.Colors.primaryBlue,
                        }}>
                        BOOK VIDEO CONSULTATION
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // backgroundColor: 'red',
                      }}>
                      <AntDesign
                        name="doubleright"
                        type="AntDesign"
                        style={styles.arrowIcon}
                      />
                    </View>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoWrapper}>
                <Text style={styles.infoText}>Experience</Text>
                <Text style={styles.infoText}>
                  {Math.round(doctor.diff_day / 365)} + Years
                </Text>
              </View>

              <View style={styles.infoWrapper}>
                <Text style={styles.infoText}>Rating</Text>
                <Text style={styles.infoText}>{this.state.rating}</Text>
              </View>

              <View style={styles.infoWrapper}>
                <Text style={styles.infoText}>Fees</Text>
                <Text style={styles.infoText}>
                  Rs {doctor.doctor_schedule_fees}/-
                </Text>
              </View>
            </View>

            <View style={styles.textWrapper}>
              <Text style={styles.textInfoStyle}>{doctor.signup_detail}</Text>
            </View>

            <View style={styles.tagsWrapper}>
              <Text style={styles.profileHeadingStyle}>Speciality : </Text>
              <FlatList
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                data={this.state.tags}
                renderItem={({item}) => (
                  <View style={styles.symtomsWrapper}>
                    <Text style={styles.symptontextSytle}>{item.trim()}</Text>
                  </View>
                )}
              />
            </View>

            <View style={styles.tagsWrapper}>
              <Text style={styles.profileHeadingStyle}>Shift Timings : </Text>
              <FlatList
                data={this.state.shift}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderShift}
                scrollEnabled={true}
                numColumns={3}
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
export default connect(mapStateToProps)(DoctorProfile);
