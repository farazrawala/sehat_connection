import React from 'react';
import { View, Dimensions, Text, Image } from 'react-native';
import Constants from '../../utils/Constants';

const { width, height } = Dimensions.get("window");
const PlaceHolder = ({ desc = 'No Records Found' }) => {


  console.log('des', desc);

  return (
    <View style={styles.containerStyle}>
      <Image
        style={styles.imgStyle}
        source={Constants.logo}
      />
      <Text style={{ marginTop: 5, color: 'gray' }}>{desc}</Text>
      {/* <Text style={{ marginTop: 10,  }}>dasfsafas</Text> */}
    </View>
  );
};

const styles = {
  imgStyle: {
    width: 210,
    height: 100,
    resizeMode: "contain",
    tintColor: 'gray'
  },
  containerStyle: {
    // backgroundColor: 'red',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // position: "absolute",
    zIndex: 9999,
    // backgroundColor: "rgba(255,255,255,0.8)",
    left: 0,
    top: 0,
  }

};

export { PlaceHolder };