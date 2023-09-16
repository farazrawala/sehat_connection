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
  Alert,
} from 'react-native';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import {debounce, set} from 'lodash';
// import {Icon} from 'native-base';
import {NavigationActions, StackActions} from 'react-navigation';
// import { Icon } from 'native-base';

import Entypo from "react-native-vector-icons/Entypo";



import {
  Header,
  Heading,
  CustomCalendar,
  RoundedButton,
  SuggestionInput,
  Renderdoctors,
} from '../../components';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';
// import ThemedListItem from 'react-native-elements/dist/list/ListItem';

// function FetchUserData({ userId, onUpdate }) {
//   useFocusEffect(
//     React.useCallback(() => {
//       const unsubscribe = API.subscribe(userId, onUpdate);

//       return () => unsubscribe();
//     }, [userId, onUpdate])
//   );

//   return null;
// }



class Prescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userData: this.props.userData,
      data: [],
      addedMedicines: [
        // {}, {}, {}
      ],
      activeTab: 0,
      searchText: '',
      prescriptionId:  this.props.route.params.item.consultation_id,
      item:  this.props.route.params.item || {},
    };
    console.log('prescriptionIditem',  this.props.route.params.item);
  }

  _handleUpdate = () => {
    // Do something with user object

    console.log('_handleUpdate_ working');

  };

  get_api_data() {
    const {searchText = ''} = this.state;

    if (searchText.length < 2) return false;

    var payload = new FormData();
    payload.append('medicine_name', searchText);
    Services.post('medicine_list', {}, payload, true)
      .then(responseJson => {
        // console.log('get_api_data', responseJson);

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

  componentWillUnmount() {
    // Remove the event listener
    // this.focusListener.remove();
    this._unsubscribe();
  }

  componentDidMount() {
    // console.log('currentmedicines__', Utils.getconsultantMedicine());
    // this.get_api_data();

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something

        // console.log('focus working');
        this.getPrescription();
    });
    
    // this.focusListener = this.props.navigation.addListener('didFocus', () => {
    //   this.getPrescription();
    //   this.setState({
    //     data: [],
    //   });
    // });
    
  }

  getPrescription() {
    const {addedMedicines = [], prescriptionId = ''} = this.state;
    var payload = new FormData();
    payload.append('test', '');
    Services.post('get_prescription/' + prescriptionId, {}, payload, true)
      .then(responseJson => {
        // console.log('get_prescription', responseJson);

        if (responseJson.status == 1) {
          this.setState({
            addedMedicines: responseJson.data,
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
            </View>

            <View style={styles.textWrapper}>
              <Text style={styles.descTextSTyle}>{item.hospital_name}</Text>
              <Text style={styles.descTextSTyle}>
                {Utils.getCurrency(item.doctor_schedule_currency)}{' '}
                {item.doctor_schedule_fees}
              </Text>
              <Text style={styles.descTextSTyle}>Unscheduled</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <RoundedButton
              text="Audio"
              textColor={'white'}
              fontsize={12}
              customStyle={{
                marginTop: 15,
                marginHorizontal: 5,
                backgroundColor: Constants.Colors.primaryGreen,
              }}
              handleOnPress={() => {
                // this.onPressSignup();
              }}
            />
          </View>
        </View>
      );
    }
  };

  //

  _renderListing = ({item, index}) => {
    const {activeTab} = this.state;
    return (
      <View style={{zIndex: 100}}>
        <View
          onPress={() => {
            // this.onPressTabActive(index);
          }}
          style={styles.sectionCotainer}>
          <View style={styles.iconWrapper}>
            {/* <Image
              source={Constants.scheduled_icon}
              style={styles.tabIconStyle}
            /> */}
            <Text style={styles.tokenStyle}>{item.consultation_token}</Text>
          </View>
          <View style={styles.iconWrapper}>
            <View
              onPress={() => {
                // this.onPressTabActive(index);
                this.props.navigation.navigate('PatientProfile');
              }}>
              <Image source={Constants.men_avatar} style={styles.avatarStyle} />
            </View>
          </View>
          <View style={styles.centerTextWrapper}>
            <Text style={styles.tabTextStyle}>
              {Utils.capitalizeFirstLetter(item.signup_firstname)}{' '}
              {Utils.capitalizeFirstLetter(item.signup_lastname)}
            </Text>
            <Text style={styles.dateTextStyle}>
              {item.consultation_createdon}{' '}
            </Text>
          </View>
          <View style={styles.iconWrapper} />
        </View>
      </View>
    );
  };

  _onMedicinePress = item => {
    const {addedMedicines, prescriptionId} = this.state;
    // console.log('item', item);

    this.props.navigation.navigate('Medicine', {item, prescriptionId});

    addedMedicines.push(item);

    // console.log('item___', item);
    // console.log('addedMedicines', addedMedicines);

    this.setState({addedMedicines});
  };

  debounceSearchResults = loc => {
    // console.log('debounceSearchResults is working', loc);

    const {searchText} = this.state;
    var payload = new FormData();
    payload.append('medicine_name', searchText);
    Services.post('medicine_list', {}, payload, true)
      .then(responseJson => {
        // console.log('debounceSearchResults', responseJson);
        if (responseJson.status == 1) {
          this.setState({
            data: responseJson.data,
            loading: false,
          });
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
      });
  };

  debounceHandler = debounce(this.debounceSearchResults, 100);

  onChangeText = text => {
    if (text.length > 2) {
      this.setState({
        resultsVisible: false,
        searchText: text,
      });
      this.debounceHandler(text);
    } else {
      this.setState({
        resultsVisible: true,
        searchText: text,
        locationPrediction: [],
        data: [],
      });
    }
    // this.setState({});
  };

  removeMedicineRequest(id) {
    const {prescriptionId} = this.state;
    // console.log('id', id);
    var payload = new FormData();
    payload.append('prescriptionId', prescriptionId);
    Services.post('remove_prescription/' + id, {}, payload, true)
      .then(responseJson => {
        this.setState({
          addedMedicines: responseJson.data,
          loading: false,
        });
      })
      .catch(error => {
        // console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }
  _onRemoveMedicine(id) {
    Alert.alert(
      'Sehat Connection',
      'Are you sure you want to remove this medicine from prescription ?',
      [
        {
          text: 'Cancel',
          // onPress: () => this.onCancelPress(),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.removeMedicineRequest(id)},
      ],
      {cancelable: false},
    );
  }
  onClickSuggestion(item) {
    const {addedMedicines = [], prescriptionId} = this.state;
    // addedMedicines.push(item);

    this.props.navigation.navigate('Medicine', {item, prescriptionId});
    this.setState({addedMedicines, data: [], searchText: ''});
    // Utils.setConsultantMedicine(addedMedicines);
  }
  onSearchClick() {
    const {searchText, prescriptionId} = this.state;

    if (searchText == '') {
      Utils.showToastMessage('Medicine name cannot be empty.');
      return false;
    }
    this.setState({
      loading: true,
    });
    var payload = new FormData();
    payload.append('medicine_name', searchText);
    Services.post('medicine_add', {}, payload, true)
      .then(responseJson => {
        console.log('medicine_add', responseJson);
        if (responseJson.status == 1) {
          this.setState({
            loading: false,
            searchText: '',
          });
          this.props.navigation.navigate('Medicine', {
            item: responseJson.data,
            prescriptionId,
          });
        }
      })
      .catch(error => {
        // console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }

  _renderMedicineList = ({item, index}) => {
    // console.log('index' + index, item);

    return (
      <View
        // onPress={() => this._onSelectDosage(item)}
        style={styles.medicineAddedWrapper}>
        <TouchableOpacity style={{flex: 1}}>
          <Text style={styles.medicineTxtStyle}>{item.medicine_name}</Text>
          {item.dosage_name != null ? (
            <Text style={styles.medicineDescStyle}>
              {item.dosage_name} ({item.prescription_period_name})
            </Text>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this._onRemoveMedicine(item.prescription_id);
          }}
          style={styles.medicineActionWrapper}>
          <Entypo
            type="Entypo"
            name="circle-with-cross"
            style={styles.plusStyle}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      loading,
      activeTab,
      data,
      item,
      userData,
      loadsData = [],
      showDatePicker,
      dateTimeModalType,
    } = this.state;

    return (
      <View style={styles.Container}>

        {/* <FetchUserData
          userId={1}
          onUpdate={this._handleUpdate}
        /> */}

        <Header
          title="Prescription"
          showBack={true}
          showShare={true}
          onRightPress={() => {
            this.props.navigation.navigate('Medicals', {
              item,
            });
          }}
          onLeftPress={() => {
            this.props.navigation.goBack();
          }}
        />
        {userData.signup_type != 0 ? (
          <SuggestionInput
            data={this.state.data}
            value={this.state.searchText}
            placeHolder="Search Medicine"
            suggestionTitle=""
            showFilter={false}
            showSearch={false}
            showArrow={true}
            onChangeText={value => this.onChangeText(value)}
            onSuggestionClick={item => this.onClickSuggestion(item)}
            onSearchClick={() => this.onSearchClick()}
          />
        ) : null}

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Constants.Colors.backgrounGrey,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.desContainer}>
            <FlatList
              data={this.state.addedMedicines}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderMedicineList}
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
export default connect(mapStateToProps)(Prescription);
