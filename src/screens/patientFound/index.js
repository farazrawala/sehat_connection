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
  CustomInput,
  CustomCalendar,
  RoundedButton,
  Renderdoctors,
} from '../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';

import * as actions from '../../actions';

class PatientFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userData: this.props.userData,
      searchMember: this.props.route.params.searchMember,
      data:
        this.props.route.params.members ||
        [
          // { text: 'Usman Khan', time: 'Today, 6:30' },
          // { text: 'Shumaila Rizwan', time: 'Yesturday, 6:30' },
          // { text: 'MUstaq Ahmed', time: '29 Jan, 6:30' },
          // { text: 'Usman Khan', time: 'Today, 6:30' },
          // { text: 'Shumaila Rizwan', time: 'Yesturday, 6:30' },
          // { text: 'MUstaq Ahmed', time: '29 Jan, 6:30' },
          // { text: 'Usman Khan', time: 'Today, 6:30' },
          // { text: 'Shumaila Rizwan', time: 'Yesturday, 6:30' },
          // { text: 'MUstaq Ahmed', time: '29 Jan, 6:30' },
        ],
    };

    console.log(
      'patient_forund',
      this.props.route.params.searchMember,
    );
  }

  componentDidMount() {
    // const { categoryData } = this.state
    // setInterval(() => {
    //   categoryData.push({ screen: 'setting', title: 'Settings2', color: '#cb92c8', icon: Constants.icon_settings, batch: 0 })
    //   this.setState({ categoryData: categoryData })
    // }, 10000);
  }

  _renderMembers = ({item, index}) => {
    // ;

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
      <TouchableOpacity
        onPress={() => {
          // this.props.navigation.navigate('addMember');
          this.props.navigation.navigate('MedicalHistory', {
            consultation_user_id: item.signup_id,
          });
        }}
        style={[styles.Wrapper, {backgroundColor: 'white'}]}>
        <View style={styles.iconWrapper}>
          <Image
            source={{
              uri: userImage,
            }}
            // source={Constants.avatar}
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.txtStyle}>
            {Utils.capitalizeFirstLetter(item.signup_firstname)}{' '}
            {Utils.capitalizeFirstLetter(item.signup_lastname)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      loading,
      loadsData = [],
      showDatePicker,
      dateTimeModalType,
      userData,
      data,
      searchMember,
    } = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title={
            userData.signup_type == 2 ? 'Select Patient' : 'Patient(s) Found'
          }
          showBack={true}
          onLeftPress={() => {
            // console.log(' On left Press ');
            this.props.navigation.goBack();
          }}
        />

        <Text style={styles.headingStyle}> {data.length} Contacts</Text>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Constants.Colors.backgrounGrey,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.desContainer}>
            <FlatList
              data={this.state.data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderMembers}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('addMember', {searchMember});
          }}
          style={styles.imgWrapper}>
          <Image source={Constants.bigplus} style={styles.bigplusStyle} />
        </TouchableOpacity>
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
export default connect(mapStateToProps)(PatientFound);
