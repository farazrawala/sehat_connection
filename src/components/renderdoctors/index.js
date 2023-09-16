import {Constants, Utils} from '../../utils';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {PureComponent} from 'react';
import {RoundedButton} from '../../components';
// import {Icon} from 'native-base';
import {Image} from 'react-native-elements';
// import Icon from "react-native-vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo  from "react-native-vector-icons/Entypo";


class Renderdoctors extends PureComponent {
  onPressRequest(item) {
    const {onRequestConsultationPress} = this.props;
    // console.warn('onRequestConsultationPress index__', item);
    onRequestConsultationPress(item);
  }
  onPressDetail(doctor, rating) {
    const {onPressDoctor} = this.props;
    onPressDoctor(doctor, rating);
  }
  _renderItems = ({item, index}) => {
    const {
      _data = [],
      onRequestConsultationPress,
      onPressDoctor,
      categoryActive = 0,
      online = true,
    } = this.props;

    var userImage = '';
    if (item.signup_image != '' && item.signup_image != null)
      userImage = Constants.url + item.signup_image_path + item.signup_image;
    else if (item.signup_gendar == 'male')
      userImage = Constants.imgBaseUrl + 'avatar_male.jpeg';
    else if (item.signup_gendar == 'female')
      userImage = Constants.imgBaseUrl + 'avatar_female.jpeg';

    console.log('categoryActive__', item.category_name);
    var rating = '4.' + Math.floor(Math.random() * 9 + 1);

    if (categoryActive == item.signup_doctor_category || categoryActive == 0) {
      return (
        //
        <TouchableOpacity onPress={() => this.onPressDetail(item, rating)}>
          <View style={styles.container}>
            <View style={{flex: 1, height: 130, flexDirection: 'row'}}>
              {/* <TouchableOpacity onPress={() => this.onPressDetail(item)}> */}
              <Image
                source={{
                  uri: userImage,
                }}
                PlaceholderContent={<ActivityIndicator />}
                style={styles.imgStyle}
              />
              {item.doctor_schedule_fees_2 >= item.doctor_schedule_fees ? (
                <View style={styles.discountWrapper}>
                  <Text style={styles.discountText}>
                    {item.doctor_schedule_discount_amount} %
                  </Text>

                  <Text style={styles.discountText}>Off</Text>
                </View>
              ) : null}

              <View style={styles.desContainer}>
                {/* <TouchableOpacity onPress={() => this.onPressDetail(item)}> */}
                <Text style={styles.headingStyle} numberOfLines={1}>
                  Dr. {Utils.capitalizeFirstLetter(item.signup_firstname)}{' '}
                  {Utils.capitalizeFirstLetter(item.signup_lastname)}
                </Text>
                {/* </TouchableOpacity> */}
                <Text style={styles.titleStyle}>{item.category_name}</Text>
                {/* <Text style={styles.hospitalStyle}>{item.hospital_name}</Text> */}

                {item.doctor_schedule_fees_2 >= item.doctor_schedule_fees ? (
                  <Text
                    style={[
                      styles.feesStyle,
                      {
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                        color: Constants.Colors.primaryYellow,
                      },
                    ]}>
                    Fee : {item.doctor_schedule_fees_2} RS
                  </Text>
                ) : null}

                <Text style={styles.feesStyle}>
                  {item.doctor_schedule_fees_2 >= item.doctor_schedule_fees
                    ? 'Discounted Fee '
                    : 'Fee '}
                  :{' '}
                  {item.doctor_schedule_fees == 0
                    ? 'Free'
                    : item.doctor_schedule_fees + ' RS'}
                </Text>

                {/* <Text style={styles.feesStyle}>
                  Discounted Fee :{' '}
                  {item.doctor_schedule_fees -
                    item.doctor_schedule_discount_amount}{' '}
                  Rupees
                </Text> */}

                <View style={styles.bottomContainer}>
                  <View style={styles.bottomBtnWrapper}>
                    <View style={styles.starStyle}>
                      <Entypo name="star" type="Entypo" style={styles.starIcon} />
                      <Text style={styles.starTextStyle}>{rating}</Text>
                    </View>
                  </View>
                  <View style={styles.statusWrapper}>
                    <View
                      style={[
                        styles.dotStyle,
                        {
                          backgroundColor:
                            online == true
                              ? Constants.Colors.primaryGreen
                              : Constants.Colors.grey,
                        },
                      ]}
                    />
                    <Text style={styles.statusStyle}>
                      {online == true ? 'Online' : 'Offline'}
                    </Text>
                    <AntDesign
                      name="doubleright"
                      type="AntDesign"
                      style={styles.arrowIcon}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  render() {
    const {onPress, text = 'Add More Container', _data = []} = this.props;

    console.log('Props __ ', _data);

    return (
      <View style={styles.categoryContainer}>
        {/* <Text style={styles.heading}>Renderdoctors</Text> */}

        <View style={styles.categoriesWrapper}>
          <FlatList
            data={_data}
            extraData={this.props}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItems}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

export {Renderdoctors};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.listingBoxBg,
    flexDirection: 'row',
    width: '100%',
    height: 130,
    // borderRadius: 20,
    // borderLeftWidth: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginVertical: 10,
    overflow: 'hidden',
  },
  discountWrapper: {
    backgroundColor: 'red',
    width: 45,
    height: 45,
    position: 'absolute',
    top: 0,
    right: 0,
    borderBottomLeftRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountText: {
    position: 'relative',
    color: 'white',
    fontSize: 13,
    // marginTop: -5,
    fontWeight: 'bold',
  },
  starTextStyle: {
    fontSize: 13,
    color: 'white',
  },
  arrowIcon: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
  },
  starIcon: {
    color: 'white',
    fontSize: 15,
    marginHorizontal: 3,
  },
  starStyle: {
    width: 50,
    height: 20,
    backgroundColor: Constants.Colors.primaryYellow,
    // position: 'absolute',
    // marginTop: 35,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    // top: 20,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBtnWrapper: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  statusWrapper: {
    // position: 'absolute',
    flexDirection: 'row',
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    // bottom: 20,
    marginRight: 5,
    // backgroundColor: 'yellow',
    // right: 5,
  },
  dotStyle: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: Constants.Colors.primaryGreen,
  },
  statusStyle: {
    color: 'white',
    fontSize: 15,
    // width: 50,
  },
  bottomContainer: {
    flexDirection: 'row',
    // height: 50,
    // marginVertical: 10,
    marginTop: 10,
    width: '100%',
    // backgroundColor: 'red',
  },
  headingStyle: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'white',
    // backgroundColor: 'blue'
  },

  feesStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    marginTop: 5,
    // marginVertical: 5,
    // backgroundColor: 'pink'
  },
  imgStyle: {
    width: 100,
    height: 130,
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  hospitalStyle: {
    color: 'white',
    fontSize: 14,
    marginVertical: 5,
    // fontWeight: 'bold'
    //  marginBottom: 6,
  },
  titleStyle: {
    color: 'white',
    fontSize: 14,

    // marginVertical: 6,
  },
  desContainer: {
    flex: 1,
    // padding: 15,
    paddingLeft: 15,
    // paddingVertical: 5,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: 15,
  },
});
