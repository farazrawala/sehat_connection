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
} from 'react-native';
import styles from './styles';

// import {Icon} from 'native-base';
// import { Icon } from 'native-base';
import {
  Header,
  RoundedButton,
  CustomText,
  Categories,
  RenderHospitals,
} from '../../components';

import {Constants, Utils} from '../../utils';
import {connect} from 'react-redux';

import * as actions from '../../actions';

class Hospital extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userData: [],
      modalVisible: false,
      loadsData: [],
      ativeSearchTab: 1,
      categoryData: [
        {
          screen: 'allLoads',
          jobMode: 'load',
          title: 'Video Consultation',
          color: '#f6d367',
          icon: Constants.video_consultation_icon,
          batch: 0,
        },
      ],
      doctors: [
        {
          name: 'Agha Khan Hospital',
          address: 'National Stadium Road, Karachi Pakistant',
          img: Constants.aghaKhan,
        },
        {
          name: 'Liaquat National Hospital',
          address: 'National Stadium Road, Karachi Pakistant',
          img: Constants.liaquatNational,
        },
        {
          name: 'North City Hospital',
          address: 'Gulshan -e- Iqbal',
          img: Constants.northCity,
        },
        {
          name: 'South City Hospital',
          address: 'Cliftion, Karachi, PK ',
          img: Constants.southCity,
        },

        {
          name: 'Agha Khan Hospital',
          address: 'National Stadium Road, Karachi Pakistant',
          img: Constants.aghaKhan,
        },
        {
          name: 'Liaquat National Hospital',
          address: 'National Stadium Road, Karachi Pakistant',
          img: Constants.liaquatNational,
        },
        {
          name: 'North City Hospital',
          address: 'Gulshan -e- Iqbal',
          img: Constants.northCity,
        },
        {
          name: 'South City Hospital',
          address: 'Cliftion, Karachi, PK ',
          img: Constants.southCity,
        },
      ],
    };
  }

  componentDidMount() {
    // const { categoryData } = this.state
    // setInterval(() => {
    //   categoryData.push({ screen: 'setting', title: 'Settings2', color: '#cb92c8', icon: Constants.icon_settings, batch: 0 })
    //   this.setState({ categoryData: categoryData })
    // }, 10000);
  }

  _onItemPress(value) {
    // console.log('_onItemPress', value);
  }

  onRequestConsultationPress = index => {
    console.warn('index', index);
  };
  _renderHospitals() {
    const {doctors} = this.state;
    // const { }

    return (
      <RenderHospitals
        _data={doctors}
        onRequestConsultationPress={value => {
          // this.setState({ modalVisible: true })
          this.props.navigation.navigate('doctors', {
            isTabVisible: false,
          });
          // console.warn('value++', value);
        }}
      />
    );
  }
  renderModal() {
    const {modalVisible} = this.state;
    return (
      <View style={styles.modalContainer}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({modalVisible: false});
                }}
                style={styles.crossBtnWrapper}>
                <Text style={styles.crossTxtStyle}>X</Text>
              </TouchableOpacity>

              <Text style={styles.modalText}>
                Enter patient's contact number.
              </Text>
              {/* <View style={styles.numberInputWrapper}> */}
              <TextInput
                style={styles.numberInputStyle}
                keyboardType="number-pad"
                // onChangeText={text => onChangeText(text)}
                value="03331225588"
              />

              <RoundedButton
                text="Search"
                textColor={'white'}
                fontsize={18}
                customStyle={{
                  width: 200,
                  height: 40,
                  marginTop: 50,
                }}
                handleOnPress={() =>
                  this.props.navigation.navigate('patientFound')
                }
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  render() {
    const {loading, loadsData = []} = this.state;

    return (
      <View style={styles.Container}>
        <Header
          title="Hospitals"
          showBack={true}
          onLeftPress={() => {
            // console.log(' On left Press ');
            this.props.navigation.goBack();
          }}
        />
        {this.renderModal()}

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: 'green',
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.desContainer}>
            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrapper}>
                <TextInput
                  style={styles.searchInput}
                  onChangeText={text => {
                    this.setState({searchText: text});
                  }}
                  placeholder="Search Hospitals"
                  returnKeyType="search"
                  value={this.state.searchText}
                />
              </View>

              <View style={styles.filterWrapper}>
                <Icon
                  name="filter"
                  type="FontAwesome"
                  style={styles.searchIcon}
                />
              </View>
              <View style={styles.searchWrapper}>
                <Icon
                  name="search1"
                  type="AntDesign"
                  style={styles.fitlerIcon}
                />
              </View>
            </View>

            <View
              style={{
                // paddingHorizontal: 20,
                padding: 20,
                backgroundColor: Constants.Colors.primaryBlue,
                flex: 1,
                // backgroundColor: Constants.Colors.primaryBlue
              }}>
              {this._renderHospitals()}
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
  };
};
export default connect(mapStateToProps)(Hospital);
