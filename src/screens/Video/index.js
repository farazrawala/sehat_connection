import React, { PureComponent } from "react";
import {
  View,
  Platform,
  Alert,
  Text,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Animated,
  TouchableOpacity,
  Linking,
} from "react-native";
// import {} from 'geolib';
// import TrackPlayer from 'react-native-track-player';
import styles from "./styles";
import { Icon } from "native-base";
import { Header, HomeMenus } from "../../components";
import { Constants, Utils } from "../../utils";
import { connect } from "react-redux";
import Services from "../../apis/services";
import { withNavigation } from 'react-navigation';
import Entypo from "react-native-vector-icons/Entypo";

import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Videosdkcomp from '../../../Videosdkcomp'
class Video extends PureComponent {
  constructor(props) {
    super(props);

    // setIsLogging = isLogging => this.setState({isLogging});

    this.state = {
      
    };
    console.log('Videoscreen',this.props);


  }

  render() {
    const {
      loading,
      userData,
      loadsData = [],
      isConnectyCubeConnected,
    } = this.state;

    return (
      <View style={styles.Container}>
        {/* <Text>Video Screen </Text> */}
        {/* <Videosdkcomp 
          endMeeting={() =>{
            this.props.navigation.navigate('ConsultationHistory', {
              initial: false,
            });
            console.log('Videosdkcomp');
          }}
        /> */}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.main.userData,
  };
};
export default connect(mapStateToProps)(Video);
