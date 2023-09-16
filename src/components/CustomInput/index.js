import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  ActionSheetIOS,
} from 'react-native';
// import {Picker, Item, Icon, ActionSheet} from 'native-base';
import {Constants} from '../../utils';
import { Touchable,Textview, Stars} from '../';
// import StarRating from 'react-native-star-rating';
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import {Picker} from '@react-native-picker/picker';

class CustomInput extends Component {
  /* getPicketItem = () => {

        const { data = [{ value: '' }], label } = this.props;
        return data.map((item, index) => {
            return (
                <Picker.Item key={item.id} label={item.value} value={item.id} />
            ) 
        })
    } */


    constructor(props) {
      super(props);
      this.state = {
        selectedValue:''
      }
    }

  getPicketItem = () => {
    const {data = [], label} = this.props;
    // return
    return data.map((item, index) => {
      return item.value.toString();
      /* return (
                <Picker.Item key={item.id} label={item.value} value={item.id} />
            ) */
    });
  };

  openPicker = () => {
    var list = this.getPicketItem();
    // console.warn('list = = = > ' , list);
    // var options = [...list, 'Cancel'];
    var options = [...list, 'Cancel'];
    if (Constants.Platform == 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          //   destructiveButtonIndex: 2,
          cancelButtonIndex: options.length - 1,
        },
        buttonIndex => {
          // alert(buttonIndex)
          if (buttonIndex === options.length - 1) {
            // cancel action
          } else {
            this.props.onValueChange(options[buttonIndex], buttonIndex);
          }
        },
      );
    } else {
      // ActionSheet.show(
      //   {
      //     options,
      //     //   destructiveButtonIndex: 2,
      //     cancelButtonIndex: 0,
      //   },
      //   buttonIndex => {
      //     // if (buttonIndex === 0) {
      //     //     // cancel action
      //     // }
      //     // else{
      //     this.props.onValueChange(options[buttonIndex], buttonIndex);
      //     // }
      //   },
      // );
    }
  };

  getInput() {
    const {
      moreStyles,
      children,
      isMutliLine = false,
      data = [],
      label = 'd',
      defaulValue = '',
      onValueChange,
      inputRef,
      selectedVal = '',
      returnKeyType,
      // selectedValue,
      compType = '',
      onChangeText,
      labelTextSize,
      inputPlaceHoler = '',
      customHeight = 45,
      onSubmitEditing,
      inputMode,
      labelColor,
      keyboard,
      rightIcon,
      textColor,
      borderBottomColor,
      inputType,
      inputCustomStyle,
      customStyle,
      secure = false,
      value = '',
      onFocus,
      canEdit = true,
      blurOnSumit = false,
      minLength = null,
      maxLength = null,
      fontFamily = Constants.PoppinsRegular,
      onPress = null,
    } = this.props;
    const fontSize = labelTextSize || 14;
    const color = labelColor || 'black';
    const inputColor = 'black';
    const borderBottom = borderBottomColor || 'transparent';
    const keyboardtype = keyboard || 'default';
    const type = inputMode || 0;
    const KeyType = keyboard == 'numeric' ? 'done' : returnKeyType || 'next';

    console.log('_dropdown_', data);

    if (type == 1) {
      if (data.length > 0) {
        return (
          <View
            style={{
              paddingRight: Platform == 'ios' ? 50 : 20,
              height: customHeight,
              justifyContent: 'center',
            }}>

            <Picker
              selectedValue={this.state.selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedValue: itemValue })
              }
            >
              <Picker.Item label="Option 1" value="option1" />
              <Picker.Item label="Option 2" value="option2" />
              <Picker.Item label="Option 3" value="option3" />
            </Picker>

            {/* <Touchable
              disabled={!canEdit}
              buttonStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 20,
                paddingRight: 15,
              }}
              onPress={() => {
                this.openPicker();
              }}>
              <Textview
                customStyles={{flex: 1, fontSize: 12, fontFamily: fontFamily}}
                text={selectedVal == '' ? 'Select ' + label : selectedVal}
              />
              {canEdit ? (
                <FontAwesome
                  name="caret-down"
                  type="FontAwesome"
                  style={{color: Constants.Colors.grey, fontSize: 28}}
                />
              ) : null}
            </Touchable> */}
          </View>
        );
      }
    } else if (type == '99') {
      return (
        <View
          style={{
            height: customHeight,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{width: 100, paddingHorizontal: 20}}>
            {/* <StarRating
              disabled={true}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              maxStars={5}
              starSize={22}
              rating={5}
              fullStarColor={Constants.Colors.primaryYellow}
            /> */}
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            height: customHeight,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            editable={canEdit}
            autoCorrect={false}
            placeholder={inputPlaceHoler}
            keyboardType={keyboardtype}
            returnKeyType={KeyType}
            ref={inputRef}
            value={defaulValue}
            blurOnSumit={blurOnSumit}
            onFocus={onFocus}
            multiline={isMutliLine}
            blurOnSubmit={isMutliLine ? false : true}
            onChangeText={onChangeText}
            maxLength={maxLength}
            onSubmitEditing={onSubmitEditing}
            placeholderTextColor="grey"
            textAlignVertical={isMutliLine ? 'top' : null}
            style={[
              styles.InputFieldText,
              moreStyles,
              {height: isMutliLine ? 80 : customHeight},
            ]}
            secureTextEntry={secure}
          />
        </View>
      );
    }
  }

  render() {
    const {
      hideInput = false,
      moreStyles,
      rightIcon = false,
      marginLeft = 10,
      inputCustomStyle,
      children,
      label,
      inputRef,
      labelTextSize = 12,
      labelColor,
      keyboard,
      textColor,
      borderBottomColor,
      inputType,
      customStyle,
      compType = '',
    } = this.props;
    const fontSize = labelTextSize || 15;

    const color = labelColor || 'black';
    const inputColor = 'black';
    const borderBottom = borderBottomColor || 'transparent';
    const keyboardtype = keyboard || 'default';

    var labelCustomStyle = {
      fontSize: labelTextSize,
    };

    // console.log('defaulValue ___ =++ ', this.props.defaulValue);

    if (compType == 'mapInput') {
      labelCustomStyle = {
        fontSize: labelTextSize == null ? 15 : labelTextSize,
        marginLeft: 15,
        fontFamily: Constants.PoppinsSemiBold,
      };
    } else if (compType == 'creditCard') {
      labelCustomStyle = {
        fontSize:
          labelTextSize == null ? Constants.FontSize.medium : labelTextSize,
        fontFamily: Constants.PoppinsSemiBold,
        paddingLeft: 10,
      };
    } else {
      labelCustomStyle = {
        fontSize: labelTextSize == null ? 13 : labelTextSize,
        fontFamily: Constants.PoppinsSemiBold,
        marginLeft: 15,
      };
    }
    // alert(labelCustomStyle.fontSize)
    return (
      <View style={[styles.wrapper, customStyle]}>
        {label ? (
          <Text
            style={[
              styles.labelStyle,
              labelCustomStyle,
              {marginLeft: marginLeft},
            ]}>
            {label}
          </Text>
        ) : null}
        {!hideInput ? (
          <View style={[styles.inputView, inputCustomStyle]}>
            <View style={{flex: 1}}>{this.getInput()}</View>
            {rightIcon ? (
              <View style={[styles.iconWrapper, {marginRight: 20}]}>
                {children}
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    );
  }
}

export {CustomInput};

// CustomInput.PropTypes = {

// }

const styles = StyleSheet.create({
  // wrapper: {
  //     // marginBottom: 50
  // },
  inputView: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    shadowColor: '#787878',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 7,
    shadowOpacity: 0.1,
    elevation: Platform.OS == 'ios' ? 1 : 3,
    borderWidth: 0.5,
    borderColor: '#eee',

    // backgroundColor: 'red',
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
    fontSize: 12,
    fontFamily: Constants.PoppinsRegular,
  },
  wrapper: {
    display: 'flex',
    marginVertical: 3,
    // backgroundColor:"green"
  },
  iconWrapper: {
    width: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  inputIcon: {
    width: 20,
    height: 20,
  },
  pickerPlcholderStyle: {
    width: '100%',
    paddingLeft: 0,
  },
  pickerStyle: {
    // width: "105%",
    // backgroundColor: 'green',
    paddingLeft: 20,
    color: 'white',
  },
  labelStyle: {
    marginBottom: 5,
    marginLeft: 10,
  },
});
