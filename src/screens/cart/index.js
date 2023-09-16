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

// const {width, height} = Dimensions.get('window');

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      userLocation: this.props.userLocation,
      cartData: this.props.cartData,
      loading: false,
      data: [],
      request: [],
      activeTab: 0,
      searchText: '',
      prescriptionId: 0,
      // item: props.navigation.state.params.item || {},
    };
    console.log('Medicals _', this.state.cartData);
  }

  removeProduct = (item, index) => {
    Alert.alert(
      'Sehat Connections',
      'Are you sure you want to remove this products',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const {cartData} = this.state;
            cartData.splice(index, 1);
            this.setState({cartData});
            this.props.dispatch({type: 'CART_DATA', payload: cartData});
            Utils.showToastMessage('Product has been removed.', 'info');
          },
        },
      ],
      {cancelable: false},
    );
  };

  componentDidMount() {
    const {cartData} = this.state;

    console.log('cartData__', cartData);
  }

  onPressQty = (index, type) => {
    const {cartData} = this.state;

    if (type == 'plus') cartData[index].qty = cartData[index].qty + 1;
    else if (cartData[index].qty > 1)
      cartData[index].qty = cartData[index].qty - 1;

    this.setState(cartData);
    // console.log('Id', data);
  };

  renderType(id) {
    if (id == 1) return 'Tablet';
  }

  renderProducts = ({item, index}) => {
    const {selectedCategory, data} = this.state;
    // console.log('Item');

    var _Url = Constants.url + item.medicine_image_path + item.medicine_image;
    if (item.medicine_image == 0 || item.medicine_image == '')
      _Url =
        'https://demo.sehatconnection.com/assets/uploads/logo/logo_gray.png';

    return (
      <View style={styles.productWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: _Url,
            }}
            style={[
              styles.productImgSTyle,
              {
                width: item.medicine_image == 0 ? '80%' : '100%',
                marginLeft: item.medicine_image == 0 ? '10%' : 0,
              },
            ]}
          />
        </View>
        <View style={styles.productDesContainer}>
          <Text style={styles.productNameStyle}>
            {item.medicine_name} {this.renderType(item.medicine_type)}{' '}
            {item.medicine_strength}
          </Text>
          <Text style={{color: Constants.Colors.primaryBlue}}>
            Pack of {item.medicine_size[item.sizeId].medicine_size_size}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.pricingStyle}>
              Rs. {item.medicine_size[item.sizeId].medicine_size_price} X
              {item.qty}
            </Text>
          </View>

          <View style={styles.btnWrapper}>
            <TouchableOpacity
              onPress={() => this.onPressQty(index, 'minus')}
              style={styles.actionStyle}>
              <Text style={styles.actionTxtStyle}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyTxtSTyle}> {item.qty} </Text>
            <TouchableOpacity
              onPress={() => this.onPressQty(index, 'plus')}
              style={styles.actionStyle}>
              <Text style={styles.actionTxtStyle}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.crossbtn}>
          <TouchableOpacity
            onPress={() => {
              this.removeProduct(item, index);
            }}>
            <Image style={styles.crossBtnStyle} source={Constants.crossbtn} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
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
          title="Cart"
          showBack={true}
          // showCart={true}
          cartBadge={cartData.length}
          // onRightPress={() => {
          //   this.props.navigation.navigate('Checkout');
          // }}
          onLeftPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.desContainer}>
            <FlatList
              data={this.state.cartData}
              renderItem={this.renderProducts}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={{flex: 1, alignItems: 'center', marginVertical: 20}}>
            {cartData.length > 0 ? (
              <RoundedButton
                text="Proceed to Checkout"
                textColor={'white'}
                fontsize={22}
                customStyle={{
                  width: Constants.ScreenWidth-40,
                  borderRadius: 20,
                  // paddingHorizontal: 10,
                  height: 40,
                  backgroundColor: Constants.Colors.primaryGreen,
                }}
                handleOnPress={() => {
                  this.props.navigation.navigate('AddLocation', {
                    item: cartData,
                  });
                }}
                // AddLocation
              />
            ) : (
              <Text
                style={{
                  color: Constants.Colors.primaryBlue,
                  fontSize: 12,
                }}>
                Your Cart is empty
              </Text>
            )}

            <RoundedButton
              text="Continue Shopping"
              textColor={'white'}
              fontsize={22}
              customStyle={{
                width: Constants.ScreenWidth-40,
                borderRadius: 20,
                paddingHorizontal: 10,
                height: 40,
                marginVertical: 20,
                backgroundColor: Constants.Colors.primaryGreen,
              }}
              handleOnPress={() =>
                // this.onSubmit()
                this.props.navigation.navigate('Category')
              }
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
export default connect(mapStateToProps)(Cart);
