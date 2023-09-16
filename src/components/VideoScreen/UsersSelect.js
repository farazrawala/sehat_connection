import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {CallService} from '../../services';
import {Utils} from '../../utils';

export default ({
  isActiveSelect,
  opponentsIds,
  selectedUsersIds,
  selectUser,
  unselectUser,
}) => {
  if (!isActiveSelect) {
    return null;
  }
  const logoSrc = require('../../assets/Logo.png');

  console.log('opponentsIds_', opponentsIds);
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={logoSrc} style={styles.logoImg} />
      <View
        style={[styles.f1, styles.centeredChildren, {flexDirection: 'row'}]}>
        <Text>Sehat Connection</Text>
        <ActivityIndicator size="small" color="#1198d4" />
      </View>
      {opponentsIds.map(id => {
        const user = Utils.getOpponentUsers();
        const selected = selectedUsersIds.some(userId => id === userId);
        const type = selected
          ? 'radio-button-checked'
          : 'radio-button-unchecked';
        const onPress = selected ? unselectUser : selectUser;

        return (
          <TouchableOpacity
            key={id}
            style="#077988"
            onPress={() => onPress(id)}>
            <Text style={styles.userName}>Calling ...</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  logoImg: {
    width: '70%',
    height: '80%',
  },
  container: {
    flex: 1,
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 13,
    color: '#1198d4',
    padding: 20,
  },
  userLabel: backgroundColor => ({
    backgroundColor,
    width: 150,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  }),
  userName: {color: 'white', fontSize: 20},
});
