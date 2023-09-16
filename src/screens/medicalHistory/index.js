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
// import {NavigationActions, StackActions} from 'react-navigation';
import styles from './styles';
import Services from '../../apis/services';

// import Sound from 'react-native-sound';
// import TagInput from 'react-native-tags-input';
// import Tags from "react-native-tags";

// import {Icon} from 'native-base';
// import { Icon } from 'native-base';
import {
  Header,
  Heading,
  RoundedButton,
  CustomCheckBox,
  // CustomTags,
  // Camera,
  PatientModal,
  // CustomCalendar,
 
  SuggestionInput,
  
} from '../../components';

// import CustomTags from '../../components/customtags';

// import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import {debounce, set} from 'lodash';
import * as actions from '../../actions';
import { tags } from 'react-native-svg/lib/typescript/xml';

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
      tag:'',
      tagsArray: [],
      // tags: {
      //   tag: '',
      //   tagsArray: [],
      // },
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

  // updateTagState = state => {
  //   this.setState(
  //     {
  //       tags: state,
  //     },
  //     () => {
  //       this.updateSuggestionState(state);
  //     },
  //   );
  // };

  updateSuggestionState = state => {
    const {suggestions} = this.state;
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
      tagsArray
    } = this.state;

    console.log('tagss',tags);
    console.log('tagsArray',tagsArray);

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

    // console.log('selectedDoctor', selectedDoctor);
    // return false;

    payload.append('is_diabetic', isDiabetic);
    payload.append('is_heart', isHeartTrouble);
    payload.append('is_blood', isBlodPressure);
    payload.append('is_allergic', isAllergic);

    payload.append('notes', notesText);
    payload.append('consultation_symptoms', tagsArray.toString());

    payload.append('consultation_created_by', userData.signup_id);

    payload.append('consultation_user_id', consultation_user_id);
    payload.append('consultation_hospital_id', selectedDoctor.hospital_id);
    payload.append('consultation_doctor_id', selectedDoctor.signup_id);
    payload.append('consultation_shift_id', selectedDoctor.shift_id);
    payload.append('consultation_fee', selectedDoctor.doctor_schedule_fees);

    payload.append(
      'consultation_schedule_id',
      selectedDoctor.doctor_schedule_id,
    );

    var header = {};
    console.info('create_consultation payload ', payload);
    Services.post('create_consultation', header, payload, true)
      .then(responseJson => {
        console.log('create_consultation', responseJson);
        if (responseJson.status == 1) {
          Utils.showToastMessage('Consultation created successfully.');
          this.setState({
            isPatientModal: false,
            loading: false,
            consultationRecord: responseJson.data,
          });
          // this.props.navigation.navigate('PaymentSelection', {
          //   consultationRecord: responseJson.data,
          // });

          this.props.navigation.navigate('PaymentSelection', {
            amount: responseJson.data.doctor_schedule_fees,
            consultationRecord: responseJson.data,
            type: 'video',
            paramData: responseJson.data,
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
    const {symptomText} = this.state;
    // console.log('debounceSearchResults is working__', symptomText);
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

  onPressTagsSubmit()
  {
    const {tagsArray} = this.state
    // tagsArray
    
    tagsArray.push(this.state.tag)
    console.log('onPressTagsSubmit__',tagsArray);
    this.setState({tag:'',tagsArray})

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
  onPressRemoveTag(index)
  {
    const {tagsArray= []} = this.state
    console.log('onPressRemoveTag',index);

    tagsArray.splice(index, 1);

    this.setState({tagsArray})

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
      tagsArray = []
    } = this.state;

    return (
      <View style={styles.Container}>
        <PatientModal
          modalVisible={isPatientModal}
          data={consultationRecord}
          onReturnHome={() => {


            const resetAction = StackActions.reset({
              index: 0,
              actions: [StackActions.reset({ routeName: 'App' })],
            });
            this.props.navigation.dispatch(resetAction);
           
          }}
        />

        <Header
          title="Consultation Details"
          showBack={true}
          onLeftPress={() => {
            // console.log(' On left Press ');
            this.props.navigation.goBack();
          }}
        />


{/* 
<Tags
    initialText="monkey"
    textInputProps={{
      placeholder: "Any type of animal"
    }}
    initialTags={["dog", "cat", "chicken"]}
    onChangeTags={tags => console.log(tags)}
    onTagPress={(index, tagLabel, event, deleted) =>
      console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
    }
    containerStyle={{ justifyContent: "center" }}
    inputStyle={{ backgroundColor: "white" }}
    renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
      <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
        <Text>{tag}</Text>
      </TouchableOpacity>
    )}
  /> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
          }}>

          <View style={styles.tagContainer}>
              <View style={styles.inputWrapper}>
             

              <TextInput
                // onChangeText={text => this.onChangeText(text)}
                style={styles.inputTagsStyle}
                value={this.state.tag}
                placeholder="Symptoms"
                placeholderTextColor="grey"
                onChangeText={text => {
                  this.setState({tag: text});
                }}
                onSubmitEditing={(value) => {

                  // console.log('onSubmitEditing',value);
                  // this.setState({})
                  // onSubmitEditing = {onSubmitEditing};
                  this.onPressTagsSubmit();
                }}
              />




              </View>

              <View style={styles.tagWrapper}>
                  {
                    tagsArray.map((value,index) =>{
                     return  <View style={styles.tagWrap}>
                        <Text style={styles.tagStyle}>{value}</Text>
                        <TouchableOpacity 
                        // onPress
                        onPress={() => this.onPressRemoveTag(index)}
                        style={styles.crossBtn}>
                          <Text style={{color:Constants.Colors.primaryBlue,fontSize:15,fontWeight:'bold', marginTop:-5,}}>x</Text>
                        </TouchableOpacity>
                      </View>
                    })
                  }
              </View>
          </View>


            {/* <CustomTags /> */}
{/* 
          <TagInput
              updateState={this.updateTagState}
              tags={this.state.tags}
          /> */}


          {/* <TagInput
            updateState={this.updateTagState}
            tags={this.state.tags}
            placeholder="Symptoms..."
            // label="Press comma & space to add a tag"
            labelStyle={{color: '#fff'}}
            customElement={<View>{this.renderSuggestions()}</View>}
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
          /> */}


        </View>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Constants.Colors.backgrounGrey,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>

{/*             
          <SuggestionInput
            data={this.state.data}
            value={this.state.symptomText}
            // onChangeText={symptomText => this.setState({symptomText})}
            placeHolder="Symptoms"
            suggestionTitle="Add Symptoms"
            onChangeText={value => this.onChangeText(value)}
            onSuggestionClick={item => this.onClickSuggestion(item)}
          /> */}

          

          <View style={styles.desContainer}>
            <View style={styles.secSubContainer}>
              
              <Heading
                fontSize={15}
                txt={'Health History'}
                type={'small'}
                customStyle={{
                  // marginVertical: 15,
                  marginBotom: 15,

                  // marginTop: 150,
                }}
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
                txt={'Additional Information'}
                type={'small'}
                customStyle={{
                  marginVertical: 15,
                }}
              />

              <TextInput
                multiline={true}
                 placeholder="Type here."
                style={{
                  height: 140,
                  padding: 10,
                  color:Constants.Colors.primaryBlue,
                  backgroundColor: 'white',
                }}
                onChangeText={text => {
                  this.setState({
                    notesText: text,
                  });
                }}
              />
              {/* {this.renderMultiAttachments()} */}

              {/* <Camera
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
              </Camera> */}
              
              {/* <View style={{flexDirection: 'row', marginBottom: 20}}>
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
              </View> */}

              <View style={{marginVertical:20}}/>

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
