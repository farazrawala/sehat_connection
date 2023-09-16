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
// import { Icon } from 'native-base';
import {
  Header,
  PatientModal,
  RoundedButton,
  CustomText,
  Categories,
  Renderdoctors,
} from '../../components';
import {NavigationActions, StackActions} from 'react-navigation';
import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';



// import Icon from "react-native-vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";


class Doctors extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;

    this.state = {
      isPatientModal: false,
      memberData: {},
      consultationRecord: {},
      loading: true,

      categoryActive: 0,
      userData: this.props.userData,
      modalVisible: false,
      loadsData: [],
      searchMember: '',

      isTabVisible: true,
      ativeSearchTab: 1,
      selectedDoctor: {},
      categoryData: [],
      doctors: [],
      doctors_offline: [],
    };
  }

  get_api_data() {
    var payload = new FormData();
    Services.get('get_category', {}, payload, true)
      .then(responseJson => {
        console.log('get_category', responseJson);

        if (responseJson.status == 1) {
          this.setState({
            categoryData: responseJson.data,
            doctors: responseJson.doctors,
            doctors_offline: responseJson.doctors_offline,
            loading: false,
          });
        }
        // console.log('categoryData', this.state.categoryData);
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

    const {userData} = this.state;

    if (userData.signup_type == 2) {
      this.setState({
        searchMember: userData.signup_contact,
      });
    }

    // console.log('UserData__', userData);

    // setInterval(() => {
    //   categoryData.push({ screen: 'setting', title: 'Settings2', color: '#cb92c8', icon: Constants.icon_settings, batch: 0 })
    //   this.setState({ categoryData: categoryData })
    // }, 10000);
  }

  _renderCategories = () => {
    const {categoryData = [], categoryActive} = this.state;
    return (
      <Categories
        categoryActive={categoryActive}
        _data={categoryData}
        onPressCategory={value => {
          // console.log('Press_category', value);
          this.setState({categoryActive: value});
        }}
      />
    );
  };

  _onItemPress(value) {
    // console.log('_onItemPress', value);
  }

  _renderTabs() {
    const {ativeSearchTab} = this.state;

    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => {
            this.setState({ativeSearchTab: 1});
          }}
          style={[
            styles.tabWrapper,
            {
              backgroundColor:
                ativeSearchTab == 1 ? Constants.Colors.primaryGreen : 'white',
            },
          ]}>
          <AntDesign
            name="wifi"
            // type="AntDesign"
            style={[
              styles.tabIcon,
              {
                color:
                  ativeSearchTab == 1 ? 'white' : Constants.Colors.lightGrey,
              },
            ]}
          />
          <Text
            style={[
              styles.tabHeading,
              {
                color:
                  ativeSearchTab == 1 ? 'white' : Constants.Colors.lightGrey,
              },
            ]}>
            LIVE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.setState({ativeSearchTab: 2});
          }}
          style={[
            styles.tabWrapper,
            {
              backgroundColor:
                ativeSearchTab == 2 ? Constants.Colors.primaryGreen : 'white',
            },
          ]}>
          <MaterialIcons
            name="schedule"
            type="MaterialIcons"
            style={[
              styles.tabIcon,
              {
                fontsize: 14,
                color:
                  ativeSearchTab == 2 ? 'white' : Constants.Colors.lightGrey,
              },
            ]}
          />
          <Text
            style={[
              styles.tabHeading,
              {
                color:
                  ativeSearchTab == 2 ? 'white' : Constants.Colors.lightGrey,
              },
            ]}>
            SCHEDULE
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  onRequestConsultationPress = item => {
    // console.log('Item', item);
    const {userData} = this.state;
    if (userData.signup_type == 2) {
      this.setState({selectedDoctor: item}, () =>
        this.onPressSearchMemberBtn(),
      );
    } else {
      this.setState({modalVisible: true, selectedDoctor: item});
    }
    //

    // console.log('onRequestConsultationPress+index', index);
  };
  _onPressDoctor = (doctor, rating, online = true) => {
    console.log('doctor_item', doctor);
    this.props.navigation.navigate('DoctorProfile', {doctor, rating, online});
  };
  _renderOfflineView() {
    const {doctors_offline, categoryActive} = this.state;
    return (
      <Renderdoctors
        onPressDoctor={(value, value1) => {
          this._onPressDoctor(value, value1, false);
          Utils.setSelectedDoctor(value);
        }}
        online={false}
        categoryActive={categoryActive}
        // _data={this._getOfflineDoctorsSearch()}
        _data={this._getDoctorsSearch(doctors_offline)}
        onRequestConsultationPress={value => {
          this.onRequestConsultationPress(value);
          Utils.setSelectedDoctor(value);
        }}
      />
    );
  }

  _renderTabsView() {
    const {doctors, categoryActive} = this.state;
    // const { }

    return (
      <Renderdoctors
        onPressDoctor={(value, value1) => {
          this._onPressDoctor(value, value1, true);
          Utils.setSelectedDoctor(value);
        }}
        categoryActive={categoryActive}
        _data={this._getDoctorsSearch(doctors)}
        onRequestConsultationPress={value => {
          this.onRequestConsultationPress(value);
          Utils.setSelectedDoctor(value);
          // console.log('Utils_getSelectedDoctor', Utils.getSelectedDoctor());
          // return false;
        }}
      />
    );
  }

  _getDoctorsSearch = _data => {
    const {searchText = '', doctors = []} = this.state;
    var _search = searchText.toLowerCase();
    return _data.filter(item => {
      var itemName = item.signup_firstname.toLowerCase();
      return itemName.match(_search);
    });
  };

  createConsultation() {
    const {
      uploadedImg,
      userData = [],
      memberData,
      dateValuePickUpDate,
      fname,
      lname,
      email,
    } = this.state;

    // console.log(' createConsultation UserData', UserData);

    var payload = new FormData();
    var selectedDoctor = Utils.getSelectedDoctor();

    payload.append('consultation_user_id', userData.signup_id);
    payload.append('consultation_hospital_id', selectedDoctor.hospital_id);
    payload.append('consultation_doctor_id', selectedDoctor.signup_id);
    payload.append('consultation_shift_id', selectedDoctor.shift_id);
    var header = {};

    console.log('create_consultation payload ', payload);

    Services.post('create_consultation', header, payload, true)
      .then(responseJson => {
        console.log('addmember login', responseJson);
        if (responseJson.status == 1) {
          Utils.showToastMessage('Consultation addd successfully.');

          this.setState({
            modalVisible: false,
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

  render() {
    const {
      loading,
      isPatientModal,
      consultationRecord,
      userData,
      isTabVisible,
      searchText,
      loadsData = [],
    } = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title="Video Consultation"
          showBack={true}
          onLeftPress={() => {
            // console.log(' On left Press ');
            this.props.navigation.goBack();
          }}
        />

        {this.renderModal()}

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Constants.Colors.primaryBlue,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
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

          {this._renderCategories()}

          <View style={styles.desContainer}>
            {/* <View style={styles.searchContainer}>
              <View style={styles.searchInputWrapper}>
                <TextInput
                  style={styles.searchInput}
                  onChangeText={text => {
                    this.setState({searchText: text});
                  }}
                  placeholder="Search Doctors"
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

            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrapper}>
                <TextInput
                  style={styles.searchInput}
                  onChangeText={text => {
                    this.setState({
                      searchText: text,
                    });
                  }}
                  placeholder="Search"
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
            {this._renderTabsView()}
            {this._renderOfflineView()}
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
export default connect(mapStateToProps)(Doctors);
