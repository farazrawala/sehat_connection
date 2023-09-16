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
import FontAwesome from "react-native-vector-icons/FontAwesome";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userData: this.props.userData,
      data: [
        // {text: 'Missed Video Call', time: 'Today, 6:30'},
        // {text: 'text Message', time: 'Yesturday, 6:30'},
        // {text: 'Appointment Schedule Today', time: '29 Jan, 6:30'},
        // {text: 'Missed Video Call', time: 'Today, 6:30'},
        // {text: 'text Message', time: 'Yesturday, 6:30'},
        // {text: 'Appointment Schedule Today', time: '29 Jan, 6:30'},
        // {text: 'Missed Video Call', time: 'Today, 6:30'},
        // {text: 'text Message', time: 'Yesturday, 6:30'},
        // {text: 'Appointment Schedule Today', time: '29 Jan, 6:30'},
        // {text: 'Missed Video Call', time: 'Today, 6:30'},
        // {text: 'text Message', time: 'Yesturday, 6:30'},
        // {text: 'Appointment Schedule Today', time: '29 Jan, 6:30'},
        // {text: 'Missed Video Call', time: 'Today, 6:30'},
        // {text: 'text Message', time: 'Yesturday, 6:30'},
        // {text: 'Appointment Schedule Today', time: '29 Jan, 6:30'},
      ],
    };
  }

  componentDidMount() {
    this._get_notifications();
  }

  _get_notifications() {
    const {userData} = this.state;

    var payload = new FormData();
    payload.append('signup_id', userData.signup_id);
    Services.post('get_local_notification', {}, payload, true)
      .then(responseJson => {
        // console.log('get_local_notification', responseJson.data);
        this.setState({data: responseJson.data.reverse()});
        // if (responseJson.status == 1) {
        // }
      })
      .catch(error => {
        console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }

  _renderNotification = ({item, index}) => {
    return (
      <View
        style={[
          styles.Wrapper,
          {
            backgroundColor:
              index % 2 == 0 ? 'white' : Constants.Colors.backgrounGrey,
          },
        ]}>
        <View style={styles.iconWrapper}>
          <FontAwesome name="bell" type="FontAwesome" style={styles.iconStyle} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.txtStyle}>
            {item.notification_message} for Order No :{' '}
            {item.notification_consultation_id}
          </Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={styles.dateStyle}>{item.time}</Text>
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
    } = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title="Notifications"
          showBack={true}
          onLeftPress={() => {
            // console.log(' On left Press ');
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
          <View style={styles.desContainer}>
            <FlatList
              data={this.state.data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderNotification}
              scrollEnabled={true}
              // numColumns={2}
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
export default connect(mapStateToProps)(Notifications);
