import React, { Component } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

const Touchable = ({
  onPress,
  children,
  disabled = false,
  buttonStyle = {
    padding: 20,
  },
  styles = {},
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[buttonStyle, styles]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {children}
    </TouchableOpacity>
  );
};

export { Touchable };
