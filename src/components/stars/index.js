import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { Constants } from '../../utils';

class Stars extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={Constants.icn_score} style={styles.star} />
        <Image source={Constants.icn_score} style={styles.star} />
        <Image source={Constants.icn_score} style={styles.star} />
        <Image source={Constants.icn_score} style={styles.star} />
        <Image source={Constants.icn_score} style={styles.star} />
      </View>
    );
  }
}

export {Stars}
