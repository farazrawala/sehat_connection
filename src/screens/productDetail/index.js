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
// import * as Animatable from 'react-native-animatable';
// import {debounce, set} from 'lodash';
// import {NavigationActions, StackActions} from 'react-navigation';
import {
  Header,
  // Heading,
  RoundedButton,
  // CustomInput,
  // SuggestionInput,
  // Renderdoctors,
} from '../../components';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// import Services from '../../apis/services';
// import * as actions from '../../actions';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';


class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      userLocation: this.props.userLocation,
      cartData: this.props.cartData,
      loading: false,
      data: [],
      price: 0,
      sizeId: 0,
      selectedValue: '',
      request: [],
      productSize: [
        // {id: 1, value: 'Gas Station 0'},
        // {id: 2, value: 'Gas Station 1'},
        // {id: 3, value: 'Gas Station 2'},
        // {id: 4, value: 'Gas Station 4'},
        // {id: 5, value: 'Gas Station 5'},
      ],
      qty: 1,
      activeTab: 0,
      searchText: '',
      prescriptionId: 0,
      item:  this.props.route.params.item || {},
    };
    // console.log('cartData_item _', this.state.item);
  }

  componentWillUnmount() {}

  componentDidMount() {
    // const {userLocation} = this.state;

    const {item} = this.state;

    this.setState({
      productSize: item.medicine_size,
      selectedValue: item.medicine_size[0].value,
    });

    // console.log('medicine Size _ ', this.state.productSize);
  }

  onPressQty = (index, type) => {
    const {data, qty} = this.state;
    var temp = 1;
    if (type == 'plus') temp = qty + 1;
    else if (qty > 1) temp = qty - 1;

    this.setState({qty: temp});
    // console.log('Id', data);
  };

  addToCart(item, Qty) {
    const {cartData} = this.props;
    const {sizeId} = this.state;

    console.log('sizeId__', sizeId);

    // Checking product in Cart
    var isExits = false;
    cartData.map(product => {
      if (product.medicine_id === item.medicine_id) {
        isExits = true;
        product.qty = Qty;
        product.sizeId = sizeId;
      }
    });
    this.props.dispatch({type: 'CART_DATA', payload: cartData});
    // Checking product in Cart

    console.log('cartData__', cartData);

    // Adding Product into Cart.
    if (isExits == false) {
      cartData.push(item);

      item.qty = Qty;
      item.sizeId = sizeId;

      this.props.dispatch({type: 'CART_DATA', payload: cartData});
      alert(
        item.medicine_name +
          ' ' +
          item.medicine_strength +
          ' ' +
          item.medicine_type +
          ' has been added to the cart.',
        'success',
      );
    } else {
      alert(
        item.medicine_name +
          ' ' +
          item.medicine_strength +
          ' ' +
          item.medicine_type +
          ' has been added to the cart.',
        'success',
      );
    }

    setTimeout(() => {
      this.props.navigation.navigate('Cart');
    }, 2000);
  }
  renderType(id) {
    if (id == 1) return 'Tablet';
  }

  render() {
    const {
      loading,
      activeTab,
      data,
      loadsData = [],
      cartData = [],
      item = {},
      sizeId = '',
      price,
      showDatePicker,
      dateTimeModalType,
      request = [],
    } = this.state;

    // console.log('product_detail', item);

    var _Url = Constants.url + item.medicine_image_path + item.medicine_image;

    console.log('Product_Detail', item.medicine_image);

    if (item.medicine_image == 0 || item.medicine_image == '')
      _Url =
        'https://demo.sehatconnection.com/assets/uploads/logo/logo_gray.png';

    console.log('_Url', _Url);

    return (
      <View style={styles.Container}>
         <Header
          title="Product Detail"
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
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
            <View>
            <Image
              // source={Constants.pharmacy_service_banner}
              source={{
                uri: _Url,
              }}
              style={[
                styles.bannerStyle,
                {
                  width: item.medicine_image == 0 ? '80%' : '100%',
                  marginLeft: item.medicine_image == 0 ? '10%' : 0,
                },
              ]}
            />
          </View>
          
          <View style={{padding: 20, backgroundColor: 'white', flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View stye={{flex: 1, padding: 10}}>
                <Text style={styles.headingStyle}>
                  {item.medicine_name} {item.medicine_strength}{' '}
                  {item.medicine_type}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginVertical: 10,
              }}>
              <Text style={styles.priceHeading}>
                Size : {item.medicine_size[sizeId].medicine_size_size} {''}
                {item.medicine_type == 'Tablet' ||
                item.medicine_type == 'Capsule'
                  ? item.medicine_type
                  : ''}
              </Text>
              
            </View>

            {/* <CustomInput
              label={''}
              isRequired={true}
              isIcon={false}
              fontFamily={Constants.PoppinsRegular}
              inputCustomStyle={{borderRadius: 10}}
              isDropdown={true}
              inputPlaceHoler={'Size'}
              inputMode={1}
              compType={'mapInput'}
              selectedVal={this.state.selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                console.log('itemIndex', itemIndex);
                this.setState({selectedValue: itemValue, sizeId: itemIndex});
              }}
              data={this.state.productSize}
            />

         */}

            <View style={styles.priceContainer}>
              <View style={{flex: 1}}>
               
              </View>
            </View>

            <View
              style={{
                flex: 1,
                paddingHorizontal: 20,
                marginVertical: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.priceHeading}>
                  Retail Price :{' '}
                  {item.medicine_size[sizeId].medicine_size_price}
                </Text>
              </View>

              <View style={styles.btnWrapper}>
                <TouchableOpacity
                  onPress={() => this.onPressQty(1, 'minus')}
                  style={styles.actionStyle}>
                  <Text style={styles.actionTxtStyle}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyTxtSTyle}> {this.state.qty} </Text>

                <TouchableOpacity
                  onPress={() => this.onPressQty(1, 'plus')}
                  style={styles.actionStyle}>
                  <Text style={styles.actionTxtStyle}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <RoundedButton
                text="Request Discounted Price"
                textColor={'white'}
                fontsize={22}
                arrowIcon={true}
                customStyle={{
                  width: '100%',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  marginVertical: 5,
                  height: 40,
                  backgroundColor: Constants.Colors.primaryGreen,
                }}
                handleOnPress={() => {
                  this.addToCart(item, this.state.qty);
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
    userLocation: state.main.userLocation,
    cartData: state.main.cartData,
  };
};
export default connect(mapStateToProps)(ProductDetail);
