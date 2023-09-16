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
import * as Animatable from 'react-native-animatable';
import {debounce, set} from 'lodash';
// import {Icon} from 'native-base';
// import { Icon } from 'native-base';
import {
  Header,
  Heading,
  CustomCheckBox,
  RoundedButton,
  Renderdoctors,
} from '../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';

class Medicine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userData: this.props.userData,
      dosageData: [],
      tabletsCount: 1,
      tabletsCountTxt: 'One Tablet',
      periodData: [],
      tablesData: [
        {title: 'One Tablet', count: 1},
        {title: 'Two Tablets', count: 2},
        {title: 'Three Tablets', count: 3},
      ],
      descText: '',
      dosageId: 0,
      periodId: 0,
      dosageTxt: '',
      periodTxt: '',
      medicineList: Utils.getconsultantMedicine(),
      prescriptionId: this.props.route.params.prescriptionId,
      medicineIndex: this.props.route.params.medicineIndex,
      item: this.props.route.params.item,
    };

    console.log('item++', this.props.route.params);
  }

  componentDidMount() {
    this.get_api_data();
  }

  get_api_data() {
    var payload = new FormData();
    payload.append('test', '');
    Services.post('dosage_period_list', {}, payload, true)
      .then(responseJson => {
        // console.log('dosage_period_list', responseJson);
        if (responseJson.status == 1) {
          this.setState({
            dosageData: responseJson.dosage,
            periodData: responseJson.prescription_period,
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

  _onPressSave() {
    const {
      addedMedicines = [],
      prescriptionId = '',
      dosageTxt,
      medicine_id,
      dosageId,
      periodId,
      periodTxt,
      descText,
      item,
      tabletsCount,
    } = this.state;

    if (dosageId == '') {
      Utils.showToastMessage('Dosage field is important.', 'danger');
      return;
    }

    if (periodId == '') {
      Utils.showToastMessage('Duration field is important.', 'danger');
      return;
    }

    this.setState({
      loading: true,
    });
    // console.log('dosage', dosageTxt);
    // console.log('medicine_id', item.medicine_id);
    // console.log('comments', descText);
    // console.log('period', periodTxt);
    // return false;

    var payload = new FormData();
    payload.append('prescription_dosage_id', dosageId);
    payload.append('prescription_medicine_id', item.medicine_id);
    payload.append('prescription_period_id', periodId);
    payload.append('prescription_no_of_time', tabletsCount);
    payload.append('prescription_desc', descText);
    payload.append('prescription_consultancy_id', prescriptionId);
    Services.post('create_prescription', {}, payload, true)
      .then(responseJson => {
        console.log('create_prescription', responseJson);

        // if (responseJson.status == 1) {
        //   this.setState({
        //     data: responseJson.data,
        //     loading: false,
        //   });
        // }
        this.setState({
          loading: false,
        });
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }
  _onPressSave1() {
    const {
      userData,
      dosageId,
      periodId,
      medicineList,
      medicineIndex,
      dosageTxt,
      periodTxt,
      descText,
    } = this.state;

    //

    // medicineList[medicineIndex].dosage = dosageTxt;
    // medicineList[medicineIndex].period = periodTxt;
    // medicineList[medicineIndex].comments = descText;

    // console.log('medicineList', medicineList);
    // console.log('medicineIndex', medicineIndex);
    // console.log('dosageTxt', dosageTxt);
    // console.log('periodTxt', periodTxt);

    Utils.setConsultantMedicine(medicineList);
    this.props.navigation.goBack();
  }
  _onSelectDosage = item => {
    // console.log('_onSelectDosage___ ', item);
  };
  _renderTabletsList = ({item, index}) => {
    const {tabletsCount} = this.state;
    return (
      <TouchableOpacity
        // onPress={() => this._onSelectDosage(item)}
        onPress={() =>
          this.setState({
            tabletsCount: item.count,
            tabletsCountTxt: item.title,
          })
        }
        style={styles.suggestionWrapper}>
        <View style={{width: 50}}>
          <CustomCheckBox
            isDropdown={false}
            compType={'mapInput'}
            inputPlaceHoler={''}
            rightText={item.title}
            labelCustomStyle={
              {
                // color: Constants.Colors.primaryBlue,
                // marginTop: -20,
              }
            }
            value={tabletsCount == item.count ? true : false}
          />
        </View>
        <Text style={styles.medicineStyle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  _renderDosageList = ({item, index}) => {
    const {dosageId} = this.state;
    return (
      <TouchableOpacity
        // onPress={() => this._onSelectDosage(item)}
        onPress={() =>
          this.setState({dosageId: item.dosage_id, dosageTxt: item.dosage_name})
        }
        style={styles.suggestionWrapper}>
        <View style={{width: 50}}>
          <CustomCheckBox
            isDropdown={false}
            compType={'mapInput'}
            inputPlaceHoler={''}
            rightText={item.dosage_name}
            labelCustomStyle={
              {
                // color: Constants.Colors.primaryBlue,
                // marginTop: -20,
              }
            }
            value={dosageId == item.dosage_id ? true : false}
          />
        </View>
        <Text style={styles.medicineStyle}>{item.dosage_name}</Text>
      </TouchableOpacity>
    );
  };

  _renderPeriodList = ({item, index}) => {
    const {periodId} = this.state;
    return (
      <TouchableOpacity
        // onPress={() => this._onSelectDosage(item)}
        onPress={() =>
          this.setState({
            periodId: item.prescription_period_id,
            periodTxt: item.prescription_period_name,
          })
        }
        style={styles.suggestionWrapper}>
        <View style={{width: 50}}>
          <CustomCheckBox
            isDropdown={false}
            compType={'mapInput'}
            inputPlaceHoler={''}
            rightText={item.prescription_period_name}
            labelCustomStyle={
              {
                // color: Constants.Colors.primaryBlue,
                // marginTop: -20,
              }
            }
            // onPress={() =>
            //   this.setState({periodId: item.prescription_period_id})
            // }
            value={periodId == item.prescription_period_id ? true : false}
          />
        </View>
        <Text style={styles.medicineStyle}>
          {item.prescription_period_name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      loading,
      activeTab,
      item,
      dosageData,
      loadsData = [],
      showDatePicker,
      dateTimeModalType,
    } = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title="Medication"
          showBack={true}
          onLeftPress={() => {
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
          <View style={styles.semiContainer}>
            <Text style={styles.medicineTitle}> Medication</Text>
            <View style={styles.headingWrapper}>
              <Text style={styles.headingStyle}>{item.medicine_name}</Text>
            </View>

            <Text style={[styles.medicineTitle, {marginTop: 20}]}>
              Quantity
            </Text>
            <View style={styles.dosageContainer}>
              <FlatList
                data={this.state.tablesData}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderTabletsList}
                scrollEnabled={true}
                // numColumns={2}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
              <TextInput
                autoCorrect={false}
                returnKeyType="done"
                placeholder="Dosage"
                value={this.state.tabletsCountTxt}
                onChangeText={tabletsCountTxt =>
                  this.setState({tabletsCountTxt})
                }
                editable={false}
                style={styles.medicineFieldText}
              />
            </View>

            <Text style={[styles.medicineTitle, {marginTop: 20}]}> Dosage</Text>
            <View style={styles.dosageContainer}>
              <FlatList
                data={this.state.dosageData}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderDosageList}
                scrollEnabled={true}
                // numColumns={2}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
              <TextInput
                autoCorrect={false}
                returnKeyType="done"
                placeholder="Dosage"
                editable={false}
                value={this.state.dosageTxt}
                onChangeText={dosageTxt => this.setState({dosageTxt})}
                style={styles.medicineFieldText}
              />
            </View>

            <Text style={[styles.medicineTitle, {marginTop: 20}]}>
              {' '}
              Duration
            </Text>
            <View style={styles.dosageContainer}>
              <FlatList
                data={this.state.periodData}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderPeriodList}
                scrollEnabled={true}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
              <TextInput
                autoCorrect={false}
                returnKeyType="done"
                placeholder="Period"
                editable={false}
                value={this.state.periodTxt}
                onChangeText={periodTxt => this.setState({periodTxt})}
                style={styles.medicineFieldText}
              />
            </View>

            <Text style={[styles.medicineTitle, {marginTop: 20}]}>
              Additional Comments
            </Text>
            <View style={styles.dosageContainer}>
              <TextInput
                style={styles.searchInput}
                onChangeText={text => {
                  this.setState({descText: text});
                }}
                placeholder=""
                returnKeyType="done"
                value={this.state.descText}
                // onChangeText={text => this.onChangeText(text)}
              />
            </View>

            <RoundedButton
              text="Save Details"
              textColor={'white'}
              fontsize={15}
              customStyle={styles.loginBtn}
              handleOnPress={() => {
                // const resetAction = StackActions.reset({
                //   index: 0,
                //   actions: [NavigationActions.navigate({ routeName: 'App' })],
                // });
                // this.props.navigation.dispatch(resetAction);
                this._onPressSave();
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
  };
};
export default connect(mapStateToProps)(Medicine);
