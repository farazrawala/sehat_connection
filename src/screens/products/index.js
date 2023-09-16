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
import {Spinner} from '../../components/spinner';
import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';
import Services from '../../apis/services';
import * as actions from '../../actions';



import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";


const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      userLocation: this.props.userLocation,
      cartData: this.props.cartData,
      loading: true,
      data: [],
      categoryData: [],
      activeCategory: 0,
      productsLoading: false,
      offset: 0,
      request: [],
      activeTab: 0,
      searchText: '',
      prescriptionId: 0,
      categoryId: this.props.route.params?.categoryId || 0,
      categoryName: this.props.route.params?.categoryName || 'Shop',
      // item: props.navigation.state.params.item || {},
    };
    console.log('item_cartData_', this.state.categoryId);
  }

  componentWillUnmount() {
    // this.focusListener.remove();
  }

  onPagination() {
    console.log('_onPagination_');
  }

  componentDidMount() {
    // const {userLocation} = this.state;
    // this.focusListener = this.props.navigation.addListener('didFocus', () => {
    // });
    this.getMedicinsesList();
  }

  onPressCart(item, Qty = 1) {
    const {cartData} = this.props;

    // console.log('_item__',item);
    this.props.navigation.navigate('ProductDetail', {item});
    return false;

    // Checking product in Cart
    var isExits = false;
    cartData.map(product => {
      if (product.medicine_id === item.medicine_id) {
        isExits = true;
        product.qty = Qty;
      }
    });
    this.props.dispatch({type: 'CART_DATA', payload: cartData});
    // Checking product in Cart

    // Adding Product into Cart.

    console.log('cartData__', cartData);
    console.log('isExits', isExits);

    if (isExits == false) {
      cartData.push(item);
      this.props.dispatch({type: 'CART_DATA', payload: cartData});
      Utils.showToastMessage(
        item.medicine_name + ' has been added into the cart.',
        'success',
      );
      console.log('cartData__', cartData);
    } else {
      Utils.showToastMessage('Product already exists', 'error');
    }
    // Adding Product into Cart.
  }

  debounceSearchResults = loc => {
    // fetch(
    //   `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAyFOKFuPvlou4KJV1LPXGRgi-gVk1q-qA&input=${loc}`,
    // )
    //   .then(response => response.json())
    //   .then(response => {
    //     this.setState({
    //       locationPrediction: response.predictions,
    //       searchResults: true,
    //     });
    //     console.log(response, 'This is location prediction from state');
    //   })
    //   .catch(error => {
    //     console.log(error, 'Response in catch');
    //   });
  };

  debounceHandler = debounce(this.getMedicinsesList, 500);

  onChangeText = text => {
    // console.log('onChangeText+___', text);
    const {data} = this.state;

    if (text.length > 2) {
      this.debounceHandler(text);
      this.setState({
        offset: 0,
        searchText: text,
        data: [],
      });
    } else {
      this.setState({
        searchText: text,
      });
    }
    if (text.length == 0) this.getMedicinsesList();
    // this.setState({})
  };

  _onPressCategory(item) {
    const {activeCategory} = this.state;

    console.log('_onPressCategory', activeCategory);
    console.log('_item.category_medicine_id', item.category_medicine_id);

    if (item.category_medicine_id != activeCategory) {
      this.setState(
        {
          activeCategory: item.category_medicine_id,
          categoryId: item.category_medicine_id,
          data: [],
          offset: 0,
          loading: true,
        },
        () => {
          this.getMedicinsesList();
        },
      );
    } else {
      // console.log('Props', this.props);
      this.setState(
        {
          data: [],
          offset: 0,
          loading: true,
          activeCategory: this.props.route.params?.categoryId,
          categoryId: this.props.route.params?.categoryId,
        },
        () => {
          this.getMedicinsesList();
        },
      );
    }
  }
  _renderCategory = ({index, item}) => {
    // const {activeCategory} = this.state;
    return (
      <TouchableOpacity
        onPress={() => {
          this._onPressCategory(item);

          // console.log('_onpress_', item.category_medicine_id);
        }}
        style={[
          styles.categoryWrapper,
          {
            backgroundColor:
              this.state.activeCategory == item.category_medicine_id
                ? Constants.Colors.primaryYellow
                : Constants.Colors.primaryBlue,
          },
        ]}>
        <Text style={styles.categoryTxt}>{item.category_medicine_name}</Text>
      </TouchableOpacity>
    );
  };
  _renderRequest = ({index, item}) => {
    // console.log('medicine_image_path', item.medicine_image);
    var _Url = Constants.url + item.medicine_image_path + item.medicine_image;
    if (item.medicine_image == 0)
      _Url =
        'https://demo.sehatconnection.com/assets/uploads/logo/logo_gray.png';

    return (
      <View style={styles.medicineWrapper}>
        <Image
          style={[
            styles.product_image,
            {
              width: item.medicine_image == 0 ? '80%' : '100%',
              marginLeft: item.medicine_image == 0 ? '10%' : 0,
            },
          ]}
          resizeMode="contain"
          source={{
            uri: _Url,
          }}
        />
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text numberOfLines={2} style={styles.medicineNameStyle}>
            {item.medicine_name}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.medicineNameStyle, {fontSize: 11}]}>
            {item.medicine_strength} {item.medicine_type}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.onPressCart(item)}
          style={styles.addCartBtn}>
          <Text style={styles.cartTxt}>Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _getdata = () => {
    const {searchText = '', data = []} = this.state;
    var _search = searchText.toLowerCase();
    return data.filter(item => {
      if (item.medicine_slug != undefined && item.medicine_slug != '') {
        var itemName = item.medicine_slug.toLowerCase();
        return itemName.match(_search);
      }
    });
  };
  getMedicinsesList() {
    const {
      data = [],
      offset,
      prescriptionId = '',
      categoryId,
      userData,
      productsLoading = true,
      activeCategory,
      searchText,
    } = this.state;

    console.log('offset__', offset);
    if (offset == 0) {
      this.setState({
        data: [],
      });
    }

    var payload = new FormData();
    payload.append('medicine_slug', searchText);
    payload.append('medicine_category', categoryId);
    payload.append('request_pharmacy_userid', userData.signup_id);
    Services.post('medicine_list/' + offset, {}, payload, true)
      .then(responseJson => {
        console.log('medicine_list', responseJson);
        console.log('searchText', searchText);

        var products = responseJson.data;
        if (offset != 0) {
          products = [...data, ...products];
        }

        // console.log('_products_', products);

        // console.table('_productLIst_', products);
        // console.table('responseJsoncatego_', responseJson.category);

        if (responseJson.status == 1) {
          this.setState({
            data: products,
            loading: false,
            offset: offset + 10,
            productsLoading: false,
            loading: false,
          });

          if (activeCategory == 0) {
            this.setState({
              categoryData: responseJson.category,
            });
          }
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

  fetchMore = () => {
    // if (this.state.refreshing) {
    //   return null;
    // }
    // this.setState(
    //   prevState => {
    //     return {refreshing: true, pageNum: prevState.pageNum + 1};
    //   },
    //   () => {
    //     this.sendAPIRequest(null, true);
    //   },
    // );
    console.log('_paginationw_');
  };
  handleRefresh() {
    console.log('handleRefresh');
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
      productsLoading = false,
      categoryName,
    } = this.state;

    // onSomeEvent = () => {
    //   this.scrollView.scrollTo({x: 0});
    // };

    return (
      <View style={styles.Container}>
        <Header
          title={categoryName}
          showBack={true}
          showCart={true}
          cartBadge={cartData.length}
          onRightPress={() => {
            this.props.navigation.navigate('Cart');
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
          // ref={ref => (this.scrollView = ref)}
          showsVerticalScrollIndicator={false}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              this.setState({
                productsLoading: true,
              });
              this.getMedicinsesList();
            }
          }}
          scrollEventThrottle={400}>
          <View style={styles.profileContainer}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <Image
                source={Constants.online_pharmacy_banner}
                style={styles.bannerStyle}
              />
            </View>

            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrapper}>
                <TextInput
                  style={styles.searchInput}
                  onChangeText={text => {
                    this.onChangeText(text);
                  }}
                  placeholder="Search"
                  returnKeyType="search"
                  value={this.state.searchText}
                />
              </View>

              <View style={styles.filterWrapper}>
                <FontAwesome
                  name="filter"
                  type="FontAwesome"
                  style={styles.searchIcon}
                />
              </View>
              <View style={styles.searchWrapper}>
                <AntDesign
                  name="search1"
                  type="AntDesign"
                  style={styles.fitlerIcon}
                />
              </View>
            </View>
          </View>

          <View style={styles.categoryContainer}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginVertical: 10,
                paddingLeft: 5,
                color: Constants.Colors.primaryBlue,
              }}>
              Discover
            </Text>
            <FlatList
              data={this.state.categoryData}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderCategory}
              scrollEnabled={true}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
            {/* <View style={{height: 10}} />
            <FlatList
              data={this.state.categoryData}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderCategory}
              scrollEnabled={true}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            /> */}
          </View>

          <View style={styles.desContainer}>
            <FlatList
              data={this._getdata()}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderRequest}
              scrollEnabled={true}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              onEndReached={this.fetchMore}
              onEndReachedThreshold={0.1}
              pagingEnabled={true}
            />

            <View
              style={{
                width: '100%',
                height: 120,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {data.length < 1 && loading == false ? (
                <Text>No Products Found</Text>
              ) : null}
            </View>

            {productsLoading ? (
              <View style={styles.loadingContainer}>
                <Text>loading ...</Text>
              </View>
            ) : null}
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
export default connect(mapStateToProps)(Products);
