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
} from 'react-native';
import styles from './styles';
// import {Image} from 'react-native-elements';
// import {Icon} from 'native-base';
// import { Icon } from 'native-base';
import {
  Header,
  Heading,
  PatientModal,
  CustomCalendar,
  RoundedButton,
  Renderdoctors,
} from '../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';
// import {utils} from 'react-native-connectycube';
// import Gallery from 'react-native-awesome-gallery';
const images = ['https://image1', 'https://image2'];
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// Entypo

import Entypo from "react-native-vector-icons/Entypo";


class ConsultationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      loading: false,
      videoLoading: false,
      modalVisible: false,
      data: [],
      modalImg: '',
      item:  this.props.route.params.item || {},
      tags: [],
      prescribedMedicines: [],
      attachments: [],
      attachmentsGallery: [],
    };

    // console.log('ConsultationDetail', this.state.item);
  }

  onPressCall(userId) {
    const {userData} = this.state;

    var payload = new FormData();
    payload.append('to', userId);
    payload.append('from', userData.signup_id);
    Services.post('call_notify', {}, payload, true)
      .then(responseJson => {
        console.log('step_one_check_user_is_ready', responseJson);

        if (responseJson.status == 1) {
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

  componentDidMount = async () => {
    // this.setCurrentConsultationInfo();
    this.updateData();
    this.get_api_data();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.listner();
    });

    Utils.saveConsultUserData(this.state.item);
    console.log('saveConsultUserData___', Utils.getConsultUserData());
  };

  listner() {
    // this.setState({addedMedicines: Utils.getconsultantMedicine()});
    // if (this.state.addedMedicines.length > 0)
    this.get_api_data();
  }

  get_api_data() {
    const {item = {}} = this.state;
    var payload = new FormData();
    payload.append('test', '');
    Services.post('get_prescription/' + item.consultation_id, {}, payload, true)
      .then(responseJson => {
        // console.log('prescribedMedicines', responseJson);

        if (responseJson.status == 1) {
          this.setState({
            prescribedMedicines: responseJson.data,
            attachments: responseJson.attachments,
            loading: false,
          });
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

  updateData() {
    const {item} = this.state;

    if (
      item.consultation_symptoms != null &&
      item.consultation_symptoms != ''
    ) {
      var tags = item.consultation_symptoms.split(',');
      this.setState({tags});
    }
  }
  renderAttachments = ({item, index}) => {
    // consultation_attachment_img_path
    const {attachmentsGallery = []} = this.state;
    var img =
      Constants.url +
      item.consultation_attachment_img_path +
      item.consultation_attachment_img;
    attachmentsGallery.push(img);

    console.log('_img_', item);

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            modalVisible: true,
            modalImg: img,
          });
        }}
        style={styles.symtomsWrapper}>
        <Image
          source={{
            uri: img,
          }}
          style={{width: 100, resizeMode: 'contain', height: 200}}
        />
      </TouchableOpacity>
    );
  };

  onVideoCall(userId, consult_data) {
    const {userData, videoLoading} = this.state;
    this.setState({videoLoading: true});
    setTimeout(() => {
      if (videoLoading == true) {
        this.setState({videoLoading: false});
        Utils.showToastMessage('Please try again later.');
      }
    }, 10000);
    var payload = new FormData();
    payload.append('to', userId);
    payload.append('from', userData.signup_id);
    payload.append('consultation_id', consult_data.consultation_id);
    payload.append('room_id', '7gf0-xwmk-n0pn');
    payload.append('initiate', 1);
    console.log('call_notify_payload', payload);
    Services.post('call_notify', {}, payload, true)
      .then(responseJson => {
        

        var response = responseJson.arr;
        console.log('call_notify', responseJson.arr);
        this.props.navigation.navigate("Waiting",{response,userData})


        // if (response.failure == 1) {
        //   this.setState({videoLoading: false});
        //   Utils.showToastMessage('Assistant is not online.');
        // }
        // else
        // {
         
        // }
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
      videoLoading,
      loadsData = [],
      showDatePicker,
      prescribedMedicines = [],
      dateTimeModalType,
      attachmentsGallery = [],
      item,
      modalVisible = false,
      attachments,
      userData,
      modalImg,
    } = this.state;

    var userImage = '';
    if (
      item.signup_image != '' &&
      item.signup_image != null &&
      item.signup_image != 'undefined'
    )
      userImage = Constants.url + item.signup_image_path + item.signup_image;
    else if (item.signup_gendar == 'male')
      userImage = Constants.imgBaseUrl + 'men_avatar.png';
    else if (item.signup_gendar == 'female')
      userImage = Constants.imgBaseUrl + 'female_avatar.png';
    else userImage = Constants.imgBaseUrl + 'other_avatar.png';

    // console.log('Consultation_Details_image', userImage);
    // console.log('Consultation_Details_image', item.doctr[0].signup_firstname);

    return (
      <View style={styles.Container}>
        {/* <Gallery
          data={attachmentsGallery}
          onIndexChange={newIndex => {
            console.log(newIndex);
          }}
        /> */}

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            this.setState({
              modalVisible: !modalVisible,
            });
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <Text style={styles.modalText}>Hello World!</Text>
               */}
              <Image
                source={{
                  uri: modalImg,
                }}
                style={styles.modalImag}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  this.setState({
                    modalVisible: !modalVisible,
                  });
                }}>
                <Text style={styles.textStyle}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Header
          title="Consultation Details"
          showBack={true}
          showVideo={userData.signup_type == 1 ? true : false}
          onLeftPress={() => {
            this.props.navigation.goBack();

            // this.props.navigation.navigate('ConsultationHistory');
          }}
          onRightPress={() => {
            this.onVideoCall(item.consultation_created_by, item);
          }}
        />

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Constants.Colors.backgrounGrey,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.desContainer}>
            <View style={styles.profileContainer}>
              <View style={styles.avatarImgContainer}>
                <View style={styles.profileImgWrapper}>
                  <Image
                    source={{
                      uri: userImage,
                    }}
                    style={styles.avatarStyle}
                  />
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('PatientProfile', {
                        item,
                        prescribedMedicines,
                        attachments,
                      });
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: Constants.Colors.primaryGreen,
                        fontSize: 14,
                      }}>
                      Patient Profile
                    </Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      type="MaterialIcons"
                      style={styles.patientProfileIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.avatarDescContainer}>
                <Text style={styles.dateStyleTxt}>
                  {item.consultation_createdon}
                </Text>
                <Text style={styles.nameHeadingStyle}>
                  {Utils.capitalizeFirstLetter(item.signup_firstname)}{' '}
                  {Utils.capitalizeFirstLetter(item.signup_lastname)}
                </Text>
                <Text style={styles.ageStyle}>
                  Age : {Utils.capitalizeFirstLetter(item.signup_age)}{' '}
                  {Utils.capitalizeFirstLetter(item.signup_age_type)}
                  {/* Years */}
                </Text>

                {this.state.userData.signup_type != 1 ? (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.consultationHeadingStyle}>
                      {/* Consultation With :{' '} */}
                    </Text>
                    <Text style={styles.consultationTextStyle}>
                      Dr.{' '}
                      {Utils.capitalizeFirstLetter(
                        item.doctr[0].signup_firstname,
                      )}{' '}
                    </Text>
                  </View>
                ) : null}

                {this.state.userData.signup_type != 1 ? (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.consultationHeadingStyle}>
                      {/* Consultation Clinic : */}
                    </Text>
                    <Text style={styles.consultationTextStyle}>
                      {Utils.capitalizeFirstLetter(item.doctr[0].category_name)}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>

            <View style={styles.sectionCotainer}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.timeWrapper}>
                  {/* <Text>3 pm </Text> */}
                  {/* <Text style={styles.dateStyleTxt}>
                    {item.consultation_createdon}
                  </Text> */}
                </View>
                <View style={styles.rightWrapper}>
                  <MaterialCommunityIcons
                    name="printer"
                    type="MaterialCommunityIcons"
                    style={styles.patientProfileIcon}
                  />
                  <Text style={styles.printCopyStyle}>Print Copy</Text>
                </View>
              </View>

              <View style={styles.secSubContainer}>
                <Heading txt={'Health History'} type={'medium'} />
                <Text style={styles.deseasTxtStyl}>
                  Diabetic : {item.is_diabetic == 'true' ? 'Yes' : 'No'}
                </Text>
                <Text style={styles.deseasTxtStyl}>
                  High Blood Pressure :{item.is_heart == 'true' ? 'Yes' : 'No'}
                </Text>
                <Text style={styles.deseasTxtStyl}>
                  Heart Trouble : {item.is_blood == 'true' ? 'Yes' : 'No'}
                </Text>
                <Text style={styles.deseasTxtStyl}>
                  Allergic wtih NSAIDS :
                  {item.is_allergic == 'true' ? 'Yes' : 'No'}
                </Text>
                <Heading txt={''} type={'medium'} />

                <Heading txt={'Symptoms'} type={'medium'} />
                <View style={styles.symptomsContainer}>
                  <FlatList
                    contentContainerStyle={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}
                    data={this.state.tags}
                    renderItem={({item}) => (
                      <View style={styles.symtomsWrapper}>
                        <Text style={styles.symptontextSytle}>{item}</Text>
                        <Entypo
                          name="cross"
                          type="Entypo"
                          style={styles.crossIconStyle}
                        />
                      </View>
                    )}
                  />
                </View>
                <View
                  style={{
                    width: Constants.ScreenWidth - 40,
                    height: 1,
                    backgroundColor: Constants.Colors.lightGrey,
                  }}
                />
                <View
                  style={
                    {
                      // alignItems: 'center',
                    }
                  }>
                  <Heading
                    txt={'Additional Information:'}
                    type={'medium'}
                    customStyle={{
                      marginTop: 10,
                      // marginVertical: 10,
                    }}
                  />
                  <Text style={{marginTop: 5, }}>{item.notes}</Text>
                </View>

                {/* <View style={styles.symptomsContainer}>


                  <View style={styles.symtomsWrapper}>
                    <Text style={styles.symptontextSytle}>Cough</Text>
                    <Icon name="cross" type="Entypo" style={styles.crossIconStyle} />
                  </View>

                  <View style={styles.symtomsWrapper}>
                    <Text style={styles.symptontextSytle}>Cough</Text>
                    <Icon name="cross" type="Entypo" style={styles.crossIconStyle} />
                  </View>

                  <View style={styles.symtomsWrapper}>
                    <Text style={styles.symptontextSytle}>Cough</Text>
                    <Icon name="cross" type="Entypo" style={styles.crossIconStyle} />
                  </View>

                </View> */}
              </View>

              <View
                style={{
                  width: Constants.ScreenWidth - 40,
                  height: 1,
                  marginHorizontal: 20,
                  backgroundColor: Constants.Colors.lightGrey,
                }}
              />
            </View>

            <View style={styles.sectionCotainer}>
              <View style={styles.secSubContainer}>
                <Heading
                  txt={'Prescription:'}
                  type={'medium'}
                  customStyle={{
                    marginVertical: 10,
                  }}
                />
                {prescribedMedicines.map(item => {
                  return (
                    <Text style={styles.txtStyle}>
                      - {item.medicine_name} ({item.prescription_period_name})
                    </Text>
                  );
                })}


              {


userData.signup_type == 1 ?

            <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Prescription', {item});
                  }}
                  style={styles.rightWrapper}>
                  <Text style={[styles.readMoreStyle]}>
                    {prescribedMedicines.length > 0 ? 'Read More' : 'Add'}
                  </Text>
                </TouchableOpacity> 
                : 
                <TouchableOpacity
                 
                  style={styles.rightWrapper}>
                  <Text style={[styles.readMoreStyle]}>
                  Read More
                  </Text>
                </TouchableOpacity> 
              }
                



              </View>
              <View
                style={{
                  width: Constants.ScreenWidth - 40,
                  height: 1,
                  marginHorizontal: 20,
                  backgroundColor: Constants.Colors.lightGrey,
                }}
              />
            </View>

            <View style={styles.sectionCotainer}>
              <View style={styles.secSubContainer}>
                <Heading
                  txt={'Suggested Diagnostics :'}
                  type={'medium'}
                  customStyle={{
                    marginVertical: 10,
                  }}
                />
                {/* <Text style={styles.txtStyle}>- Tab Panadol (1+1+1)</Text>
                <Text style={styles.txtStyle}>- Tab Panadol (1+1+1)</Text>
                <Text style={styles.txtStyle}>- Tab Panadol (1+1+1)</Text>
                <Text style={styles.txtStyle}>- Tab Panadol (1+1+1)</Text> */}
                <View style={styles.rightWrapper}>
                  <Text style={[styles.readMoreStyle]}>Read More</Text>
                </View>
              </View>
              <View
                style={{
                  width: Constants.ScreenWidth - 40,
                  height: 1,
                  marginHorizontal: 20,
                  backgroundColor: Constants.Colors.lightGrey,
                }}
              />
            </View>

            <View style={styles.sectionCotainer}>
              <View style={styles.secSubContainer}>
                <Heading
                  txt={'Remarks :'}
                  type={'medium'}
                  customStyle={{
                    marginVertical: 10,
                  }}
                />
                <Text style={styles.txtStyle}>
                  {/* Patient is suffering from fever & Nausea. possible symptomi of
                  cardio vescuallar disease Suggested. */}
                </Text>
                <View style={styles.rightWrapper}>
                  <Text style={[styles.readMoreStyle]}>Read More</Text>
                </View>
              </View>
              <View
                style={{
                  width: Constants.ScreenWidth - 40,
                  height: 1,
                  marginHorizontal: 20,
                  backgroundColor: Constants.Colors.lightGrey,
                }}
              />
            </View>

            <View style={styles.sectionCotainer}>
              <View style={styles.secSubContainer}>
                <Heading
                  txt={'Attachments :'}
                  type={'medium'}
                  customStyle={{
                    marginVertical: 10,
                  }}
                />

                <FlatList
                  contentContainerStyle={{
                    flexDirection: 'row',
                  }}
                  horizontal={true}
                  data={this.state.attachments}
                  renderItem={this.renderAttachments}
                />
              </View>

              <View
                style={{
                  width: Constants.ScreenWidth - 40,
                  height: 1,
                  marginHorizontal: 20,
                  backgroundColor: Constants.Colors.lightGrey,
                }}
              />
            </View>
          </View>
        </ScrollView>

        {Utils.showSpinner(loading)}
        {/* {Utils.showVideoCallSpinner(videoLoading)} */}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.main.userData,
  };
};
export default connect(mapStateToProps)(ConsultationDetail);
