/* @flow weak */
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform
} from 'react-native';

const FormContainer = ({ children }) => (
  <View style={styles.mainContainer}>
    <View style={styles.container}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({

  mainContainer: {
    marginVertical: 20,
    flexDirection: "column",
    width: '100%',
    marginBottom: 0,
  },
  container: {
    backgroundColor: "#FFF",
    shadowColor: "#787878",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: Platform.OS == 'ios' ? 3 : 3,
    // paddingVertical: 5,
    borderRadius: 10,
    // paddingHorizontal: 20
  },
  formButtonCont: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -40,
    zIndex: 999
  },
  formButton: {
    // width: 80,
    // height: 80
  }

})

export { FormContainer };
