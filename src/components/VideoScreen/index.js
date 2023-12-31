import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import ConnectyCube from 'react-native-connectycube';
import AwesomeAlert from 'react-native-awesome-alerts';
import RTCViewGrid from './RTCViewGrid';
import {CallService, AuthService} from '../../services';
import ToolBar from './ToolBar';
import UsersSelect from './UsersSelect';
import {Utils} from '../../utils';

export default class VideoScreen extends React.Component {
  constructor(props) {
    super(props);

    this._session = null;
    this.opponentsIds = props.navigation.getParam('opponentsIds');

    this.state = {
      localStream: null,
      remoteStreams: [],
      selectedUsersIds: [],
      isActiveSelect: true,
      isActiveCall: false,
      isIncomingCall: false,
      // opponenIdCallingisComingFrom: '',
    };

    this._setUpListeners();

    console.log('this.opponentsIds', this.opponentsIds);
  }

  componentDidMount() {
    setTimeout(() => {
      if (Utils.getUserType() == 1) {
        this.selectUser(this.opponentsIds[0]);
      }
      // this.setState({opponenIdCallingisComingFrom: this.opponentsIds[0]});
      // console.log('selectedUsersIds__', this.state.selectedUsersIds);
      // console.log('selectedUsersIds__', Utils.getUserType());
    }, 1000);
  }

  componentWillUnmount() {
    CallService.stopCall();
    AuthService.logout();

    //
  }

  static getDerivedStateFromProps(props, state) {
    console.log('propsgetDerivedStateFromProps', props);
    console.log('propsgetDerivedStateFromProps', state);
    // if (props.name !== state.name) {
    //   //Change in props
    //   return {
    //     name: props.name,
    //   };
    // }
    // return null; // No change to state
  }

  showInomingCallModal = session => {
    this._session = session;
    // this.setState({isIncomingCall: true});
    this._onPressAccept();
  };

  hideInomingCallModal = () => {
    this.setState({isIncomingCall: false});
  };

  selectUser = userId => {
    console.log('User selected___', userId);

    this.setState(prevState => ({
      selectedUsersIds: [...prevState.selectedUsersIds, userId],
    }));
  };

  unselectUser = userId => {
    this.setState(prevState => ({
      selectedUsersIds: prevState.selectedUsersIds.filter(id => userId !== id),
    }));
  };

  closeSelect = () => {
    this.setState({isActiveSelect: false});
  };

  setOnCall = () => {
    this.setState({isActiveCall: true});
  };

  initRemoteStreams = opponentsIds => {
    const emptyStreams = opponentsIds.map(userId => ({
      userId,
      stream: null,
    }));

    this.setState({remoteStreams: emptyStreams});
  };

  updateRemoteStream = (userId, stream) => {
    this.setState(({remoteStreams}) => {
      const updatedRemoteStreams = remoteStreams.map(item => {
        if (item.userId === userId) {
          return {userId, stream};
        }

        return {userId: item.userId, stream: item.stream};
      });

      return {remoteStreams: updatedRemoteStreams};
    });
  };

  removeRemoteStream = userId => {
    this.setState(({remoteStreams}) => ({
      remoteStreams: remoteStreams.filter(item => item.userId !== userId),
    }));
  };

  setLocalStream = stream => {
    this.setState({localStream: stream});
  };

  resetState = () => {
    this.setState({
      localStream: null,
      remoteStreams: [],
      selectedUsersIds: [],
      isActiveSelect: true,
      isActiveCall: false,
    });
  };

  _setUpListeners = () => {
    ConnectyCube.chat.onSystemMessageListener = this.onSystemMessage.bind(this);
    ConnectyCube.videochatconference.onParticipantLeftListener = this.onStopCallListener.bind(
      this,
    );
    ConnectyCube.videochatconference.onRemoteStreamListener = this.onRemoteStreamListener.bind(
      this,
    );
    ConnectyCube.videochatconference.onParticipantJoinedListener = this.onAcceptCallListener.bind(
      this,
    );
    ConnectyCube.videochatconference.onSlowLinkListener = this.onSlowLinkListener.bind(
      this,
    );
    ConnectyCube.videochatconference.onRemoteConnectionStateChangedListener = this.onRemoteConnectionStateChangedListener.bind(
      this,
    );
    ConnectyCube.videochatconference.onSessionConnectionStateChangedListener = this.onSessionConnectionStateChangedListener.bind(
      this,
    );
  };

