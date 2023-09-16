import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
// import {Icon} from 'native-base';
import {Constants} from '../../utils';
import Autocomplete from 'react-native-autocomplete-input';

class SearchBtn extends Component {
  render() {
    const {
      text,
      textColor,
      wrapperPadding = 3,
      wrapperbg,
      bordercolor = Constants.grey,
      rightMargin = 0,
      fontsize = 12,
      background,
      width,
      bdHeight,
      icon,
      bdRadius,
      handleOnPress,
      customStyle,
      customStyletextbox,
      customStyleText,
      keyboard,
      data = ['faraz', 'fahad', 'ahsan'],
      // returnKeyType,
      placeholder = '',
      value = '',
      onSubmitEditing,
      onChangeText,
    } = this.props;

    const keyboardtype = keyboard || 'default';
    // const {query} = this.state;
    const data1 = filterData(value);

    return (
      <View style={styles.searchContainer}>
        {/* <View style={styles.searchInputWrapper}>
         <TextInput
            autoCorrect={false}
            keyboardType={keyboardtype}
            placeholder={placeholder}
            value={value}
            blurOnSubmit={false}
            onChangeText={onChangeText}
            style={[styles.searchInput]}
          />           
        </View> */}
        <View style={styles.autocompleteContainer}>
          <Autocomplete
            data={data1}
            value={value}
            onChangeText={text => this.setState({value: text})}
            // flatListProps={{
            //   keyExtractor: (_, idx) => idx,
            //   renderItem: ({item}) => <Text>{item}</Text>,
            // }}
          />
        </View>

        <View style={styles.filterWrapper}>
          <Icon name="filter" type="FontAwesome" style={styles.searchIcon} />
        </View>
        <View style={styles.searchWrapper}>
          <Icon name="search1" type="AntDesign" style={styles.fitlerIcon} />
        </View>
      </View>
    );
  }
}

export {SearchBtn};

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  searchContainer: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    marginVertical: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  filterWrapper: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
    color:'black',
    paddingHorizontal: 20,
    color:Constants.Colors.primaryBlue
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
  searchIcon: {
    color: Constants.Colors.primaryGreen,
    fontSize:20,
  },
  fitlerIcon: {
    color: 'white',
    fontSize:20,
  },
});
