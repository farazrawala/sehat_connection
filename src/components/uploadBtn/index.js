import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Platform} from 'react-native';
import {Picker, Item, Icon} from 'native-base';
// import Constant from '../../common/Constants';
import {Constants} from '../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import {Surface} from 'react-native-paper';

class UploadBtn extends Component {
  render() {
    const {
      canEdit = true,
      label1 = 'C://Documents/files.pdf',
      label2 = 'Upload',
    } = this.props;

    return (
      <View style={[styles.wrapper]}>
        <TouchableOpacity disabled={!canEdit}>
          <View style={styles.inputView}>
            <View style={{flex: 1, flexDirection: 'row', height: 45}}>
              <View style={[styles.textWrapper, styles.simpleWrapper]}>
                <Text style={[styles.txtStyle, {}]}>{label1}</Text>
              </View>
              <View style={[styles.textWrapper, styles.greyWrapper]}>
                <Text
                  style={[
                    styles.txtStyle,
                    {color: 'white', textAlign: 'center'},
                  ]}>
                  {label2}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export {UploadBtn};

const styles = StyleSheet.create({
  wrapper: {
    // marginVertical: 10,
    // marginHorizontal:10
    // paddingTop: 10,
    // backgroundColor: 'red',
    // alignItems:'center',
    // justifyContent: 'center'
  },
  inputView: {
    width: '99%',
    marginHorizontal: '1%',
    alignItems: 'center',
    borderRadius: 35,
    marginBottom: 15,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    // paddingHorizontal:10
    // marginHorizontal: 10

    // shadowColor: "#787878",
    // shadowOffset: { width: 0, height: 5 },
    // shadowRadius: 10,
    // shadowOpacity: 0.1,
    // // borderWidth: .3,
    // borderColor: Constants.Colors.lightGrey,
    elevation: Platform.OS == 'ios' ? null : 3,
  },

  textWrapper: {
    flex: 1,
    height: 45,
    // paddingLeft: 30,
    justifyContent: 'center',
  },

  txtStyle: {
    fontSize: 12,
    color: Constants.Colors.grey,
    fontFamily: Constants.PoppinsLight,
  },

  greyWrapper: {
    backgroundColor: Constants.Colors.grey,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 30,
  },

  simpleWrapper: {
    flex: 2.3,
    paddingHorizontal: 20,
    color: Constants.Colors.black,
  },
});