  onSystemMessage = msg => {
    console.log('onSystemMessage Msg from video screen');

    CallService.onSystemMessage(
      msg,
      this.showInomingCallModal,
      this.hideInomingCallModal,
    );
  };

  onStopCallListener = (session, userId, extension) => {
    const isStoppedByInitiator = session.initiatorID === userId;
    CallService.processOnStopCallListener(userId, isStoppedByInitiator)
      .then(() => {
        if (isStoppedByInitiator) {
          this.resetState();
        } else {
          this.removeRemoteStream(userId);
          setTimeout(() => {
            this.props.navigation.navigate('App');
          }, 3000);
        }

        // this.props.props.navigation.navigate('App');
      })
      .catch(this.hideInomingCallModal);
  };

  onRemoteStreamListener = (session, userId, stream) => {
    CallService.processOnRemoteStreamListener(userId)
      .then(() => {
        this.updateRemoteStream(userId, stream);
        this.setOnCall();
      })
      .catch(this.hideInomingCallModal);
  };

  onAcceptCallListener = (session, userId, displayName) => {
    CallService.processOnAcceptCallListener(session, userId, displayName);
  };

  onSlowLinkListener = (session, userId, uplink, nacks) => {
    console.log('[onSlowLinkListener]', userId, uplink, nacks);
  };

  onRemoteConnectionStateChangedListener = (session, userId, iceState) => {
    console.log('[onRemoteConnectionStateChangedListener]', userId, iceState);
  };

  onSessionConnectionStateChangedListener = (session, iceState) => {
    console.log('[onSessionConnectionStateChangedListener]', iceState);
  };

  _onPressAccept = () => {
    CallService.acceptCall().then(stream => {
      const participantIds = CallService.getParticipantIds();

      console.log('participantIds_', participantIds);
      console.log('stream_', stream);

      // participantIds = participantIds.splice(0, 1);

      console.log('after_participantIds', participantIds);
      //assitant
      // participantIds_ (2) [4473599, 4473608]

      this.initRemoteStreams(participantIds);
      this.setLocalStream(stream);
      this.closeSelect();
      this.hideInomingCallModal();
    });
  };

  _onPressReject = () => {
    CallService.rejectCall();
    this.hideInomingCallModal();
  };

  render() {
    const {
      localStream,
      remoteStreams,
      selectedUsersIds,
      isActiveSelect,
      isActiveCall,
      isIncomingCall,
    } = this.state;

    const initiatorName = isIncomingCall ? 'Doctor' : '';
    const localStreamItem = localStream
      ? [{userId: 'localStream', stream: localStream}]
      : [];
    const streams = [...remoteStreams, ...localStreamItem];

    CallService.setSpeakerphoneOn(remoteStreams.length > 0);

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <RTCViewGrid streams={streams} />

        <UsersSelect
          isActiveSelect={isActiveSelect}
          opponentsIds={this.opponentsIds}
          selectedUsersIds={selectedUsersIds}
          selectUser={this.selectUser}
          unselectUser={this.unselectUser}
        />

        <ToolBar
          props={this.props}
          selectedUsersIds={selectedUsersIds}
          localStream={localStream}
          isActiveSelect={isActiveSelect}
          isActiveCall={isActiveCall}
          closeSelect={this.closeSelect}
          initRemoteStreams={this.initRemoteStreams}
          setLocalStream={this.setLocalStream}
          resetState={this.resetState}
        />

        <AwesomeAlert
          show={isIncomingCall}
          showProgress={false}
          title={`Incoming call from ${initiatorName}`}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Reject"
          confirmText="Accept"
          cancelButtonColor="red"
          confirmButtonColor="green"
          onCancelPressed={this._onPressReject}
          onConfirmPressed={this._onPressAccept}
          onDismiss={this.hideInomingCallModal}
          alertContainerStyle={{zIndex: 1}}
          titleStyle={{fontSize: 21}}
          cancelButtonTextStyle={{fontSize: 18}}
          confirmButtonTextStyle={{fontSize: 18}}
        />
      </SafeAreaView>
    );
  }
}
