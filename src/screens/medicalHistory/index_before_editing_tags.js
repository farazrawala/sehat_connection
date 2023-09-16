import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  TextInput,
  Dimensions,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  FlatList,
  Modal,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import styles from './styles';
import Services from '../../apis/services';
import TagInput from 'react-native-tags-input';
// import {Icon} from 'native-base';
// import { Icon } from 'native-base';
import {
  Header,
  Heading,
  CustomTags,
  Camera,
  PatientModal,
  CustomCalendar,
  RoundedButton,
  SuggestionInput,
  CustomCheckBox,
} from '../../components';

// import CustomTags from '../../components/customtags';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import {debounce, set} from 'lodash';
import * as actions from '../../actions';

const mainColor = Constants.Colors.primaryBlue;

class MedicalHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      consultationRecord: {},
      isPatientModal: false,
      data: [],
      profileimg: [],
      attachmentsData: [],
      symptomText: '',
      symptomData: [
        {name: 'Fever'},
        {name: 'HeadAche'},
        {name: 'Heart Pain'},
        // {name: 'Panadol'},
        // {name: 'Panadol'},
        // {name: 'Panadol'},
        // {name: 'Panadol'},
      ],
      attachments: [],
      isDiabetic: false,
      isBlodPressure: false,
      isHeartTrouble: false,
      isAllergic: false,
      notesText: '',
      userData: this.props.userData,
      consultation_user_id:
        this.props.route.params.consultation_user_id || 0,
      // tags: [
      //   { name: 'Cardio' },
      //   { name: 'Heart Pain' },
      //   { name: 'Dizziness' },
      //   { name: 'Fever' },
      //   { name: 'Blood Vessels' },
      //   { name: 'Blood Cloths' },
      //   // { name: 'Nauses' },
      // ],
      tags: {
        tag: '',
        tagsArray: [],
      },
      tagsColor: 'white',
      tagsText: '#fff',
      suggestions: [],
    };

    // console.log('Props', this.props.route.params.consultation_user_id);
  }

  componentDidMount() {}

  // updateTagState = state => {
  //   console.log('state', state);
  //   this.setState({
  //     tags: state,
  //   });
  // };

  updateTagState = state => {
    this.setState(
      {
        tags: state,
      },
      () => {
        this.updateSuggestionState(state);
      },
    );
  };

  updateSuggestionState = state => {
    if (state.tag === '') {
      return;
    }

    // Replace this with a callback from a search in your database
    let suggestionsArr = ['Fever', 'Stoma Ache', 'Headache', 'Cough', 'Cold'];
    let tempSuggestions = []; //
    //
    for (let i = 0; i < suggestionsArr.length; i++) {
      //
      if (suggestionsArr[i].includes(state.tag) === true) {
        // Replace this with database search result which will be
        tempSuggestions.push(suggestionsArr[i]); // added to the tempSuggestions-array.
      } //
    }
    if (tempSuggestions.length > 0) {
      this.setState({
        suggestions: tempSuggestions,
      });
    } else {
      this.setState({
        suggestions: [],
      });
    }
  };

  renderSuggestions = () => {
    if (this.state.suggestions.length > 0) {
      return this.state.suggestions.map((item, count) => {
        return (
          <TouchableOpacity
            onPress={() => this.onSuggestionClick(item)}
            key={count}
            style={styles.suggestionWrapper}>
            <Text style={styles.suggestionStyle}>{item}</Text>
          </TouchableOpacity>
        );
      });
    } else {
      return null;
    }
  };

  onUpdateAttachments() {
    const {attachments} = this.state;
    console.log('onUpdateAttachments', attachments);
  }

  onPressSubmit() {
    const {
      tags,
      notesText,
      isAllergic,
      consultation_user_id,
      isDiabetic,
      isHeartTrouble,
      isBlodPressure,
      userData,
      attachments,
    } = this.state;

    // console.log(tags.tagsArray);

    this.setState({loading: true});

    var payload = new FormData();
    var selectedDoctor = Utils.getSelectedDoctor();

    attachments.map((img, index) => {
      console.log('img__', img);
      payload.append('consultation_attachment_img[' + index + ']', {
        uri: img.path,
        name: 'image',
        type: 'image/jpeg',
      });
    });

    // console.log('selectedDoctor', );
    // return false;

    payload.append('is_diabetic', isDiabetic);
    payload.append('is_heart', isHeartTrouble);
    payload.append('is_blood', isBlodPressure);
    payload.append('is_allergic', isAllergic);

    payload.append('notes', notesText);
    payload.append('consultation_symptoms', tags.tagsArray.toString());

    payload.append('consultation_created_by', userData.signup_id);

    payload.append('consultation_user_id', consultation_user_id);
    payload.append('consultation_hospital_id', selectedDoctor.hospital_id);
    payload.append('consultation_doctor_id', selectedDoctor.signup_id);
    payload.append('consultation_shift_id', selectedDoctor.shift_id);
    payload.append(
      'consultation_schedule_id',
      selectedDoctor.doctor_schedule_id,
    );

    var header = {};
    console.info('create_consultation payload ', payload);
    Services.post('create_consultation', header, payload, true)
      .then(responseJson => {
        console.log('submit login 2', responseJson);
        if (responseJson.status == 1) {
          Utils.showToastMessage('Consultation created successfully.');
          this.setState({
            isPatientModal: false,
            loading: false,
            consultationRecord: responseJson.data,
          });
          this.props.navigation.navigate('PaymentSelection', {
            consultationRecord: responseJson.data,
          });
        }
      })
      .catch(error => {
        console.log('error', error);

        this.setState({
          loading: false,
        });
      });
  }

  onSuggestionClick = suggestion => {
    let state = this.state.tags;

    console.log('onSuggestionClick', suggestion);

    state.tagsArray.push(suggestion);

    this.setState({
      tags: {
        tag: '',
        tagsArray: state.tagsArray,
      },
      suggestions: [],
    });
  };

  debounceSearchResults() {
    // console.log('debounceSearchResults is working', loc);

    const {symptomText} = this.state;
    var payload = new FormData();
    payload.append('symptoms_name', symptomText);
    Services.post('symptoms_list', {}, payload, true)
      .then(responseJson => {
        console.log('symptoms_list', responseJson);

        if (responseJson.status == 1) {
          this.setState({
            data: responseJson.data,
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

  debounceHandler = debounce(this.debounceSearchResults, 500);

  onChangeText = text => {
    console.log('__text', text);
    if (text.length > 2) {
      this.setState({
        resultsVisible: false,
        symptomText: text,
      });
      this.debounceHandler(text);
    } else {
      this.setState({
        resultsVisible: true,
        symptomText: text,
        locationPrediction: [],
      });
    }
    // this.setState({});
  };

  onClickSuggestion(item) {
    // const {addedMedicines = []} = this.state;
    // addedMedicines.push(item);
    // this.setState({addedMedicines, data: [], searchText: ''});
    // Utils.setConsultantMedicine(addedMedicines);
    // console.log('addedMedicines__', Utils.getconsultantMedicine());
    console.log('onClickSuggestion', item);
  }

  onUploadAttachments(id = 6) {
    const {attachments = []} = this.state;

    console.log('profileimg', attachments);

    // return false;
    var payload = new FormData();

    attachments.map((img, index) => {
      console.log('img__', img);
      payload.append('consultation_attachment_img[' + index + ']', {
        uri: img.path,
        name: 'image',
        type: 'image/jpeg',
      });
    });

    payload.append('consultation_id', id);

    var header = {
      'Content-Type': 'multipart/form-data',
    };

    console.log('payload image upload', payload);

    Services.post('add_consultation_attachment', header, payload, true)
      .then(responseJson => {
        console.log('add_consultation_attachment upload', responseJson);

        // this.setState({
        //   loading: false,
        //   isUploadedImg: true,
        //   uploadedImg: responseJson.file_name,
        //   uploadedImgUrl: responseJson.img_path,
        //   // Constants.imgBaseUrl + "user/members/" +
        // });

        // console.log('new pateh -=-=  ', this.state.uploadedImgUrl);
      })
      .catch(error => {
        console.log('error', error);

        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const {
      loading,
      attachments,
      memberData,
      isPatientModal = false,
      consultationRecord = {},
      loadsData = [],
      showDatePicker,
      dateTimeModalType,
    } = this.state;

    return (
      <View style={styles.Container}>
        {/* <PatientModal
          modalVisible={isPatientModal}
          data={consultationRecord}
          onReturnHome={() => {


            const resetAction = StackActions.reset({
              index: 0,
              actions: [StackActions.reset({ routeName: 'App' })],
            });
            this.props.navigation.dispatch(resetAction);
           
          }}
        /> */}

        <Header
          title="Consultation Details"
          showBack={true}
          onLeftPress={() => {
            // console.log(' On left Press ');
            this.props.navigation.goBack();
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
          }}>
          <TagInput
            updateState={this.updateTagState}
            tags={this.state.tags}
            placeholder="Symptoms..."
            // label="Press comma & space to add a tag"
            labelStyle={{color: '#fff'}}
            // customElement={<View>{this.renderSuggestions()}</View>}
            leftElementContainerStyle={{marginLeft: 3}}
            containerStyle={{
              width: '100%',
              // backgroundColor: 'blue',
              padddinTop: 25,
            }}
            inputContainerStyle={[
              styles.symtomsStyle,
              {backgroundColor: this.state.tagsColor},
            ]}
            inputStyle={{color: this.state.tagsText}}
            onFocus={
              () =>
                this.setState({
                  tagsColor: '#fff',
                  tagsText: Constants.Colors.primaryBlue,
                })
              // console.log('on Focus')
            }
            onBlur={
              () => this.setState({tagsColor: 'white', tagsText: '#fff'})
              // console.log('on onBlur')
            }
            autoCorrect={false}
            tagStyle={styles.tag}
            deleteIconStyles={{color: 'white', fontSize: 20}}
            tagTextStyle={styles.tagText}
            keysForTag={', '}
          />
        </View>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Constants.Colors.backgrounGrey,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          {/* <SuggestionInput
            data={this.state.data}
            value={this.state.symptomText}
            // onChangeText={symptomText => this.setState({symptomText})}
            placeHolder="Symptoms"
            suggestionTitle="Add Symptoms"
            onChangeText={value => this.onChangeText(value)}
            onSuggestionClick={item => this.onClickSuggestion(item)}
          />

           */}

          <View style={styles.desContainer}>
            <View style={styles.secSubContainer}>
              {/* <FlatList
                  contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                  data={this.state.tags}
                  renderItem={({ item }) =>
                    <View style={styles.symtomsWrapper}>
                      <Text style={styles.symptontextSytle}>{item.name}</Text>
                      <Icon name="cross" type="Entypo" style={styles.crossIconStyle} />
                    </View>
                  }
                />
              {/* </View> */}
              <Heading
                fontSize={15}
                txt={'Health History'}
                type={'small'}
                customStyle={
                  {
                    // marginVertical: 15,
                    // marginBotom: 15,
                    // marginTop: 150,
                  }
                }
              />
              <View style={styles.diseasContainer}>
                <View style={styles.diseaseWrapper}>
                  <View style={{flex: 1}}>
                    <Text style={styles.deseasTxtStyl}>Diabetic </Text>
                  </View>
                  <CustomCheckBox
                    isDropdown={false}
                    compType={'mapInput'}
                    inputPlaceHoler={'Yes'}
                    labelCustomStyle={{
                      marginTop: -20,
                    }}
                    onPress={() => this.setState({isDiabetic: true})}
                    value={this.state.isDiabetic}
                  />

                  <CustomCheckBox
                    isDropdown={false}
                    compType={'mapInput'}
                    inputPlaceHoler={'No'}
                    labelCustomStyle={{
                      marginTop: -20,
                    }}
                    onPress={() => this.setState({isDiabetic: false})}
                    value={!this.state.isDiabetic}
                  />
                </View>

                <View style={styles.diseaseWrapper}>
                  <View style={{flex: 1}}>
                    <Text style={styles.deseasTxtStyl}>
                      High Blood Pressure{' '}
                    </Text>
                  </View>
                  <CustomCheckBox
                    isDropdown={false}
                    compType={'mapInput'}
                    inputPlaceHoler={'Yes'}
                    labelCustomStyle={{
                      marginTop: -20,
                    }}
                    onPress={() => this.setState({isBlodPressure: true})}
                    value={this.state.isBlodPressure}
                  />

                  <CustomCheckBox
                    isDropdown={false}
                    compType={'mapInput'}
                    inputPlaceHoler={'No'}
                    labelCustomStyle={{
                      marginTop: -20,
                    }}
                    onPress={() => this.setState({isBlodPressure: false})}
                    value={!this.state.isBlodPressure}
                  />
                </View>

                <View style={styles.diseaseWrapper}>
                  <View style={{flex: 1}}>
                    <Text style={styles.deseasTxtStyl}>Heart Trouble </Text>
                  </View>
                  <CustomCheckBox
                    isDropdown={false}
                    compType={'mapInput'}
                    inputPlaceHoler={'Yes'}
                    labelCustomStyle={{
                      marginTop: -20,
                    }}
                    onPress={() => this.setState({isHeartTrouble: true})}
                    value={this.state.isHeartTrouble}
                  />

                  <CustomCheckBox
                    isDropdown={false}
                    compType={'mapInput'}
                    inputPlaceHoler={'No'}
                    labelCustomStyle={{
                      marginTop: -20,
                    }}
                    onPress={() => this.setState({isHeartTrouble: false})}
                    value={!this.state.isHeartTrouble}
                  />
                </View>

                <View style={styles.diseaseWrapper}>
                  <View style={{flex: 1}}>
                    <Text style={styles.deseasTxtStyl}>
                      Allergic wtih NSAIDS
                    </Text>
                  </View>
                  <CustomCheckBox
                    isDropdown={false}
                    compType={'mapInput'}
                    inputPlaceHoler={'Yes'}
                    labelCustomStyle={{
                      marginTop: -20,
                    }}
                    onPress={() => this.setState({isAllergic: true})}
                    value={this.state.isAllergic}
                  />

                  <CustomCheckBox
                    isDropdown={false}
                    compType={'mapInput'}
                    inputPlaceHoler={'No'}
                    labelCustomStyle={{
                      marginTop: -20,
                    }}
                    onPress={() => this.setState({isAllergic: false})}
                    value={!this.state.isAllergic}
                  />
                </View>
              </View>
              <Heading
                fontSize={15}
                txt={'Notes'}
                type={'small'}
                customStyle={{
                  marginVertical: 15,
                }}
              />

              <TextInput
                multiline={true}
                // selection={}
                // returnKeyType={'done'}
                placeholder="Type here."
                style={{
                  height: 140,
                  padding: 10,
                  backgroundColor: 'white',
                }}
                onChangeText={text => {
                  this.setState({
                    notesText: text,
                  });
                }}
                // value={value}
              />
              {/* {this.renderMultiAttachments()} */}

              <Camera
                isMultiple={true}
                isCamera={false}
                getImages={value => {
                  attachments.push(value);
                  console.log('getImages_value', value);
                  this.setState({attachments: value}, function() {
                    // this.onUploadAttachments();
                  });
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={Constants.add_attch}
                    style={styles.attchImgStyle}
                  />

                  <Text style={styles.attchTextStyle}>Add Attachments</Text>
                </View>
              </Camera>
              <View style={{flexDirection: 'row', marginBottom: 20}}>
                {this.state.attachments.map((Item, index) => {
                  // console.log('attachments', Item.path);
                  return (
                    <View>
                      <Image
                        style={styles.attachmentsStyle}
                        source={{
                          uri: Item.path,
                        }}
                      />
                    </View>
                  );
                })}
              </View>

              <RoundedButton
                text="Submit"
                textColor={'white'}
                fontsize={18}
                customStyle={{
                  width: 200,
                  height: 50,
                }}
                handleOnPress={() => {
                  this.onPressSubmit();
                }}
              />
            </View>
          </View>
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
export default connect(mapStateToProps)(MedicalHistory);
