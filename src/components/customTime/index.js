import React, {useState, Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Platform} from 'react-native';
import {Picker, Item, Icon, Button} from 'native-base';
// import Constant from '../../common/Constants';
import {Constants} from '../../utils';
// import CheckBox from 'react-native-check-box'
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';

class CustomTime extends Component {
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
    const {showDate = false, label = ''} = this.state;

    return (
      <View style={styles.wrapper}>
        <Text style={[styles.labelStyle]}>{label}</Text>

        <View style={styles.inputView}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="clockcircleo"
                type="AntDesign"
                style={{
                  fontSize: 20,
                  color: Constants.Colors.primaryYellow,
                  marginRight: 15,
                }}
              />
              <TouchableOpacity onPress={() => this.showPicker()}>
                <Text>{this.state.txtState}</Text>
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

export {CustomTime};

const styles = StyleSheet.create({
  wrapper: {
    // marginBottom: 50
    // backgroundColor: 'red'
  },
  inputView: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 35,
    marginBottom: 15,
    flexDirection: 'row',
    height: 55,

    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    shadowColor: '#787878',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
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
    fontSize: Constants.FontSize.small,
    marginBottom: 10,
    height: 20,
    marginLeft: 10,
    color: Constants.Colors.black,
    fontFamily: Constants.PoppinsLight,
  },
});
