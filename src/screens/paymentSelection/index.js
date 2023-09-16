import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  TextInput,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  ScrollView,
  StatusBar,
  Animated,
  Linking
} from 'react-native';
import styles from './styles';
// import {NavigationActions, StackActions} from 'react-navigation';
// import {Icon} from 'native-base';
// import { Icon } from 'native-base';
import {
  Header,
  PatientModal,
  RoundedButton,
} from '../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Services from '../../apis/services';
import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';

import * as actions from '../../actions';

class PaymentSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      ativeTab: 0,
      userData: this.props.userData,
      balance: 0,
      amount: this.props.route.params?.amount || 0,
      type: this.props.route.params?.type || 'medicine',
      paramData: this.props.route.params?.paramData || {},
      //Medicine parms
      instructions: this.props.route.params?.instructions || '',
      address: this.props.route.params?.address || '',
      //Medicine parms

      isPatientModal: false,
      consultationRecord:
        this.props.route.params?.consultationRecord || {},
      data: [],
      defaultGateway: [
        {text: 'Sehat Wallet', img: Constants.membership, amount: '0/-'},
        // {text: 'Cash on Delivery', img: Constants.jazzcash, amount: ''},
        {text: 'Jazz Cash', img: Constants.jazzcash, amount: ''},
        // {text: 'Easy Paisa', img: Constants.easypaisa, amount: ''},
        // {text: 'Credit/Debit Card', img: Constants.visacard, amount: ''},
        // {text: 'U Paisa', img: Constants.upaisa, amount: ''},
      ],

      medicineGateway: [
        {text: 'Cash on Delivery', img: Constants.cash, amount: ''},
        {text: 'Sehat Wallet', img: Constants.membership, amount: '0/-'},
        // {text: 'Jazz Cash', img: Constants.jazzcash, amount: ''},
        // {text: 'Easy Paisa', img: Constants.easypaisa, amount: ''},
        // {text: 'Credit/Debit Card', img: Constants.visacard, amount: ''},
        // {text: 'U Paisa', img: Constants.upaisa, amount: ''},
      ],

      futureGateway: [
        {text: 'Jazz Cash', img: Constants.jazzcash, amount: ''},
        {text: 'Easy Paisa', img: Constants.easypaisa, amount: ''},
        {text: 'Credit/Debit Card', img: Constants.visacard, amount: ''},
        {text: 'U Paisa', img: Constants.upaisa, amount: ''},
      ],
    };
    console.log(this.props.route.params.type, '_type');
    console.log(this.props.route.params.amount, '_amount');
    console.log(this.props.route.params.paramData, '_paramData');
    // console.log(this.props.route.params.type, '__type');
    // console.log( , 'consultationRecord');
  }

  componentDidMount() {
    const {type, medicineGateway, data, defaultGateway} = this.state;
    if (type == 'medicine') {
      this.setState({data: medicineGateway});
    } else {
      this.setState({data: defaultGateway});
    }
    // const { categoryData } = this.state
    // setInterval(() => {
    //   categoryData.push({ screen: 'setting', title: 'Settings2', color: '#cb92c8', icon: Constants.icon_settings, batch: 0 })
    //   this.setState({ categoryData: categoryData })
    // }, 10000);
    this.checkBalance();
  }

  _renderNotification = ({item, index}) => {
    const {ativeTab} = this.state;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ativeTab: index});
        }}
        style={[
          styles.Wrapper,
          {backgroundColor: 'white', borderWidth: ativeTab == index ? 2 : 0},
        ]}>
        <View style={styles.iconWrapper}>
          <Image source={item.img} style={styles.imageStyle} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.txtStyle}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  _renderFutureNotification = ({item, index}) => {
    const {ativeTab} = this.state;

    return (
      <TouchableOpacity
        onPress={() => {
          // this.setState({ativeTab: index});
        }}
        style={[styles.Wrapper, {backgroundColor: 'white'}]}>
        <View style={styles.iconWrapper}>
          <Image source={item.img} style={styles.imageStyle} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.txtStyle}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  confirmMedicine() {
    const {
      mobilenumber,
      userData,
      balance,
      amount,
      instructions,
      address,
      paramData,
      ativeTab,
      consultationRecord,
    } = this.state;

    console.log('_ativeTab_', ativeTab);

    // return false;

    if (ativeTab == 1) {
      if (balance < amount) {
        alert('You have insufficient balance in your account.');
        console.log('insufficient balance.');
        return false;
      }

      var payload = new FormData();
      payload.append('request_pharmacy_id', paramData.request_pharmacy_id);
      payload.append('request_pharmacy_comments', instructions);
      payload.append('request_pharmacy_address', address);
      payload.append('request_pharmacy_payment_type', 2);

      this.setState({
        loading: true,
      });

      // console.log('_payload_', payload);
      // return false;

      Services.post('pharmay_confirm_order', {}, payload, true)
        .then(responseJson => {
          console.log('pharmay_confirm_order', responseJson);

          this.processPayment();
        })
        .catch(error => {
          console.log('_error', error);
          this.setState({
            loading: false,
          });
        });
    }
    if (ativeTab == 0) {
      var payload = new FormData();
      payload.append('request_pharmacy_id', paramData.request_pharmacy_id);
      payload.append('request_pharmacy_comments', instructions);
      payload.append('request_pharmacy_address', address);
      payload.append('request_pharmacy_payment_type', 1);

      this.setState({
        loading: true,
      });

      // console.log('_payload_', payload);
      // return false;

      Services.post('pharmay_confirm_order', {}, payload, true)
        .then(responseJson => {
          console.log('pharmay_confirm_order', responseJson);

          this.processPayment();
        })
        .catch(error => {
          console.log('_error', error);
          this.setState({
            loading: false,
          });
        });
    }
  }

  processPayment() {
    console.log('processPayment');

    const {userData, type, balance, amount, consultationRecord} = this.state;
    var payload = new FormData();
    payload.append('pharmacy_id', 544);
    payload.append('mobilenumber', userData.signup_contact);
    payload.append('amount', amount);

    payload.append('wallet_detail_desc', 'Purchased Medicine');
    Services.post('use_wallet_trans', {}, payload, true)
      .then(responseJson => {
        console.log('use_wallet_trans_esponseJson', responseJson);
        this.setState({
          loading: false,
          // isPatientModal: true,
        });

        if (type == 'medicine') {
          alert('You Order is confirmed.');
          this.props.navigation.navigate('ListQuotation');
        }
      })
      .catch(error => {
        console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }
  confirmConsultation() {
    const {
      mobilenumber,
      userData,
      balance,
      amount,
      ativeTab,
      consultationRecord,
    } = this.state;



    // console.log('balance', balance);
    // console.log('amount', amount);
    // console.log('_ativeTab_', ativeTab);

    // console.log('_consultationRecord_', consultationRecord);
    // return false;



      if(ativeTab == 1)
      {

        this.setState({
          loading: false,
        });

        Linking.openURL('https://sehatconnection.com/jazz.php?consult_id='+consultationRecord.consultation_id+'&amount='+consultationRecord.doctor_schedule_fees);


        setTimeout(() =>
        {
          this.props.navigation.navigate("App", {
            // screen: "Welcome",
            initial: false,
          });

         
        },500)
       


        return false;
      }



    // if (balance <
    // ) {
    //   alert('You have insufficient balance in your account.');
    //   console.log('insufficient balance.');
    //   return false;
    // }

    if (balance < consultationRecord.doctor_schedule_fees) {
      alert('You have insufficient balance in your account.');
      console.log('insufficient balance.');
      return false;
    }

    this.setState({
      loading: true,
    });

    var payload = new FormData();
    payload.append('pharmacy_id', 544);
    payload.append('mobilenumber', userData.signup_contact);
    payload.append('amount', consultationRecord.consultation_fee);
    payload.append('wallet_detail_desc', 'Video Consultation');
    Services.post('use_wallet_trans', {}, payload, true)
      .then(responseJson => {
        console.log('use_wallet_trans_esponseJson', responseJson);

        this.updateConsultationStatus(responseJson.ins);

        // this.props.navigation.goBack();
      })
      .catch(error => {
        console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }
  updateConsultationStatus(ins) {
    const {userData, consultationRecord} = this.state;

    var payload = new FormData();
    payload.append('consultation_transc_id', ins);
    payload.append('consultation_paid_type', 1);
    payload.append('consultation_id', consultationRecord.consultation_id);
    Services.post('update_consultation_payment_status', {}, payload, true)
      .then(responseJson => {
        console.log('update_consultation_payment_status', responseJson);
        this.setState({
          loading: false,
          isPatientModal: true,
        });
        // this.updateConsultationStatus();

        // this.props.navigation.goBack();
      })
      .catch(error => {
        console.log('_error', error);

        // utils.showToast('Please check your internet connection');
        this.setState({
          loading: false,
        });
      });
  }

  onPressProcess() {
    const {
      mobilenumber,
      userData,
      balance,
      amount,
      type,
      paramData,
      consultationRecord,
    } = this.state;

    if (type == 'medicine') {
      this.confirmMedicine();
    } else {
      this.confirmConsultation();
    }
  }

  checkBalance() {
    const {
      mobilenumber,
      userData,
      data,
      amount,
      consultationRecord,
    } = this.state;

    // console.log('_userData_', userData);

    // return false;

    this.setState({
      loading: true,
    });

    var payload = new FormData();
    payload.append('signup_id', userData.signup_id);
    Services.post('get_transction_history', {}, payload, true)
      .then(responseJson => {
        this.setState({balance: responseJson.balance});

        this.setState({
          loading: false,
        });
      })
      .catch(error => {
        console.log('_error', error);

        this.setState({
          loading: false,
        });
      });
  }
  render() {
    const {
      loading,
      isPatientModal,
      consultationRecord,
      loadsData = [],
      showDatePicker,
      type,
      dateTimeModalType,
    } = this.state;

    console.log('consultationRecord', consultationRecord);

    return (
      <View style={styles.Container}>
        <PatientModal
          modalVisible={isPatientModal}
          data={consultationRecord}
          onReturnHome={() => {
            // const resetAction = StackActions.reset({
            //   index: 0,
            //   actions: [
          //     StackActions.reset({routeName: 'AssistantAppointments'}),
            //   ],
            // });
            // this.props.navigation.dispatch(resetAction);



            this.props.navigation.navigate("AssistantAppointments", {
              // screen: "Welcome",
              initial: false,
            });

            
          }}
        />

        <Header
          title="Payment"
          showBack={true}
          onLeftPress={() => {
            // console.log(' On left Press ');
            this.props.navigation.goBack();
          }}
        />

        {/* <Text style={styles.headingStyle}>
          {' '}
          Please select payment method. {this.state.balance}
        </Text> */}

        <ScrollView
          style={{
            flex: 1,
            paddingTop: 15,
            backgroundColor: Constants.Colors.backgrounGrey,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.desContainer}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Image
                source={Constants.sehat_wallet}
                style={styles.bannerStyle}
              />
            </View>

            <FlatList
              data={this.state.data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderNotification}
              scrollEnabled={true}
              numColumns={2}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <RoundedButton
            text="Proceed"
            textColor={'white'}
            fontsize={22}
            arrowIcon={true}
            customStyle={{
              width: '60%',
              borderRadius: 15,
              height: 50,
              marginTop: 20,
              marginBottom: 20,
              backgroundColor: Constants.Colors.primaryGreen,
            }}
            handleOnPress={() => {
              this.onPressProcess();
              // this.props.navigation.navigate('TransctionHistoryPayment', {
              //   total: 300,
              //   pay: 300,
              // });
            }}
          />
          {/* <View style={styles.desContainer}>
            <Text>Future Services</Text>
            <FlatList
              data={this.state.futureGateway}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderFutureNotification}
              scrollEnabled={true}
              numColumns={2}
              showsVerticalScrollIndicator={false}
            />
          </View> */}
        </ScrollView>
        {Utils.showSpinner(loading)}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.main.userData,
  };
};
export default connect(mapStateToProps)(PaymentSelection);
