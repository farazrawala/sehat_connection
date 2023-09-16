import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Item} from 'native-base';
// import Constant from '../../common/Constants';
import {Constants} from '../../utils';
// import CheckBox from 'react-native-check-box';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";


class SuggestionInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: '',
    };
  }

  _renderSuggestions = ({item, index}) => {
    const {activeTab} = this.state;
    const {onSuggestionClick} = this.props;

    return (
      <TouchableOpacity
        onPress={() => onSuggestionClick(item)}
        style={styles.suggestionWrapper}>
        <View style={styles.suggestTitleWrapper}>
          <Text style={styles.suggestionTitle}>
            {item.name || item.medicine_name}
          </Text>
        </View>
        <View style={styles.suggestIconWrapper}>
          <FontAwesome
            name="plus-circle"
            type="FontAwesome"
            style={styles.suggestionAdd}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      onChangeText,
      placeHolder,
      value,
      data,
      suggestionTitle,
      onSuggestionClick,
      onSearchClick,
      showFilter = true,
      showSearch = true,
      showArrow = false,
    } = this.props;
    return (
      <View style={styles.profileContainer}>
        {suggestionTitle != '' ? (
          <Text style={styles.patienfoundStyle}>{suggestionTitle}</Text>
        ) : null} 
        
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder={placeHolder}
              returnKeyType="search"
              value={value}
              onChangeText={onChangeText}
            />
          </View>
          {showFilter ? (
            <View style={styles.filterWrapper}>
              <FontAwesome
                name="filter"
                type="FontAwesome"
                style={styles.searchIcon}
              />
            </View>
          ) : null}
          {showSearch ? (
            <View style={styles.searchWrapper}>
              <AntDesign name="search1" type="AntDesign" style={styles.fitlerIcon} />
            </View>
          ) : null}
          {showArrow ? (
            <TouchableOpacity
              onPress={() => onSearchClick()}
              style={styles.searchWrapper}>
              <Entypo
                name="arrow-bold-right"
                type="Entypo"
                style={styles.fitlerIcon}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        
        <View style={styles.suggestionContainer}>
          <FlatList
            data={data}
            extraData={data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderSuggestions}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

export {SuggestionInput};

const styles = StyleSheet.create({
  profileContainer: {
    // height: 140,
    width: '100%',
    padding: 20,
    paddingBottom: 0,
    // backgroundColor: 'red',
    // flexDirection: 'row'
  },
  patienfoundStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Constants.Colors.primaryBlue,
  },
  searchContainer: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    marginVertical: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    // backgroundColor: 'red'
  },
  searchInputWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '100%',
    height: 40,
    fontSize: 16,
    // color:'black',
    // border:1,
    borderColor:'red',
    paddingHorizontal: 20,
    color:Constants.Colors.primaryBlue
  },
  filterWrapper: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    color: Constants.Colors.primaryGreen,
    fontSize:20,
  },
  fitlerIcon: {
    color: 'white',
    fontSize:20,
    // width: 50,
  },
  suggestionContainer: {
    marginTop: -10,
  },
  searchWrapper: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.Colors.primaryGreen,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  suggestionAdd: {
    color: Constants.Colors.primaryBlue,
    width: 30,
  },
  suggestionWrapper: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    zIndex: 111,
    // backgroundColor: 'red',
    top: 0,
  },
  suggestTitleWrapper: {
    flex: 1,
    paddingLeft: 15,
  },
  suggestIconWrapper: {
    width: 50,
    alignItems: 'center',
  },
  suggestionAdd: {
    color: Constants.Colors.primaryBlue,
    width: 30,
  },
  suggestionTitle: {
    color: Constants.Colors.primaryBlue,
  },
});
