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
      attachments: [{}, {}],
      isDiabetic: false,
      isBlodPressure: false,
      isHeartTrouble: false,
      isAllergic: false,
      notesText: '',
      userData: this.props.userData,
      consultation_user_id: 0,
      // this.props.navigation.state.params.consultation_user_id || 0,
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
    };

    // console.log('Props', this.props.navigation.state.params.consultation_user_id);
  }

  componentDidMount() {}

  updateTagState = state => {
    console.log('state', state);
    this.setState({
      tags: state,
    });
  };

  renderSuggestions = () => {
    if (this.state.suggestions.length > 0) {
      return this.state.suggestions.map((item, count) => {
        return (
          <TouchableHighlight
            onPress={() => this.onSuggestionClick(item)}
            key={count}>
            <Text>{item}</Text>
          </TouchableHighlight>
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

  renderMultiAttachments() {
    const {attachments = []} = this.state;

    attachments.map((Item, index) => {
      return (
        <View>
          <Image
            style={styles.logo}
            source={{
              uri:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
            }}
          />
        </View>
      );
    });
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
    } = this.state;

    // console.log(ta);

    this.setState({loading: true});

    var payload = new FormData();
    var selectedDoctor = Utils.getSelectedDoctor();

    payload.append('is_diabetic', isDiabetic);
    payload.append('is_heart', isHeartTrouble);
    payload.append('is_blood', isBlodPressure);
    payload.append('is_allergic', isAllergic);

    payload.append('notes', notesText);
    payload.append('consultation_created_by', userData.signup_id);

    payload.append('consultation_user_id', consultation_user_id);
    payload.append('consultation_hospital_id', selectedDoctor.hospital_id);
    payload.append('consultation_doctor_id', selectedDoctor.signup_id);
    payload.append('consultation_shift_id', selectedDoctor.shift_id);

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

  debounceSearchResults = loc => {
    // console.log('debounceSearchResults is working', loc);

    const {searchText} = this.state;
    var payload = new FormData();
    payload.append('medicine_name', searchText);
    Services.post('medicine_list', {}, payload, true)
      .then(responseJson => {
        console.log('debounceSearchResults', responseJson);

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
  };

  debounceHandler = debounce(this.debounceSearchResults, 500);

  onChangeText = text => {
    // console.log('__text', text);
    if (text.length > 2) {
      this.setState({
        resultsVisible: false,
        searchText: text,
      });
      this.debounceHandler(text);
    } else {
      this.setState({
        resultsVisible: true,
        searchText: text,
        locationPrediction: [],
      });
    }
    // this.setState({});
  };

  render() {
    const {
      loading,
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

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Constants.Colors.backgrounGrey,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <SuggestionInput
            data={this.state.data}
            placeHolder="Search Symptoms"
            suggestionTitle="Add Symptoms"
            onChangeText={value => this.onChangeText(value)}
            onSuggestionClick={() => {
              console.log('_on  onSuggestionClick');
            }}
          />

          <View style={styles.desContainer}>
            <View style={styles.secSubContainer}>
              {/* <Heading
                fontSize={15}
                txt={'Symptoms :'}
                type={'small'}
                customStyle={{
                  marginBottom: 10,
                }}
              /> */}
              {/* <View style={styles.symptomsContainer}> */}
              {/* <TagInput
                  updateState={this.updateTagState}
                  tags={this.state.tags}
                  autoCapitalize={'none'}
                  customElement={<View>{this.renderSuggestions()}</View>}
                /> */}
              <CustomTags />
              {/* <TagInput
                updateState={this.updateTagState}
                tags={this.state.tags}
                placeholder="Symptoms..."
                // label='Press comma & space to add a tag'
                labelStyle={{color: '#fff'}}
                // customElement={<View>{this.renderSuggestions()}</View>}
                leftElementContainerStyle={{marginLeft: 3}}
                containerStyle={{width: '100%'}}
                inputContainerStyle={[
                  styles.textInput,
                  {backgroundColor: this.state.tagsColor},
                ]}
                inputStyle={{color: this.state.tagsText}}
                onFocus={() =>
                  this.setState({
                    tagsColor: '#fff',
                    tagsText: Constants.Colors.primaryBlue,
                  })
                }
                onBlur={() =>
                  this.setState({tagsColor: 'white', tagsText: '#fff'})
                }
                autoCorrect={false}
                tagStyle={styles.tag}
                deleteIconStyles={{color: this.state.tagsText}}
                tagTextStyle={styles.tagText}
                keysForTag={', '}
              /> */}
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
                customStyle={{
                  marginVertical: 15,
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
                txt={'Notes'}
                type={'small'}
                customStyle={{
                  marginVertical: 15,
                }}
              />
              <TextInput
                multiline={true}
                // selection={}
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
                // value={value}
              />
              {this.renderMultiAttachments()}
              <Camera
                getImages={value => {
                  this.setState({attachments: value}, function() {
                    this.onUpdateAttachments();
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
              {/* <TouchableOpacity style={styles.attachmentWrapper}>

                <Image
                  source={Constants.add_attch}
                  style={styles.attchImgStyle}
                />

                <Text style={styles.attchTextStyle}>Add Attachments</Text>

              </TouchableOpacity> */}
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
