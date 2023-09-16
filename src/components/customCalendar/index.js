import React, {useState, Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Platform} from 'react-native';
import {Picker, Item, Button, Label} from 'native-base';
// import Constant from '../../common/Constants';
import {Constants} from '../../utils';
// import CheckBox from 'react-native-check-box'
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import {  } from '../textview';
import {Textview, Touchable} from '../';

// import React from 'react';
// import { Text, View } from 'react-native';

const CustomCalendar = ({
  label,
  onPress,
  date = 'YYYY-MM-DD',
  labelStyle = null,
  canEdit = true,
  time = false,
}) => (
  <View style={styles.wrapper}>
    <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
    <Touchable
      disabled={!canEdit}
      onPress={onPress}
      buttonStyle={styles.inputView}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            name={time ? 'time' : 'calendar'}
            type={time ? 'Ionicons' : 'AntDesign'}
            style={{
              fontSize: 20,
              color: Constants.Colors.primaryYellow,
              marginRight: 15,
            }}
          />
          {/* <TouchableOpacity onPress={onPress} > */}
          <Textview
            customStyles={{flex: 1, fontSize: 12, color: Constants.Colors.grey}}
            lines={1}
            text={date}
          />
          {/* </TouchableOpacity> */}
        </View>
      </View>
    </Touchable>
  </View>
);

class CustomCalendar123 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: '',
      txtState: 'Select Date',
    };
  }

  componentDidMount() {
    var todayDate = new Date().toISOString().slice(0, 10);
    this.setState({txtState: todayDate});
  }
  hideDatePicker = () => {
    this.setState({showDate: false});
  };

  handleConfirm = date => {
    var todayDate = new Date(date).toISOString().slice(0, 10);
    console.log('A date has been picked: ', todayDate);
    this.hideDatePicker();
  };

  showPicker = () => {
    this.setState({showDate: true});
  };

  render() {
    const {showDate = false} = this.state;
    const {label = ''} = this.props;

    return (
      <View style={styles.wrapper}>
        <Text style={styles.labelStyle}>{label}</Text>
        <View style={styles.inputView}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="time"
                type="AntDesign"
                style={{
                  fontSize: 20,
                  color: Constants.Colors.primaryYellow,
                  marginRight: 15,
                }}
              />
              <TouchableOpacity onPress={() => this.showPicker()}>
                <Text style={styles.dateValue}>{this.state.txtState}</Text>
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={showDate}
              mode="time"
              value={this.state.txtState}
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker}
            />
          </View>
        </View>
      </View>
    );
  }
}

export {CustomCalendar};

const styles = StyleSheet.create({
  wrapper: {
    // marginBottom: 50
    // backgroundColor: 'red'
  },
  inputView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 35,
    marginBottom: 15,
    flexDirection: 'row',
    height: 45,

    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    shadowColor: '#787878',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: Platform.OS == 'ios' ? 3 : 3,
    // backgroundColor: 'red'
  },
  wrappperInputField: {
    flexDirection: 'row',
    borderBottomColor: '#e8e5e5',
    borderBottomWidth: 1,
  },
  label: {
    fontWeight: '700',
    marginBottom: 5,
  },
  InputFieldText: {
    paddingHorizontal: 20,
    height: 55,
    flex: 1,
    color: 'black',
    fontSize: 14,
  },
  wrapper: {
    display: 'flex',
  },
  pickerBtn: {
    backgroundColor: 'white',
  },
  labelStyle: {
    marginBottom: 10,
    marginLeft: 10,
    height: 20,
    color: Constants.Colors.black,
    fontSize: 12,
    fontFamily: Constants.PoppinsSemiBold,
    // fontSize: labelTextSize == null ? 15:labelTextSize,
    // marginLeft: 15,
    // fontFamily: Constants.PoppinsSemiBold
  },
  dateValue: {
    // fontSize: 12,
    // color: '#e8e5e5',
  },
});
