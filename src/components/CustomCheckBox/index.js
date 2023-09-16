import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
// import {Picker, Item, Icon} from 'native-base';
// import Constant from '../../common/Constants';
import {Constants} from '../../utils';
// import CheckBox from 'react-native-check-box';
import FontAwesome from "react-native-vector-icons/FontAwesome";

class CustomCheckBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: '',
    };
  }

  render() {
    const {
      canEdit = true,
      readonly = true,
      labelStyle = null,
      useIcon = false,
      label,
      inputPlaceHoler,
      customeHeight = 45,
      customLabel,
      rightText,
      labelCustomStyle,
      onPress,
      value,
    } = this.props;

    return (
      // <View style={styles.wrapper}>
      //   <View style={[styles.inputView, {height: customeHeight}]}>
      //     <View
      //       style={{
      //         flex: 1,
      //         justifyContent: 'center',
      //         backgroundColor: 'purple',
      //       }}>
      //        <CheckBox
      //         imageWidth={useIcon}
      //         disabled={!canEdit}
      //         style={[
      //           {
      //             flex: 1,
      //             borderRadius: 10,
      //             alignItems: 'center',
      //             justifyContent: 'center',
      //           },
      //           labelCustomStyle,
      //         ]}
      //         checkBoxColor={Constants.Colors.primaryBlue}
      //         onClick={() => {
      //           console.log('onPress checkbos');
      //         }}
      //         isChecked={value}
      //         leftText={inputPlaceHoler}
      //         rightText={rightText}
      //       />

      //     </View>
      //   </View>
      // </View>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onPress}>
        <Text style={styles.txtStyle}>{inputPlaceHoler}</Text>
        <View
          style={{
            borderColor: Constants.Colors.primaryBlue,
            borderWidth: 1,
            width: 25,
            height: 25,
            marginHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {value ? (
            <FontAwesome type="FontAwesome" name="check" style={styles.checkStyle} />
          ) : (
            <View />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export {CustomCheckBox};

const styles = StyleSheet.create({
  txtStyle: {
    color: Constants.Colors.primaryBlue,
    fontSize: 15,
    fontWeight: 'bold',
  },
  checkStyle: {
    // width: 20,
    color: 'white',
    fontSize: 20,
    padding: 2,
    backgroundColor: Constants.Colors.primaryBlue,
  },
  inputView: {
    // width: 80,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 35,
    // marginBottom: 15,
    flexDirection: 'row',
    height: 55,

    paddingHorizontal: 20,

    backgroundColor: 'yellow',
    shadowColor: '#787878',
    // shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    // shadowOpacity: 0.3,
    // elevation: Platform.OS == 'ios' ? 3 : 3,
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
    // height: 55,
    flex: 1,
    color: 'black',
    fontSize: 14,
  },
  wrapper: {
    display: 'flex',
    // flex: 1,
    // backgroundColor: 'red',
  },
  iconWrapper: {
    width: 25,
    // height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 15,
  },
  inputIcon: {
    width: 20,
    // height: 20,
  },
  labelStyle: {
    fontSize: 15,
    // marginBottom: 10,
    // marginLeft: 10,
    fontSize: 12,
    fontFamily: Constants.PoppinsSemiBold,
    /* fontSize: 13,
        marginLeft: 15 */
  },
});
