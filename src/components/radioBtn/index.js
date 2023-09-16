import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Picker, Item, Icon } from 'native-base';
import { Constants } from '../../utils';
import { CustomText } from '../../components';
var selectedWrapper = {
    backgroundColor: "white",
    shadowColor: "#787878",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: Platform.OS == 'ios' ? 3 : 3,
}

class RadioBtn extends Component {
    
    
    constructor(props) {
        super()
        this.state = {
            selected: 0,
        }
    }

    static getDerivedStateFromProps(state, props) {

        return {
            selected: state.defaulValue
        }

    }

    renderRadioButtons = (data = []) => {
        const { canEdit = true, selectedValue, defaulValue } = this.props;
        const { selected = 0 } = this.state;
        return data.map((item, i) => {
            return (
                <View style={{ width: "45%", flexDirection: 'row', marginRight: i % 2 == 0 ? '10%' : 0 }}>
                    <TouchableOpacity disabled={!canEdit} style={[styles.inputView, { flexDirection: "row", height: 45, justifyContent: 'flex-start', paddingHorizontal: 20 }, selected == i ? selectedWrapper : null]} onPress={() => {
                        this.setState({ selected: i })
                        selectedValue(i)
                        this.props.onPress(item.value)
                    }}>
                        <CustomText customStyle={{ flex: 1 }} txt={item.value || ""} type={"labelSmall"} />
                        <Icon name={selected == i ? "checkbox" : "square-outline"} type="Ionicons" style={styles.iconStyle} />
                    </TouchableOpacity>
                </View>
            )
        })
    }

    render() {
        const { canEdit = true, data = [], labelStyle = null, label = null, labelTextSize, labelColor, onPress, selectedValue } = this.props;
        const fontSize = labelTextSize || 14;
        const color = labelColor || 'black';
        const inputColor = 'black';

        var labelCustomStyle = {
            fontSize: 12,
            marginLeft: 15
        }

        if (data.length > 0) {
            return <View style={{ flexWrap: 'wrap', width: "100%", flexDirection: 'row' }}>
                {this.renderRadioButtons(data)}
            </View>
        } else {

            return (

                <View style={styles.wrapper} >
                    {label != null ? <Text style={[styles.labelStyle, labelCustomStyle, labelStyle]}>{label}</Text> : null}
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity disabled={!canEdit} style={[styles.inputView, (this.state.selected == 0) ? selectedWrapper : null]} onPress={() => this.setState({ selected: 0 })} >
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ height: 45, flexDirection: 'row', alignItems: 'center', flex: 1, paddingLeft: 30 }}>
                                    {
                                        this.state.selected == 0 ?
                                            <Icon name="checkcircle" type="AntDesign" style={styles.iconStyle} />
                                            :
                                            <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1 }}></View>

                                    }
                                    <View style={{ width: 10 }}></View>
                                    <CustomText
                                        txt={"No"}
                                        type={"labelSmall"}
                                    />
                                </View>


                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={!canEdit} style={[styles.inputView, (this.state.selected == 1) ? selectedWrapper : null]} onPress={() => this.setState({ selected: 1 })}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>


                                <View style={{ height: 45, flexDirection: 'row', alignItems: 'center', paddingLeft: 30, flex: 1 }}>

                                    {
                                        this.state.selected == 1 ?
                                            <Icon name="checkcircle" type="AntDesign" style={styles.iconStyle} />
                                            :
                                            <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1 }}></View>


                                    }

                                    <View style={{ width: 10 }}></View>
                                    <CustomText
                                        txt={"Yes"}
                                        type={"labelSmall"}
                                    />
                                </View>



                            </View>
                        </TouchableOpacity>

                    </View>
                </View>



            );
        }
    }
}


export { RadioBtn };


const styles = StyleSheet.create({
    wrapper: {
        // marginBottom: 50
    },
    iconStyle: {
        // fontFamily:20,
        fontSize: 20,
        color: Constants.Colors.primaryYellow
    },
    inputView: {
        // width: '50%',
        flex: 1,
        // width:Constants.ScreenWidth/2.2,
        alignItems: 'center',
        borderRadius: 35,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:"#cff"
    },
    selected: {
        backgroundColor: "white",
        shadowColor: "#787878",
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: Platform.OS == 'ios' ? 3 : 3,
    },
    wrappperInputField: {
        flexDirection: 'row',
        borderBottomColor: '#e8e5e5',
        borderBottomWidth: 1
    },
    label:
    {
        fontWeight: '700',
        marginBottom: 5,

    },
    InputFieldText:
    {
        paddingHorizontal: 20,
        height: 55,
        flex: 1,
        color: 'black',
        fontSize: 14,
    },
    wrapper:
    {
        display: 'flex'
    },
    iconWrapper:
    {
        width: 25,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
    },
    inputIcon: {
        width: 20,
        height: 20,
    },
    pickerPlcholderStyle: {
        width: "100%",
        paddingLeft: 0,

    },
    pickerStyle: {
        paddingLeft: 20,
        color: 'white',
    },
    labelStyle: {
        fontSize: Constants.FontSize.medium,
        marginBottom: 10,
        marginLeft: 10,
        fontSize: 12,
        fontFamily: Constants.PoppinsSemiBold,
    }

});
