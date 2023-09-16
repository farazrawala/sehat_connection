import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Platform } from 'react-native';
import { Picker, Item, Icon } from 'native-base';
// import Constant from '../../common/Constants';
import { Constants } from '../../utils';
import { Touchable } from '../';

class ToggleSeperator extends Component {

    state = {
        selected: 1
    }


    constructor(props) {
        super()
        console.log('ToggleSeperator _ props _ ', props);
    }
    componentDidMount() {
        // this.setState({ selected: this.props.defaulValue })
    }

    static getDerivedStateFromProps(props, state) {

        return {
            selected: props.defaulValue
        }

    }

    render() {
        const { label1 = '', label2 = '', canEdit = true, onPressToggle, defaulValue } = this.props;

        const { selected } = this.state;

        return (

            <View style={styles.wrapper} >
                <View style={styles.inputView}>
                    <View style={{ flex: 1, flexDirection: 'row', height: 45, }}>
                        <Touchable disabled={!canEdit} onPress={() => {
                            this.setState({
                                selected: 1
                            })
                            onPressToggle(1);
                        }} buttonStyle={[styles.textWrapper, selected == 1 ? styles.yellowWrapper : null]}>
                            <Text style={[styles.txtStyle, selected == 1 ? { color: 'white' } : null]}>{label1}</Text>
                        </Touchable>
                        <Touchable disabled={!canEdit} onPress={() => {
                            onPressToggle(2);
                            this.setState({ selected: 2 })
                        }} buttonStyle={[styles.textWrapper, selected == 2 ? styles.yellowWrapper2 : null]}>
                            <Text style={[styles.txtStyle, selected == 2 ? { color: "white" } : null]} >{label2}</Text>
                        </Touchable>
                    </View>
                </View>
            </View>



        );
    }
}


export { ToggleSeperator };


// CustomInput.PropTypes = {

// }

const styles = StyleSheet.create({
    wrapper: {

        marginVertical: 10
    },
    inputView: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 35,
        marginBottom: 15,
        flexDirection: 'row',


        backgroundColor: "#FFF",
        shadowColor: "#787878",
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: Platform.OS == 'ios' ? 3 : 3,

    },
    textWrapper: {

        flex: 1,
        height: 45,
        // alignItems: 'center',
        paddingLeft: 30,
        justifyContent: 'center'

    },
    txtStyle: {
        fontSize: 15,
        color: Constants.Colors.grey,
        fontFamily: Constants.PoppinsLight,
    },
    yellowWrapper: {
        backgroundColor: Constants.Colors.primaryYellow,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30
    },
    yellowWrapper2: {
        backgroundColor: Constants.Colors.primaryYellow,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 30
    }


});
