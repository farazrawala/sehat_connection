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
  Alert,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';
import styles from './styles';
// import {CallService, AuthService} from '../../services';
// import {Icon} from 'native-base';
// import { Icon } from 'native-base';
import {
  Header,
  CustomInput,
  CustomCalendar,
  RoundedButton,
  Renderdoctors,
} from '../../components';
import Services from '../../apis/services';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';

import * as actions from '../../actions';

class PharmacyUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userData: this.props.userData,
      data: [],
    };
  }

  componentDidMount() {
    this._get_users();
  }

  _get_users() {
    const {userData} = this.state;
    var payload = new FormData();
    payload.append('user_pharmacy_pharmacyid', userData.pharmacy_id);
    Services.post('get_user_pharmacy', {}, payload, true)
      .then(responseJson => {
        console.log('get_user_pharmacy', responseJson);
        this.setState({
          loading: false,
          data: responseJson.users,
        });
      })
      .catch(error => {
        // console.log('_error', error);
        this.setState({
          loading: false,
        });
      });
  }

  onRemoveMemberPress(id) {
    var payload = new FormData();
    payload.append('user_pharmacy_id', id);
    Services.post('remove_user_pharmacy', {}, payload, true)
      .then(responseJson => {
        if (responseJson.update == 1) this._get_users();

        // console.log('remove_user_pharmacy', );
        // this.setState({
        //   loading: false,
        //   data: responseJson.users,
        // });
      })
      .catch(error => {
        // console.log('_error', error);
        this.setState({
          loading: false,
        });
      });
  }

  removeMember = (item, index) => {
    Alert.alert(
      'Sehat Connections',
      'Are you sure you want to remove this member',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            this.setState({loading: true});
            this.onRemoveMemberPress(item.user_pharmacy_id);
          },
        },
      ],
      {cancelable: false},
    );
  };
  _renderNotification = ({item, index}) => {
    const {userData} = this.state;
    console.log('_renderNotification', userData);

    return (
      <View style={[styles.Wrapper]}>
        <View style={styles.iconWrapper}>
          {/* <Icon name="bell" type="FontAwesome" style={styles.iconStyle} /> */}
          <Text style={{color: Constants.Colors.primaryBlue}}>
            {index + 1} )
          </Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.txtStyle}>
            {item.signup_firstname} {item.signup_lastname}
          </Text>
        </View>
        <View style={styles.timeWrapper}>
          {userData.pharmacy_power_user == userData.signup_id ? (
            <TouchableOpacity
              onPress={() => {
                this.removeMember(item, index);
              }}>
              <Image style={styles.crossBtnStyle} source={Constants.crossbtn} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  render() {
    const {
      loading,
      loadsData = [],
      showDatePicker,
      dateTimeModalType,
      userData,
    } = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title="Pharmacy Users"
          showBack={true}
          showAddMember={true}
          onLeftPress={() => {
            this.props.navigation.goBack();
          }}
          showRight={
            userData.pharmacy_power_user == userData.signup_id ? true : false
          }
          onRightPress={() => {
            this.props.navigation.navigate('UserPharmacy');
          }}
        />

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.desContainer}>
            <FlatList
              data={this.state.data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderNotification}
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
export default connect(mapStateToProps)(PharmacyUsers);
