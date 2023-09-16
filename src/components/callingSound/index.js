import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native';
import { Constants } from '../../utils';


import Sound from 'react-native-sound';
Sound.setCategory('Playback');


var ding = new Sound(Constants.call_alert, Sound.MAIN_BUNDLE, (error) => {
if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());

});




class CallingSound extends Component {

    constructor(props) {
        super(props);

        // console.log('Signature ', props.signaturePath);
    }

    componentWillUnmount() {

      ding.release();

    }

    componentDidMount() {

        ding.play(success => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });

    }
    render() {

       
        return (

            <View/>
             

        );
    }
}


export { CallingSound };


