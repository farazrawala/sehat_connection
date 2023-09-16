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
  Renderdoctors,
} from '../../components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';

import Entypo from "react-native-vector-icons/Entypo";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      userLocation: this.props.userLocation,
      cartData: this.props.cartData,
      loading: true,
      data: [],
      request: [],
      activeTab: 0,
      searchText: '',
      prescriptionId: 0,
      // item: props.navigation.state.params.item || {},
    };
    // console.log('Category _', this.state.cartData);
  }

  componentWillUnmount() {
    // this.focusListener.remove();
    this._unsubscribe();
  }

  componentDidMount() {

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something

        // console.log('focus working');
        this.getMedicinsesList();

    });
  }

  _renderCategory = ({index, item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('Products', {
            categoryId: item.category_medicine_id,
            categoryName: item.category_medicine_name,
          });
        }}
        style={styles.medicineWrapper}>
        <Image
          style={styles.product_image}
          resizeMode="contain"
          source={{
            uri:
              Constants.url +
              item.category_medicine_image_path +
              item.category_medicine_image,
          }}
        />
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text numberOfLines={1} style={styles.medicineNameStyle}>
            {item.category_medicine_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  getMedicinsesList() {
    const {data = [], prescriptionId = '', userData} = this.state;

    console.log('userData__', userData);

    var payload = new FormData();
    payload.append('test', '');
    Services.post('category_medicine', {}, payload, true)
      .then(responseJson => {
        console.log('category_medicine', responseJson);
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
  render() {
    const {
      loading,
      activeTab,
      data,
      loadsData = [],
      cartData = [],
      showDatePicker,
      dateTimeModalType,
      request = [],
    } = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title="Product Categories"
          showBack={true}
          showCart={true}
          cartBadge={cartData.length}
          onRightPress={() => {
            this.props.navigation.navigate('Cart');
            // console.log('onRightPress');
          }}
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
          <View style={{width: '100%', alignItems: 'center', paddingTop: 15}}>
            <Image source={Constants.doctr_banner} style={styles.bannerStyle} />
          </View>
          {/* 
          <View
            style={{
              width: '100%',
              alignItems: 'flex-start',
              paddingHorizontal: 20,
              paddingTop: 20,
              // backgroundColor: 'red',
            }}>
            <Icon
              name="menu"
              type="Entypo"
              style={{
                color: Constants.Colors.primaryBlue,
              }}
            />
          </View> */}

          {/* <View style={styles.profileContainer}>
            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrapper}>
                <TextInput
                  style={styles.searchInput}
                  onChangeText={text => {
                    this.setState({searchText: text});
                    // this.onChangeText(text);
                  }}
                  placeholder="Search"
                  returnKeyType="search"
                  value={this.state.searchText}
                />
              </View>
              <View style={styles.searchWrapper}>
                <Entypo name="menu" type="Entypo" style={styles.fitlerIcon} />
              </View>
            </View>
          </View> */}

          <View style={styles.desContainer}>
            <FlatList
              data={this.state.data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderCategory}
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
    cartData: state.main.cartData,
  };
};
export default connect(mapStateToProps)(Category);
