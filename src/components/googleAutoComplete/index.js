import React, {Component} from 'react';
import {Modal, StyleSheet, View, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Constants from '../../utils/Constants';
import {Header, AutoComplete} from '../../components';
import MapView, {Marker, MarkerAnimated} from 'react-native-maps';

const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
};
const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
};

const GoogleAutoComplete = ({
  isVisible = false,
  searchWithinCountry = false,
  onDismiss,
  onSelectLocation,
  fieldIndex,
  firstAddress,
  countryCode = firstAddress && firstAddress.country
    ? firstAddress.country
    : null,
}) => {
  console.log(' onSelectLocation ', onSelectLocation);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onDismiss={onDismiss}>
      <View style={styles.container}>
        <View style={styles.placesView}>
          <AutoComplete
            onLeftPress={onDismiss}
            onSelectLocation={onSelectLocation}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placesView: {
    flex: 1,
    // paddingHorizontal: 20,
    // paddingVertical: 20,
    // marginLeft
    backgroundColor: Constants.Colors.primaryBlue,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const googelePlacesStyle = {
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    // backgroundColor: 'red'
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    color: '#5d5d5d',
    fontSize: 16,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
};
const query = {
  key: Constants.googleKey,
  language: 'en',
};

export {GoogleAutoComplete};
