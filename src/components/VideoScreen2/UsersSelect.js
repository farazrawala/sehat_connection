import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Please wait while call is being initiated.
      </Text>
      {opponentsIds.map(id => {
        // console.log('id___ ', id);
        const user = Utils.getOpponentUsers();
        // console.log('user___ ', user);

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
            {/* <MaterialIcon name={type} size={20} color="white" /> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
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
