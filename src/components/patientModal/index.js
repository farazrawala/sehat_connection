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

const PatientModal = ({modalVisible, onReturnHome, userData, data}) => (
  <Modal animationType="slide" transparent={true} visible={modalVisible}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image
          // source={Constants.hosp_logo_avatar}
          source={{
            uri: Constants.url + data.hospital_image_path + data.hospital_image,
          }}
          style={styles.logoStyle}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={Constants.rightIcon} style={styles.rightIconStyle} />
          <Text style={styles.requestTxtStyle}>
            Request Submitted Successfully
          </Text>
        </View>
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenTextStyle}>
            Token No : {data.consultation_token}
          </Text>
          <Text style={styles.tokenTextStyle}>
            Consultation No : {data.consultation_id}
          </Text>

          <Text style={styles.tokenDateStyle}>
            {data.consultation_createdon}
          </Text>
        </View>

        <View style={styles.desContainer}>
          <View style={styles.leftWrapper}>
            <Text style={styles.leftText}>Patient Name :</Text>
            <Text style={styles.leftText}>Consultation with : </Text>
            <Text style={styles.leftText}>Consultation Clinic : </Text>
            <Text style={styles.leftText}>Fee paid : </Text>
            <Text style={styles.leftText}>Est waitng time : </Text>
          </View>

          <View style={styles.rightWrapper}>
            <Text numberOfLines={1} style={styles.rightText}>
              {data.member_firstname} {data.member_lastname}
            </Text>
            <Text numberOfLines={1} style={styles.rightText}>
              Dr. {Utils.capitalizeFirstLetter(data.signup_firstname)}{' '}
              {Utils.capitalizeFirstLetter(data.signup_lastname)}
            </Text>
            <Text style={styles.rightText} numberOfLines={1}>
              {data.category_name}
            </Text>
            <Text style={styles.rightText}>Rs. {data.consultation_fee}</Text>
            <Text style={styles.rightText}>30 mins</Text>
          </View>
        </View>

        <View style={styles.tokenContainer}>
          <Text style={styles.tokenBottonTextStyle}>
            World Class quality healthcare, All Care specialities under one
            roof.
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          {/* <RoundedButton
            text="Print"
            textColor={'white'}
            fontsize={15}
            customStyle={{
              width: 140,
              height: 35,
              marginVertical: 20,
              marginHorizontal: 10,
              marginTop: 30,
            }}
            handleOnPress={onReturnHome}
          /> */}

          <RoundedButton
            text="Next"
            textColor={'white'}
            fontsize={15}
            customStyle={{
              width: 200,
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
export {PatientModal};

const styles = {
  btnWrapper: {
    flexDirection: 'row',
  },
  desContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    marginVertical: 20,
  },
  rightWrapper: {
    flex: 1,
  },
  leftWrapper: {
    width: Constants.ScreenWidth / 2.6,
  },
  leftText: {
    fontSize: 14,
    color: Constants.Colors.grey,
    marginVertical: 6,
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
    textAlign: 'center',
    fontSize: 14,
  },
  tokenDateStyle: {
    color: Constants.Colors.grey,
  },
  requestTxtStyle: {
    fontSize: 14,
    color: Constants.Colors.primaryBlue,
    fontWeight: 'bold',
  },
  tokenContainer: {
    // height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
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
    width: 150,
    // backgroundColor: 'green',
    height: 75,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    // height: '80%',
    // justifyContent: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
