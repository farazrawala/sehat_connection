import React, {Component} from 'react';
import {Constants} from '../../utils';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
// import { Surface } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const HomeOptions = ({item, index, onPress, item: {title = 'Shipment'}}) => {
  const selected = ['#252eb2', '#4f59ea'];
  const unselected = ['#fff', '#fff'];

  var bg = [];
  var textColor = 'white';
  var titlColor = 'white';
  var bgColor = Constants.Colors.primaryYellow;
  if (index != 0) {
    bg = unselected;
    titlColor = Constants.Colors.grey;
    textColor = Constants.Colors.black;
  } else {
    bg = selected;
    bgColor = 'white';
  }

  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={styles.surfaceStyle}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={bg}
          style={styles.boxWrapper}>
          <View style={[styles.iconWrapper, {backgroundColor: bgColor}]}>
            <Image source={Constants.carriers_top} style={styles.boxIcon} />
          </View>

          <Text style={[styles.boxText, {color: titlColor}]}>{title}</Text>
          <Text style={[styles.boxFigures, {color: textColor}]}>126,89</Text>

          <View
            style={{
              flexDirection: 'row',
              height: 5,
              borderRadius: 5,
              marginTop: 15,
              marginBottom: 10,
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: Constants.Colors.primaryYellow,
                height: 5,
              }}
            />
            <View
              style={{
                flex: 1,
                backgroundColor: Constants.Colors.lightGrey,
                height: 5,
              }}
            />
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export {HomeOptions};

const styles = StyleSheet.create({
  surfaceStyle: {
    elevation: 3,
    marginVertical: 20,
    borderRadius: 15,
    width: 170,
    marginHorizontal: 7,
  },
  iconWrapper: {
    width: 35,
    height: 35,
    marginBottom: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxIcon: {
    width: 35,
    height: 35,
  },
  boxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  boxWrapper: {
    paddingHorizontal: 20,
    padding: 20,
    borderRadius: 15,
  },
  boxText: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: Constants.PoppinsRegular,
  },
  boxFigures: {
    paddingTop: 4,
    fontSize: Constants.FontSize.large,
    fontWeight: 'bold',
  },
});
