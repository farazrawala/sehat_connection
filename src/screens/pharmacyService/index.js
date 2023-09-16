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
  Alert,
} from 'react-native';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import {debounce, set} from 'lodash';
// import {Icon} from 'native-base';
import {NavigationActions, StackActions} from 'react-navigation';
// import { Icon } from 'native-base';
import {
  Header,
  Heading,
  CustomCalendar,
  RoundedButton,
  SuggestionInput,
  HomeMenus,
  Renderdoctors,
} from '../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';

class PharmacyService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      userLocation: this.props.userLocation,
      loading: false,
      data: [
        {
          screen: 'Category',
          title: 'Health Store',
          color: '#83deab',
          icon: Constants.healthcare_icon,
          batch: 1,
        },
        {
          screen: 'ListQuotation',
          title: 'Order Request',
          color: '#f6d367',
          icon: Constants.quotation_list,
          batch: 0,
        },
      ],
      request: [],
      loading: false,
      activeTab: 0,
      searchText: '',
      prescriptionId: 0,
      // item: props.navigation.state.params.item || {},
    };
    // console.log('Medicals _', this.state.userData);
  }

  componentWillUnmount() {
    this.focusListener();
  }

  componentDidMount() {
    const {userLocation} = this.state;
    this.focusListener = this.props.navigation.addListener('focus', () => {
      // this.getQuotationList();
    });
  }

  getQuotationList() {
    const {request = [], prescriptionId = '', userData} = this.state;

    console.log('userData__', userData);

    var payload = new FormData();
    payload.append('request_pharmacy_userid', userData.signup_id);
    Services.post('get_qoutation_request_by_user', {}, payload, true)
      .then(responseJson => {
        console.log('getQuotationList', responseJson);
        if (responseJson.status == 1) {
          this.setState({
            request: responseJson.data,
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

  _onItemPress = (item, index) => {
    this.props.navigation.navigate(item.screen);
  };

  _renderMenus = ({item, index}) => {
    return (
      <HomeMenus
        item={item}
        index={index}
        onPress={() => this._onItemPress(item, index)}
      />
    );
  };

  render() {
    const {
      loading,
      activeTab,
      data,
      loadsData = [],
      showDatePicker,
      dateTimeModalType,
      request = [],
    } = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title="Pharmacy Service"
          showBack={true}
          // showShare={true}
          onRightPress={() => {}}
          onLeftPress={() => {
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
          {/* <View>
            <Image
              source={Constants.pharmacy_service_banner}
              style={styles.bannerStyle}
            />
          </View> */}
          <View style={styles.desContainer}>
            {/* <TouchableOpacity
              //
              onPress={() => {
                this.props.navigation.navigate('Category');
              }}
              style={styles.listingWrapper}>
              <Icon
                type="MaterialCommunityIcons"
                name="pharmacy"
                style={styles.iconStyle}
              />
              <Text style={styles.txtStyle}>Medicines and Health Products</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ListQuotation');
              }}
              style={styles.listingWrapper}>
              <Icon
                type="FontAwesome5"
                name="prescription-bottle-alt"
              style={styles.iconStyle}
              />
              <Text style={styles.txtStyle}>Quotation List</Text>
            </TouchableOpacity> */}

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 15,
              }}>
              <Image
                source={Constants.online_pharmacy_banner}
                style={styles.bannerStyle}
              />
            </View>

            <FlatList
              data={this.state.data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderMenus}
              scrollEnabled={true}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
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
    userLocation: state.main.userLocation,
  };
};
export default connect(mapStateToProps)(PharmacyService);
