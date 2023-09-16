import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ActionSheetIOS,
} from "react-native";
import { Constants } from "../../utils";
// import { Icon } from 'native-base'
// import { ActionSheet, Picker } from "native-base";
import { ActionSheet } from "native-base";

import { Touchable, Textview } from "../";
import Icon from "react-native-vector-icons/AntDesign";

var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
class LoginInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "0",
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }
  getPicketItem = () => {
    const { data = [], label } = this.props;
    return data.map((item, index) => {
      return item.value.toString();
    });
  };

  openPicker = () => {
    var list = this.getPicketItem();

    console.log("Open Picker " + Constants.Platform, list);

    // var options = ["Cancel",...list ];
    var options = [...list];
    if (Constants.Platform == "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          //   destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          // if (buttonIndex === 0) {
          // // cancel action
          // }
          // else{
          this.props.onValueChange(options[buttonIndex], buttonIndex);
          // }
        }
      );
    } else {
      // <Actionsheet isOpen={true} disableOverlay>
      //   <Actionsheet.Content>
      //     <Actionsheet.Item>Option 1</Actionsheet.Item>
      //     <Actionsheet.Item>Option 2</Actionsheet.Item>
      //     <Actionsheet.Item>Option 3</Actionsheet.Item>
      //   </Actionsheet.Content>
      // </Actionsheet>;
      // ActionSheet.show(
      //   {
      //     options: BUTTONS,
      //     cancelButtonIndex: CANCEL_INDEX,
      //     destructiveButtonIndex: DESTRUCTIVE_INDEX,
      //     title: "Testing ActionSheet",
      //   },
      //   (buttonIndex) => {
      //     // this.setState({ clicked: BUTTONS[buttonIndex] });
      //   }
      // );
      // Actionsheet.show(
      //   {
      //     options,
      //     cancelButtonIndex: 0,
      //   },
      //   (buttonIndex) => {
      //     // if (buttonIndex === 0) {
      //     // // cancel action
      //     // }
      //     // else{
      //     // this.props.onValueChange(options[buttonIndex], buttonIndex);
      //     // }
      //   }
      // );
    }
  };

  getInput() {
    const {
      selectedVal = "",
      onChangeText,
      textEditable = true,
      value,
      label,
      isSecure,
      maxLength,
      placeholder = "",
      returnKeyType,
      labelTextSize,
      onSubmitEditing,
      inputRef,
      borderColor,
      labelColor,
      keyboard = "default",
      textColor,
      borderBottomColor,
      isDropdown = false,
      customStyle,
      customHeight = 50,
      children,
      isMutliLine = false,
    } = this.props;

    const fontSize = labelTextSize || 16;
    const color = labelColor || "black";
    const inputColor = Constants.Colors.black;
    const borderBottom = borderBottomColor || "transparent";
    // const keyboardtype = keyboard;
    const borderLeftColor = { borderColor };
    if (isDropdown == true) {
      // if(Constants.Platform == 'ios'){
      return (
        <Touchable onPress={() => this.openPicker()}>
          <View style={{ flexDirection: "row" }}>
            <Textview
              customStyles={{ flex: 1 }}
              text={selectedVal == "" ? "Select " + label : selectedVal}
            />
            <View styles={styles.dropIconWrapper}>
              <Icon
                // type="AntDesign"
                name="caretdown"
                style={{ color: Constants.Colors.grey, fontSize: 13 }}
              />
            </View>
          </View>
        </Touchable>
      );
      // }
      /* else{
                return(
                    <Picker
                        mode="dropdown"
                        placeholderStyle={styles.pickerPlcholderStyle}
                        selectedValue={selectedVal}
                        style={{paddingHorizontal:12}}
                        textStyle={{
                            color: Constants.Colors.grey,
                            width: "100%",
                            paddingHorizontal:12
                        }}
                        itemStyle={{ackg:"red"}}
                        onValueChange={this.props.onValueChange}
                        placeholder={this.props.inputPlaceHoler}
                        placeholderIconColor={Constants.Colors.grey}
                        iosIcon={<Icon type="AntDesign" name="caretdown" style={{ color: 'black', fontSize: 22, marginLeft: -25 }} />}
                    >
                        // {this.getPicketItem()}

                    </Picker>
                )
            } */
    } else {
      return (
        <TextInput
          autoCorrect={false}
          keyboardType={keyboard}
          returnKeyType={returnKeyType}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          ref={inputRef}
          editable={textEditable}
          // multiline={}

          multiline={isMutliLine}
          blurOnSubmit={isMutliLine ? false : true}
          blurOnSubmit={false}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          style={[
            { color: inputColor, height: isMutliLine ? 80 : customHeight },
            styles.InputFieldText,
          ]}
          secureTextEntry={isSecure ? true : false}
        />
      );
    }
  }
  render() {
    const {
      containerStyles = null,
      label,
      onChangeText,
      value,
      isIcon = true,
      passIcon,
      icon,
      maxLength,
      placeholder = "",
      returnKeyType,
      labelTextSize,
      onSubmitEditing,
      inputRef,
      borderColor,
      labelColor,
      keyboard,
      textColor,
      borderBottomColor,
      isDropdown = false,
      customStyle,
      children,
    } = this.props;
    const fontSize = labelTextSize || 16;
    const color = labelColor || "black";
    const inputColor = Constants.Colors.grey;
    const borderBottom = borderBottomColor || "transparent";
    const keyboardtype = keyboard || "default";
    const borderLeftColor = { borderColor };

    return (
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.labelText}>{label}</Text>
        <View style={[styles.Container, containerStyles]}>
          <View style={styles.inputWrapper}>{this.getInput()}</View>
          {inputRef === "password" ? (
            <View style={styles.iconWrapper}>{children}</View>
          ) : null}
        </View>
      </View>
    );
  }
}

export { LoginInput };

const styles = StyleSheet.create({
  passStyle: {
    color: Constants.Colors.grey,
    fontSize: 15,
  },
  inputWrapper: {
    flex: 1,
    // backgroundColor: 'red'
  },
  labelText: {
    color: Constants.Colors.grey,
    fontSize: 15,
    paddingLeft: 5,
    fontWeight: "bold",
    marginBottom: 5,
  },
  iconWrapper: {
    width: 30,
    color: Constants.Colors.grey,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'green'
  },
  Container: {
    // borderWidth: 1,
    paddingHorizontal: 20,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: Constants.Colors.lightGrey,
    borderWidth: 1,
    borderRadius: 25,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  InputFieldText: {
    // height: 50,
    fontSize: 11,
    fontFamily: Constants.PoppinsSemiBold,
    // paddingHorizontal: 20,
  },
});
