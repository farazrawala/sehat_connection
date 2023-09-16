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
import * as Animatable from 'react-native-animatable';

// import {Icon} from 'native-base';
// import { Icon } from 'native-base';
import {
  Header,
  Heading,
  CustomInput,
  CustomCalendar,
  RoundedButton,
  Renderdoctors,
} from '../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';

import * as actions from '../../actions';

class ConsultationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      activeTab: 1,
      item:  this.props.route.params.item || {},
      attachments:  this.props.route.params.attachments || {},
      prescribedMedicines:
         this.props.route.params.prescribedMedicines || {},
      tags: [
        {name: 'Cardio'},
        {name: 'Heart Pain'},
        {name: 'Dizziness'},
        {name: 'Fever'},
        {name: 'Blood Vessels'},
        {name: 'Blood Cloths'},
        {name: 'Nauses'},
      ],
    };
  }

  componentDidMount() {}

  renderDetailView = type => {
    const {activeTab, prescribedMedicines = [], attachments = []} = this.state;

    if (type == 1 && activeTab == 1) {
      return (
        <View style={styles.descriptionContainer}>
          <Heading txt={'Medication :'} type={'medium'} />
          {/* <Text style={styles.descTextSTyle}>
            {Constants.dummyAddress}.{Constants.dummyAddress}.
            {Constants.dummyAddress}.
          </Text> */}
          {prescribedMedicines.map(item => {
            return (
              <Text style={styles.txtStyle}>
                - {item.medicine_name} ({item.prescription_period_id})
              </Text>
            );
          })}
        </View>
      );
    }

    if (type == 2 && activeTab == 2) {
      return (
        <View style={styles.descriptionContainer}>
          <Heading txt={'Medication :'} type={'medium'} />
          <Text style={styles.descTextSTyle}>
            {Constants.dummyAddress}.{Constants.dummyAddress}.
            {Constants.dummyAddress}.
          </Text>
        </View>
      );
    }

    if (type == 3 && activeTab == 3) {
      return (
        <View style={styles.descriptionContainer}>
          <Heading txt={'Medication :'} type={'medium'} />
          <Text style={styles.descTextSTyle}>
            {Constants.dummyAddress}.{Constants.dummyAddress}.
            {Constants.dummyAddress}.
          </Text>
        </View>
      );
    }

    if (type == 4 && activeTab == 4) {
      return (
        <View style={styles.descriptionContainer}>
          <Heading txt={'Attachments :'} type={'medium'} />
          <FlatList
            contentContainerStyle={{
              flexDirection: 'row',
            }}
            horizontal={true}
            data={this.state.attachments}
            renderItem={this.renderAttachments}
          />
        </View>
      );
    }
  };

  onPressTabActive(tab) {
    const {activeTab} = this.state;
    if (tab == activeTab) {
      this.setState({activeTab: 5});
    } else {
      this.setState({activeTab: tab});
    }
  }

  renderAttachments = ({item, index}) => {
    // consultation_attachment_img_path
    var img =
      Constants.url +
      item.consultation_attachment_img_path +
      item.consultation_attachment_img;

    return (
      <View style={styles.symtomsWrapper}>
        {/* <Text style={styles.symptontextSytle}>tsgdsf</Text> */}
        <Image
          source={{
            uri: img,
          }}
          style={{width: 100, resizeMode: 'contain', height: 200}}
        />
      </View>
    );
  };

  render() {
    const {
      loading,
      activeTab,
      loadsData = [],
      showDatePicker,
      item,
      dateTimeModalType,
    } = this.state;

    var img = Constants.url + item.signup_image_path + item.signup_image;

    console.log('items__', item);
    console.log('img__', img);

    return (
      <View style={styles.Container}>
        <Header
          title="Patient Profile"
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
          <View style={styles.desContainer}>
            <View style={styles.profileContainer}>
              <View style={styles.avatarImgContainer}>
                <View style={styles.profileImgWrapper}>
                  <Image
                    // source={Constants.avatar}
                    source={{
                      uri: img,
                    }}
                    style={styles.avatarStyle}
                  />
                </View>
              </View>
              <View style={styles.avatarDescContainer}>
                <Text style={styles.nameHeadingStyle}>
                  {Utils.capitalizeFirstLetter(item.signup_firstname)}{' '}
                  {Utils.capitalizeFirstLetter(item.signup_lastname)}
                </Text>
                <Text style={styles.ageStyle}>Age : {item.signup_age}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.onPressTabActive(1);
              }}
              style={styles.sectionCotainer}>
              <View style={styles.iconWrapper}>
                <Image
                  source={Constants.medication}
                  style={styles.tabIconStyle}
                />
              </View>
              <View style={styles.centerTextWrapper}>
                <Text style={styles.tabTextStyle}>Medications</Text>
              </View>
              <View style={styles.iconWrapper}>
                <Image
                  source={Constants.downArrow}
                  style={[
                    styles.downArrowStyle,
                    {transform: [{rotate: activeTab == 1 ? '180deg' : '0deg'}]},
                  ]}
                />
              </View>
            </TouchableOpacity>

            {this.renderDetailView(1)}

            <TouchableOpacity
              onPress={() => {
                this.onPressTabActive(2);
              }}
              style={styles.sectionCotainer}>
              <View style={styles.iconWrapper}>
                <Image
                  source={Constants.treatment}
                  style={styles.tabIconStyle}
                />
              </View>
              <View style={styles.centerTextWrapper}>
                <Text style={styles.tabTextStyle}>Treatments</Text>
              </View>
              <View style={styles.iconWrapper}>
                <Image
                  source={Constants.downArrow}
                  style={[
                    styles.downArrowStyle,
                    {transform: [{rotate: activeTab == 2 ? '180deg' : '0deg'}]},
                  ]}
                />
              </View>
            </TouchableOpacity>

            {this.renderDetailView(2)}

            <TouchableOpacity
              onPress={() => {
                this.onPressTabActive(3);
              }}
              style={styles.sectionCotainer}>
              <View style={styles.iconWrapper}>
                <Image
                  source={Constants.diagtest}
                  style={styles.tabIconStyle}
                />
              </View>
              <View style={styles.centerTextWrapper}>
                <Text style={styles.tabTextStyle}>Diagnostic Test</Text>
              </View>
              <View style={styles.iconWrapper}>
                <Image
                  source={Constants.downArrow}
                  style={[
                    styles.downArrowStyle,
                    {transform: [{rotate: activeTab == 3 ? '180deg' : '0deg'}]},
                  ]}
                />
              </View>
            </TouchableOpacity>

            {this.renderDetailView(3)}

            <TouchableOpacity
              onPress={() => {
                this.onPressTabActive(4);
              }}
              style={styles.sectionCotainer}>
              <View style={styles.iconWrapper}>
                <Image
                  source={Constants.attachment}
                  style={styles.tabIconStyle}
                />
              </View>
              <View style={styles.centerTextWrapper}>
                <Text style={styles.tabTextStyle}>Attachments</Text>
              </View>
              <View style={styles.iconWrapper}>
                <Image
                  source={Constants.downArrow}
                  style={[
                    styles.downArrowStyle,
                    {transform: [{rotate: activeTab == 4 ? '180deg' : '0deg'}]},
                  ]}
                />
              </View>
            </TouchableOpacity>

            {this.renderDetailView(4)}

            <View style={styles.descriptionContainer}>
              {/* <Heading txt={'Other Info :'} type={'medium'} />
              <Text style={styles.descTextSTyle}>
                {Constants.dummyAddress}.{Constants.dummyAddress}.
                {Constants.dummyAddress}.
              </Text> */}
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
export default connect(mapStateToProps)(ConsultationDetail);
