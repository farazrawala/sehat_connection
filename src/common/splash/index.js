import React, { Component } from "react";
import { ImageBackground, View, Image,Text } from "react-native";
import styles from "./styles";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import { Constants, Utils } from "../../utils";

class splash extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      userData: this.props.userData,
    }
  }

  componentDidMount = async () => {
    var userData = await Utils.getUserData();
    setTimeout(() => {
      // var routeName = 'MedicalHistory';
      var routeName = 'Login';
      
      if (!Utils.isEmpty(userData)) {
        userData = JSON.parse(userData);
        this.props.dispatch({
          type: 'USER_DATA',
          payload: userData,
        });
        Utils.saveUserData(JSON.stringify(userData));
        Utils.setUserType(userData.signup_type);
        var routeName = 'App';
      }
        this.props.navigation.navigate(routeName, {
          initial: false,
        }); 

    }, 3000);
    
  }

  render() {
    return (
      // <Text>Splash</Text>
    <ImageBackground
      resizeMode={"cover"}
      style={styles.imageBgStyle}
      source={Constants.splashBg}
    >
      <View style={styles.SplashLogoContainer}>
        <View style={styles.descContainer}>
          <Animatable.View
            style={styles.centerContainer}
            animation="slideInDown"
            iterationCount={1}
            direction="alternate"
          >
            <Image
              style={{ width: 300, height: 200, resizeMode: "contain" }}
              source={Constants.logo}
            />
          </Animatable.View>
          <View style={styles.footerWrapper} />
        </View>
      </View>
    </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.main.userData,
  };
};
export default connect(mapStateToProps)(splash);
