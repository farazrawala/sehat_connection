import {Constants} from '../../utils';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
// import { Surface } from 'react-native-paper';
import React, {PureComponent} from 'react';
import {RoundedButton} from '../../components';
// import {Icon} from 'native-base';

class RenderHospitals extends PureComponent {
  onPressRequest(index) {
    const {onRequestConsultationPress} = this.props;
    onRequestConsultationPress(index);
  }

  _renderItems = ({item, index}) => {
    const {_data = [], onRequestConsultationPress} = this.props;
    return (
      <View style={styles.container}>
        <View style={{flex: 1, height: 130, flexDirection: 'row'}}>
          <Image source={item.img} style={styles.imgStyle} />
          <View style={styles.desContainer}>
            <View style={styles.starStyle}>
              <Icon name="star" type="Entypo" style={styles.starIcon} />
              <Text style={styles.starTextStyle}>4.7</Text>
            </View>

            <Text style={styles.headingStyle}>{item.name}</Text>
            <Text style={styles.titleStyle}>{item.address}</Text>

            <View style={styles.bottomContainer}>
              <RoundedButton
                text="Request Consultation"
                textColor={'white'}
                fontsize={9}
                customStyle={{
                  paddingVertical: 3,
                }}
                handleOnPress={() => this.onPressRequest(index)}
              />
            </View>
          </View>
        </View>
        {/* */}
      </View>
    );
  };

  render() {
    const {onPress, text = 'Add More Container', _data = []} = this.props;

    console.log('Props __ ', _data);

    return (
      <View style={styles.categoryContainer}>
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

export {RenderHospitals};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.backgrounGrey,
    flexDirection: 'row',
    width: '100%',
    height: 130,
    // borderRadius: 20,
    // borderTo: 20,
    borderBottomEndRadius: 20,
    borderTopLeftRadius: 20,
    marginVertical: 10,
  },
  starTextStyle: {
    fontSize: 13,
    color: 'white',
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
    position: 'absolute',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    top: 10,
    right: 0,
    // zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBtnWrapper: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'flex-end'
  },
  statusWrapper: {
    flexDirection: 'row',
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginVertical: 10,
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    // backgroundColor: 'red',
  },
  headingStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Constants.Colors.grey,
    // backgroundColor: 'blue'
  },

  feesStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  imgStyle: {
    width: 120,
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  hospitalStyle: {
    color: 'white',
    fontSize: 15,
    marginBottom: 6,
  },
  titleStyle: {
    color: Constants.Colors.grey,
    fontSize: 15,
    marginVertical: 6,
    width: '80%',
  },
  desContainer: {
    flex: 1,
    // padding: 15,
    paddingLeft: 5,
    paddingVertical: 5,
    justifyContent: 'center',
  },
});
