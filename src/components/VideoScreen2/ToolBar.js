import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {CallService} from '../../services';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import customEventEmiter, {CUSTOM_EVENTS} from '../../services/customEvents';
import {Utils} from '../../utils';
import Services from '../../apis/services';

export default class ToolBar extends Component {
  constructor(props) {
    super(props);
    console.log('Prosp', props);
    this._setUpListeners();
  }

  state = {
    isAudioMuted: false,
    isFrontCamera: true,
  };

  componentDidMount() {
    setTimeout(() => {
      console.log('Start making a call.....');
      if (Utils.getUserType() == 1) {
        this.startCall();
      }
    }, 5000);
  }

  static getDerivedStateFromProps(props, state) {
    let derivedState = {};

    if (!props.isActiveCall) {
      derivedState.isAudioMuted = false;
      derivedState.isFrontCamera = true;
    }

    return derivedState;
  }

  componentWillUnmount() {
    customEventEmiter.removeListener(
      CUSTOM_EVENTS.STOP_CALL_UI_RESET,
      this._resetUIState,
    );
  }

  _setUpListeners = () => {
    customEventEmiter.addListener(
      CUSTOM_EVENTS.STOP_CALL_UI_RESET,
      this._resetUIState,
    );
  };

  _resetUIState = () => {
    this.props.resetState();
  };

  startCall = () => {
    const {
      selectedUsersIds,
      closeSelect,
      initRemoteStreams,
      setLocalStream,
    } = this.props;

    console.log('startCall __ ', selectedUsersIds);

    if (selectedUsersIds.length === 0) {
      CallService.showToast('Select at less one user to start Videocall');
    } else {
      closeSelect();
      initRemoteStreams(selectedUsersIds);
      CallService.startCall(selectedUsersIds).then(setLocalStream);
    }
  };

  stopCall = () => {
    console.log(
      'Stop button press..... 222',
      this.props.props.navigation.state.params,
    );
    this._onPressConsultationStatus(
      this.props.props.navigation.state.params.from_data.consultation_id,
      1,
    );

    CallService.stopCall();
    this.props.resetState();

    this.props.props.navigation.navigate('App');

    // change the status to attend  consultation.
  };

  _onPressConsultationStatus(consultation_id, status) {
    // consultation_id

    this.setState({loading: true});
    const {userData} = this.state;

    var payload = new FormData();
    payload.append('consultation_consult_status', status);
    payload.append('consultation_id', consultation_id);
    Services.post('update_consultation_status', {}, payload, true)
      .then(responseJson => {
        console.log('update_consultation_status', responseJson);
        // this.props.props.navigation.navigate('Prescription');
      })
      .catch(error => {
        console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }

  switchCamera = () => {
    const {localStream} = this.props;

    CallService.switchCamera(localStream);
    this.setState(prevState => ({isFrontCamera: !prevState.isFrontCamera}));
  };

  muteUnmuteAudio = () => {
    this.setState(prevState => {
      const mute = !prevState.isAudioMuted;
      CallService.setAudioMute();
      return {isAudioMuted: mute};
    });
  };

  _renderCallStartStopButton = isCallInProgress => {
    const style = isCallInProgress ? styles.buttonCallEnd : styles.buttonCall;
    // const onPress = isCallInProgress ? this.stopCall : this.startCall;
    const onPress = isCallInProgress ? this.stopCall : null;
    const type = isCallInProgress ? 'call-end' : 'call';

    if (isCallInProgress) {
      return (
        <TouchableOpacity
          style={[styles.buttonContainer, style]}
          onPress={onPress}>
          <MaterialIcon name={type} size={32} color="white" />
        </TouchableOpacity>
      );
    }
  };

  _renderMuteButton = () => {
    const {isAudioMuted} = this.state;
    const type = isAudioMuted ? 'mic-off' : 'mic';

    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonMute]}
        onPress={this.muteUnmuteAudio}>
        <MaterialIcon name={type} size={32} color="white" />
      </TouchableOpacity>
    );
  };

  _render = () => {
    const {isAudioMuted} = this.state;
    const type = isAudioMuted ? 'mic-off' : 'mic';

    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonMute]}
        onPress={this.muteUnmuteAudio}>
        <MaterialIcon name={type} size={32} color="white" />
      </TouchableOpacity>
    );
  };

  _renderSwitchVideoSourceButton = () => {
    const {isFrontCamera} = this.state;
    const type = isFrontCamera ? 'camera-rear' : 'camera-front';

    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonSwitch]}
        onPress={this.switchCamera}>
        <MaterialIcon name={type} size={32} color="white" />
      </TouchableOpacity>
    );
  };

  render() {
    const {isActiveSelect, isActiveCall} = this.props;
    const isCallInProgress = isActiveCall || !isActiveSelect;
    const isAvailableToSwitch =
      isActiveCall && CallService.mediaDevices.length > 1;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.toolBarItem}>
          {isActiveCall && this._renderMuteButton()}
        </View>
        <View style={styles.toolBarItem}>
          {this._renderCallStartStopButton(isCallInProgress)}
        </View>
        <View style={styles.toolBarItem}>
          {isAvailableToSwitch && this._renderSwitchVideoSourceButton()}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 60,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 100,
  },
  toolBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCall: {
    backgroundColor: 'green',
  },
  buttonCallEnd: {
    backgroundColor: 'red',
  },
  buttonMute: {
    backgroundColor: 'blue',
  },
  buttonSwitch: {
    backgroundColor: 'orange',
  },
});
