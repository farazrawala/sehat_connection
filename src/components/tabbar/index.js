import React, { Component } from 'react';
import { View,Image } from 'react-native';
import styles from './styles';
import { Touchable, Textview } from '../';
import { Actions } from 'react-native-router-flux';
import { Constants } from '../../utils';

class Tabbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  _onTabButtonPress = (type) => {
      if (type == 1) {
        Actions.home()
      } 
      else if(type == 2){
        Actions.fav()
    }else if(type == 3){
        Actions.map()
    }else if(type == 4){
        Actions.profile()
    }else {
        Actions.messages()
      }
  }

  render() {
    return (
      <View style={styles.view}>
        <Touchable onPress={() => this._onTabButtonPress(1)} buttonStyle={styles.tabButton}>
            <Image source={Constants.guest_tab_one} style={styles.tabIcon} />
        </Touchable>
        <Touchable onPress={() => this._onTabButtonPress(2)} buttonStyle={styles.tabButton}>
            <Image source={Constants.guest_tab_two} style={styles.tabIcon} />
        </Touchable>
        <Touchable onPress={() => this._onTabButtonPress(3)} buttonStyle={[styles.tabButton,styles.tabMain]}>
            <Image source={Constants.guest_tab_three} style={styles.tabIcon} />
        </Touchable>
        <Touchable onPress={() => this._onTabButtonPress(4)} buttonStyle={styles.tabButton}>
            <Image source={Constants.guest_tab_four} style={styles.tabIcon} />
        </Touchable>
        <Touchable onPress={() => this._onTabButtonPress(5)} buttonStyle={styles.tabButton}>
            <Image source={Constants.guest_tab_five} style={styles.tabIcon} />
        </Touchable>
      </View>
    );
  }
}

export {Tabbar};
