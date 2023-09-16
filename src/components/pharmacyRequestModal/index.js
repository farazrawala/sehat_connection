import React from 'react';
import {
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
// import styles from './styles';
// import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import {Constants} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
// import {Icon} from 'native-base';
import {RoundedButton} from '../../components';
import Utils from '../../utils/Utils';

// import styles from '../header/styles';
const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const PharmacyRequestModal = ({
  modalVisible,
  onReturnHome,
  userData,
  data,
  pharamcies,
  checkedPharmacies,
}) => (
  <Modal animationType="slide" transparent={false} visible={modalVisible}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {/* <Image source={Constants.logo} style={styles.logoStyle} /> */}
        <Image
          source={Constants.requestmodalimg}
          style={styles.requestmodalimgStyle}
        />

        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            // justifyContent: 'center',
            paddingLeft: 15,
          }}>
          <Image source={Constants.rightIcon} style={styles.rightIconStyle} />
          <Text style={styles.requestTxtStyle}>
            Your Request has been submitted with following pharmacies.
          </Text>
        </View>
        <View style={styles.desContainer}>
          <View style={styles.leftWrapper}>
            {/* <Text style={styles.leftText}>- Patient Name :</Text> */}
            {pharamcies.map(item => {
              const index = checkedPharmacies.indexOf(item.pharmacy_id);
              if (index > -1) {
                return (
                  <Text style={styles.leftText}>- {item.pharmacy_name}</Text>
                );
              }
            })}
          </View>
        </View>

        <View style={styles.tokenContainer}>
          <Text style={styles.tokenBottonTextStyle}>
            You should receive the confirmation message from these pharmacies
            after checking their stock avialibilty
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <RoundedButton
            text="Return to Home"
            textColor={'white'}
            fontsize={15}
            customStyle={{
              width: 140,
              height: 35,
              marginVertical: 20,
              marginTop: 30,
            }}
            handleOnPress={onReturnHome}
          />
        </View>
      </View>
    </View>
  </Modal>
);
export {PharmacyRequestModal};

const styles = {
  btnWrapper: {
    flexDirection: 'row',
  },
  desContainer: {
    // backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    marginVertical: 22,
  },
  requestmodalimgStyle: {
    width: '100%',
    height: 240,
    // backgroundColor: 'green',
    resizeMode: 'contain',
  },
  rightWrapper: {
    flex: 1,
  },
  leftWrapper: {
    width: Constants.ScreenWidth / 2.6,
  },
  leftText: {
    fontSize: 14,
    color: Constants.Colors.primaryGreen,
    marginVertical: 1,
  },
  rightText: {
    fontSize: 14,
    color: Constants.Colors.primaryGreen,
    marginVertical: 6,
    // fontWeight: 'bold'
  },
  container: {
    // backgroundColor: Constants.Colors.primaryBlue,
    height: Constants.ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenBottonTextStyle: {
    color: Constants.Colors.primaryBlue,
    // textAlign: 'center',
    textAlign: 'center',
    fontSize: 14,
    // backgroundColor: 'red',
  },
  tokenDateStyle: {
    color: Constants.Colors.grey,
  },
  requestTxtStyle: {
    fontSize: 14,
    color: Constants.Colors.primaryBlue,
    fontWeight: 'bold',
    // textAlign: 'left',
  },
  tokenContainer: {
    // height: 250,
    // alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 20,
    // paddingVertical: 2,
    // borderRadius: 10,
    // borderWidth: 1,
    borderColor: Constants.Colors.lightGrey,
  },
  rightIconStyle: {
    width: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  tokenTextStyle: {
    color: Constants.Colors.primaryGreen,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
  },
  logoStyle: {
    resizeMode: 'contain',
    width: 120,
    marginLeft: -120,
    // left: 0,
    // position: 'relative',
    height: 75,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  modalView: {
    width: '90%',
    // height: '80%',
    // justifyContent: 'center',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
};
