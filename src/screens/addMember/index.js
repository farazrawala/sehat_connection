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
import Services from '../../apis/services';
// import {Icon} from 'native-base';
// import { Icon } from 'native-base';
import {
  Header,
  PatientModal,
  CustomInput,
  // Camera,
  RoundedButton,
  Renderdoctors,
} from '../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {NavigationActions, StackActions} from 'react-navigation';
import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';

import * as actions from '../../actions';
// import {s} from 'react-native-size-matters';

class AddMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userData: [],
      searchMember: this.props.route.params.searchMember,
      memberData: [],
      modalVisible: false,
      consultationRecord: [],
      loadsData: [],
      ativeSearchTab: 1,
      profileimg: '',
      isPatientModal: false,
      imageUpload: '',
      uploadedImgUrl: 'https://reactnative.dev/img/tiny_logo.png',
      isUploadedImg: false,

      selectData: [
        {id: 'Male', value: 'Male'},
        {id: 'Female', value: 'Female'},
        {id: 'Other', value: 'Other'},
      ],
      selectAgeData: [
        {id: 'Year', value: 'Year'},
        {id: 'Month', value: 'Month'},
      ],
      gender: '',
      ageType: 'Year',

      showDatePicker: false,
      type: 'date',
      dateValuePickUpDate: 'mm-dd-YYYY',
      categoryData: [
        {
          screen: 'allLoads',
          jobMode: 'load',
          title: 'Video Consultation',
          color: '#f6d367',
          icon: Constants.video_consultation_icon,
          batch: 0,
        },
      ],
      doctors: [
        {
          name: 'Dr. Owais Khan',
          title: 'Cardioligist',
          hospital: 'Agha Khan',
          fees: 1200,
        },
        {
          name: 'Dr. Moona Shah',
          title: 'Neuro Surgeon',
          hospital: 'Liaquat National',
          fees: 1200,
        },
        {
          name: 'Dr. Samina Humayun',
          title: 'Physician',
          hospital: 'Civl Hopsital',
          fees: 1200,
        },
      ],
    };

    // console.log('add_members_', this.props);
  }

  componentDidMount() {
    // setInterval(() => {
    //   categoryData.push({ screen: 'setting', title: 'Settings2', color: '#cb92c8', icon: Constants.icon_settings, batch: 0 })
    //   this.setState({ categoryData: categoryData })
    // }, 10000);
  }

  _onItemPress(value) {
    // console.log('_onItemPress', value);
  }

  onRequestConsultationPress = index => {
    console.warn('index', index);
  };
  _renderTabsView() {
    const {doctors} = this.state;
    // const { }

    return (
      <Renderdoctors
        _data={doctors}
        onRequestConsultationPress={value => {
          this.setState({modalVisible: true});
          // console.warn('value++', value);
        }}
      />
    );
  }

  _showDatePicker = (type = 1, dateTimeModalType = 'date') => {
    this.setState({showDatePicker: true, type, dateTimeModalType});

    console.log('dateTimeModalType', dateTimeModalType);
  };

  createConsultation() {
    const {
      uploadedImg,
      memberData,
      dateValuePickUpDate,
      fname,
      lname,
      email,
    } = this.state;

    // console.log('memberData', memberData);

    var payload = new FormData();
    var selectedDoctor = Utils.getSelectedDoctor();

    payload.append('consultation_user_id', memberData.signup_id);
    payload.append('consultation_hospital_id', selectedDoctor.hospital_id);
    payload.append('consultation_doctor_id', selectedDoctor.signup_id);
    payload.append('consultation_shift_id', selectedDoctor.shift_id);
    // payload.append('consultation_schedule_id', selectedDoctor.shift_id);
    var header = {};
    console.log('create_consultation payload ', payload);
    Services.post('create_consultation', header, payload, true)
      .then(responseJson => {
        console.log('addmember login', responseJson);
        if (responseJson.status == 1) {
          Utils.showToastMessage('Consultation addd successfully.');

          this.setState({
            isPatientModal: true,
            consultationRecord: responseJson.data,
          });
        }
      })
      .catch(error => {
        console.log('error', error);

        this.setState({
          loading: false,
        });
      });
  }
  onPressSubmit() {
    const {
      uploadedImg,
      memberData,
      dateValuePickUpDate = 'mm-dd-YYYY',
      fname = '',
      lname = '',
      email = '',
      age = '',
      searchMember,
      ageType = 'Year',
    } = this.state;

    // console.log(searchMember, 'searchMember');
    // return false;

    if (fname == '') {
      Utils.showToastMessage('First name cannot be empty.', 'danger');
      return;
    } else if (lname == '') {
      Utils.showToastMessage('Last name cannot be empty.', 'danger');
      return;
    } else {
      this.setState({loading: true});
      var payload = new FormData();
      payload.append('signup_firstname', fname);
      payload.append('signup_lastname', lname);
      payload.append('signup_age', age);
      payload.append('signup_age_type', ageType);
      payload.append('signup_type', 4);

      payload.append('signup_dob', dateValuePickUpDate);
      payload.append('signup_email', email);
      payload.append('signup_contact', searchMember);
      payload.append('signup_image', uploadedImg);

      var header = {};
      console.log('payload', payload);

      Services.post('addmember', header, payload, true)
        .then(responseJson => {
          if (responseJson.status == 1) {
            this.setState({
              memberData: responseJson.data,
            });
            Utils.showToastMessage('Member addd successfully.');
            // this.createConsultation();
            this.props.navigation.navigate('MedicalHistory', {
              consultation_user_id: responseJson.data.signup_id,
            });
          }
        })
        .catch(error => {
          console.log('error', error);

          this.setState({
            loading: false,
          });
        });
    }
  }
  onUpdateProfile() {
    const {profileimg} = this.state;

    console.log('profileimg', profileimg);

    var payload = new FormData();
    payload.append('signup_image', {
      uri: profileimg,
      name: 'image',
      type: 'image/jpeg',
    });

    var header = {
      'Content-Type': 'multipart/form-data',
    };

    console.log('payload image upload', payload);

    Services.post('addmember', header, payload, true)
      .then(responseJson => {
        console.log('addmember image upload', responseJson);

        this.setState({
          loading: false,
          isUploadedImg: true,
          uploadedImg: responseJson.file_name,
          uploadedImgUrl: responseJson.img_path,
          // Constants.imgBaseUrl + "user/members/" +
        });

        // console.log('new pateh -=-=  ', this.state.uploadedImgUrl);
      })
      .catch(error => {
        console.log('error', error);

        this.setState({
          loading: false,
        });
      });
  }

  handleConfirm = date => {
    var d = moment(date).format('YYYY-MM-DD');

    if (this.state.type == 1) {
      this.setState({
        maxDate: date,
        dateValueTo: 'YYYY-MM-DD',
        dateValuePickUpDate: d,
        showDatePicker: false,
      });
    }
  };

  render() {
    const {
      loading,
      memberData,
      consultationRecord,
      isPatientModal,
      isUploadedImg = true,
      uploadedImgUrl,
      imageUpload,
      profileimg,
      age,
      loadsData = [],
      showDatePicker,
      birthDate = '01-02-2021',
      dateTimeModalType,
    } = this.state;

    return (
      <View style={styles.Container}>
        {/* <PatientModal
          modalVisible={isPatientModal}
          data={consultationRecord}
          userData={memberData}
          onReturnHome={() => {

            const resetAction = StackActions.reset({
              index: 0,
              actions: [StackActions.reset({ routeName: 'App' })],
            });
            this.props.navigation.dispatch(resetAction);

          }}
        /> */}

        {/* <Header
          title="Add a Member"
          showBack={true}
          onLeftPress={() => {
            // console.log(' On left Press ');
            this.props.navigation.goBack();
          }}
        /> */}

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Constants.Colors.backgrounGrey,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          {/* <DateTimePickerModal
            isVisible={true}
            mode={'date'}
            // onConfirm={this.handleConfirm}
            // onCancel={this.hideDatePicker}
          /> */}

          <View style={styles.desContainer}>
            {/* <Camera
              getImages={value => {
                var img = value.path || value[0].path;
                console.log('getImages_value', value);
                this.setState({profileimg: img}, function() {
                  this.onUpdateProfile();
                });
              }}>
              <View style={styles.profileWrapper}>
                {isUploadedImg ? (
                  <Image
                    style={styles.profileImgStyle}
                    source={{uri: uploadedImgUrl}}
                  />
                ) : (
                  <Image
                    source={Constants.cameraIcon}
                    style={styles.cameraImgStyle}
                  />
                )}

                <Image source={Constants.plus} style={styles.plusIconStyle} />
              </View>
            </Camera> */}

            <View
              style={{
                flexDirection: 'row',
                width: Constants.ScreenWidth,
                // backgroundColor: 'red',
                paddingHorizontal: 10,
                marginTop: 30,
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 1, paddingHorizontal: 10}}>
                <CustomInput
                  isDropdown={false}
                  keyboard={'default'}
                  label={'First name'}
                  inputPlaceHoler={'Enter first name'}
                  inputRef={'fname'}
                  ref={'fname'}
                  maxLength={16}
                  defaulValue={this.state.fname}
                  returnKeyType={'next'}
                  onChangeText={fname => this.setState({fname})}
                />
              </View>
              <View style={{flex: 1, paddingHorizontal: 10}}>
                <CustomInput
                  isDropdown={false}
                  keyboard={'default'}
                  label={'Last name'}
                  inputPlaceHoler={'Enter last name'}
                  inputRef={'lname'}
                  ref={'lname'}
                  maxLength={16}
                  defaulValue={this.state.lname}
                  returnKeyType={'next'}
                  onChangeText={lname => this.setState({lname})}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: Constants.ScreenWidth,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 1, paddingHorizontal: 10}}>
                <CustomInput
                  isDropdown={false}
                  keyboard={Constants.Keyboard.number}
                  label={'Age'}
                  inputPlaceHoler={'Enter age'}
                  inputRef={'age'}
                  ref={'age'}
                  maxLength={3}
                  defaulValue={this.state.age}
                  returnKeyType={'next'}
                  onChangeText={age => this.setState({age})}
                />
              </View>

              {/* <View style={{flex: 1, paddingHorizontal: 10}}>
                <CustomInput
                  label={'Age Type'}
                  isRequired={true}
                  isIcon={false}
                  isDropdown={true}
                  inputMode={1}
                  compType={'mapInput'}
                  selectedVal={this.state.ageType}
                  onPress={value => {
                    console.log('on press ', value);
                  }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ageType: itemValue});
                  }}
                  data={this.state.selectAgeData}
                />
              </View> */}
            </View>

            <View
              style={{
                flex: 1,
                // borderWidth: 1,
                flexDirection: 'row',
                width: Constants.ScreenWidth,
                paddingHorizontal: 10,
              }}>
              {/* <View style={{flex: 1, paddingHorizontal: 10}}>
                <CustomInput
                  label={'Gender'}
                  isRequired={true}
                  isIcon={false}
                  isDropdown={true}
                  inputPlaceHoler={'Select own Trucker'}
                  inputMode={1}
                  compType={'mapInput'}
                  selectedVal={this.state.gender}
                  onPress={value => {
                    console.log('on press ', value);
                  }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({gender: itemValue});
                  }}
                  data={this.state.selectData}
                />
              </View> */}
              <View style={{flex: 1, paddingHorizontal: 10}}>
                <CustomInput
                  isDropdown={false}
                  keyboard={'default'}
                  label={'Email'}
                  inputPlaceHoler={'Enter email address (optional)'}
                  inputRef={'email'}
                  ref={'email'}
                  // maxLength={16}
                  defaulValue={this.state.email}
                  returnKeyType={'next'}
                  onChangeText={email => this.setState({email})}
                />
              </View>
            </View>

            <View style={{width: '100%', marginTop: 20}}>
              <RoundedButton
                text="Add Member"
                textColor={'white'}
                fontsize={18}
                customStyle={{
                  width: '100%',
                  height: 40,
                }}
                handleOnPress={() => {
                  this.onPressSubmit();
                }}
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
export default connect(mapStateToProps)(AddMember);
