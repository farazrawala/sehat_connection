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

class Categories extends PureComponent {
  _renderItems = ({item, index}) => {
    const {_data = [], categoryActive, onPressCategory} = this.props;
    // var title = _data[index].category_field_1;

    // console.log(
    //   'Image___',
    //   Constants.url +
    //     _data[index].category_image_path +
    //     _data[index].category_image,
    // );

    if (index % 2 == 0) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              onPressCategory(_data[index].category_id);
            }}
            style={[
              styles.menuWrapper,
              {borderWidth: categoryActive == _data[index].category_id ? 2 : 0},
            ]}>
            <Image
              // source={Constants.coviImg}
              source={{
                uri:
                  Constants.url +
                  _data[index].category_image_path +
                  _data[index].category_image,
              }}
              style={styles.covidImg}
            />

            <View style={{justifyContent: 'center', flex: 1}}>
              <Text style={[styles.headingStyle, {fontWeight: 'bold'}]}>
                {_data[index].category_field_1}
              </Text>
              <Text style={styles.headingStyle}>
                {_data[index].category_field_2}
              </Text>
            </View>
          </TouchableOpacity>
          {index + 1 <= _data.length - 1 ? (
            <TouchableOpacity
              onPress={() => {
                onPressCategory(_data[index + 1].category_id);
              }}
              style={[
                styles.menuWrapper,
                {
                  borderWidth:
                    categoryActive == _data[index + 1].category_id ? 2 : 0,
                },
              ]}>
              <Image
                // source={Constants.coviImg}
                source={{
                  uri:
                    Constants.url +
                    _data[index + 1].category_image_path +
                    _data[index + 1].category_image,
                }}
                style={styles.covidImg}
              />
              <View style={{justifyContent: 'center', flex: 1}}>
                <Text style={[styles.headingStyle, {fontWeight: 'bold'}]}>
                  {_data[index + 1].category_field_1}
                </Text>
                <Text style={styles.headingStyle}>
                  {_data[index + 1].category_field_2}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      );
    }
  };

  render() {
    const {
      onPress,
      text = 'Add More Container',
      categoryActive,
      _data = [],
      onPressCategory,
    } = this.props;

    // console.log('Props __ ', _data);

    return (
      <View style={styles.categoryContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* <Text style={styles.heading}>Cateogories</Text> */}
          <TouchableOpacity onPress={() => onPressCategory(0)}>
            {categoryActive != 0 ? (
              <Text style={[styles.heading, {fontSize: 13, fontWeight: '100'}]}>
                Show All
              </Text>
            ) : (
              <Text style={[styles.heading, {fontSize: 13, fontWeight: '100'}]}>
                Show All
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesWrapper}>
          <FlatList
            data={_data}
            extraData={this.props}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItems}
            scrollEnabled={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

export {Categories};

const styles = StyleSheet.create({
  surfaceStyle: {
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15,

    width: 150,
    height: 100,

    backgroundColor: 'white',
    // overflow: 'hidden',
    // elevation: 4,

    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 4,
    // },
    // shadowOpacity: 0.30,
    // shadowRadius: 4.65,

    // elevation: 8,
  },

  categoryContainer: {
    height: 200,
    paddingHorizontal: 20,
    marginTop: -22,
    paddingTop: 0,
    backgroundColor: Constants.Colors.backgrounGrey,
  },
  desContainer: {
    // flex: 1,
    height: 500,
    backgroundColor: Constants.Colors.primaryBlue,
  },
  headingStyle: {
    // width: 80,
    // backgroundColor: 'red',
    fontSize: 13,
    // flex: 1
  },
  menuWrapper: {
    width: 140,
    marginRight: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: Constants.Colors.primaryBlue,
  },
  covidImg: {
    width: 40,
    height: 40,
    // marginHorizontal: 5,
    marginLeft: 7,
    marginRight: 5,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Constants.Colors.primaryBlue,
    marginBottom: 8,
  },
});
