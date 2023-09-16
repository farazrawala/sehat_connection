import React, {Component} from 'react';
import {StyleSheet, NativeModules, Linking} from 'react-native';
// import {Picker, Item, Icon, ActionSheet} from 'native-base';
import {Constants, Utils} from '../../utils';
// import { Constants, } from '../../utils';
import {Touchable} from '../';
import ImagePicker from 'react-native-image-crop-picker';

var BUTTONS = [
  {text: 'Open Gallery', icon: 'american-football'},
  {text: 'Open Camera', icon: 'analytics'},
  {text: 'Cancel', icon: 'close'},
];

var BUTTONS_Withou_camera = [
  {text: 'Open Gallery', icon: 'american-football'},
  {text: 'Cancel', icon: 'close'},
];

var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 3;

class Camera extends Component {
  state = {
    imagesData: [],
    isMultiple: false,
  };

  componentDidMount() {}

  openCamera() {
    const {children = '', getImages, isMultiple = false} = this.props;

    ImagePicker.openCamera({
      width: 20,
      height: 20,
      includeBase64: true,
      // cropping: true,
      multiple: isMultiple,
    })
      .then(image => {
        console.log('images__', image);

        this.setState({
          imagesData: image,
        });
        getImages(image);
      })
      .catch(e => {
        // console.log(e);
      });
  }

  openPicker() {
    const {children = '', getImages} = this.props;

    ImagePicker.openPicker({
      cropping: true,
      multiple: true,
    })
      .then(image => {
        this.setState({
          imagesData: image,
        });
        getImages(image);
      })
      .catch(e => {
        // console.log('catech gallery ',e);
        // setTimeout(() => {

        // }, 1000);
        Utils.confirmSettings(
          '',
          'Persmission is required to access your gallery',
          status => {
            if (status == 'success') {
              Linking.openURL('app-settings:');
            }
          },
        );
      });
  }

  onSelectImage() {
    const {isCamera = true} = this.props;

    console.log('isCamera', isCamera);
    // ActionSheet.show(
    //   {
    //     options: isCamera === true ? BUTTONS : BUTTONS_Withou_camera,
    //     cancelButtonIndex: CANCEL_INDEX,
    //     destructiveButtonIndex: DESTRUCTIVE_INDEX,
    //     title: 'Testing ActionSheet',
    //   },
    //   buttonIndex => {
    //     // this.setState({ clicked: BUTTONS[buttonIndex] });
    //     // console.log('test ', buttonIndex);

    //     if (buttonIndex == 1) this.openCamera();
    //     else this.openPicker();
    //   },
    // );
  }

  render() {
    const {children = '', getImages} = this.props;
    const {imagesData} = this.state;

    return (
      <Touchable
        onPress={() => {
          this.onSelectImage();
        }}>
        {children}
      </Touchable>
    );
  }
}

export {Camera};

// CustomInput.PropTypes = {

// }

const styles = StyleSheet.create({});
