import React, { Component } from 'react';
import { Constants } from '../../utils';
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Surface } from 'react-native-paper';
import { CustomText, Heading, RoundedButton } from '../../components';
import { Icon } from 'native-base';
import { Textview } from '../textview';

class DispatchLoadStatus extends Component {

    getStatusBtn() {

        const { item, onConfirmPress, onNewLoadsPress, onBidLoadsPress, onPaidPress, onRejectPress, onInvoicePress, onPressPending } = this.props;


        if (item.type == 3) {
            return (
                <View style={styles.bottomStatusWrapper}>
                    <RoundedButton
                        text="Bid Load"
                        textColor={'white'}
                        customStyle={{
                            height: 25,
                            backgroundColor: Constants.Colors.reddish,
                            width: 80,
                            marginVertical: 10
                        }}
                        fontsize={10}
                        handleOnPress={onBidLoadsPress}
                    />
                </View>
            );
        }
        else if (item.type == 8) {
            return (
                <View style={styles.bottomStatusWrapper}>
                    <RoundedButton
                        text="New Load"
                        textColor={'white'}
                        customStyle={{
                            height: 25,
                            backgroundColor: Constants.Colors.reddish,
                            width: 80,
                            marginVertical: 10
                        }}
                        fontsize={10}
                        handleOnPress={onNewLoadsPress}
                    />
                </View>
            );
        }
        else if (item.type == 4) {
            return (
                <View style={styles.bottomStatusWrapper}>
                    <RoundedButton
                        text="Confirmed"
                        textColor={'white'}
                        customStyle={{
                            height: 25,
                            backgroundColor: Constants.Colors.reddish,
                            // width: 80,
                            marginVertical: 10
                        }}
                        fontsize={10}
                        handleOnPress={onConfirmPress}
                    />

                </View>
            );
        }
        else if (item.type == 5) {
            return (
                <View style={styles.bottomStatusWrapper}>
                    <RoundedButton
                        text="Invoice"
                        textColor={'white'}
                        customStyle={{
                            height: 25,
                            backgroundColor: Constants.Colors.reddish,
                            width: 80,
                            marginVertical: 10
                        }}
                        fontsize={10}
                        handleOnPress={onInvoicePress}
                    />
                </View>
            );
        }

        else if (item.type == 6) {
            return (
                <View style={styles.bottomStatusWrapper}>
                    <RoundedButton
                        text="Paid"
                        textColor={'white'}
                        customStyle={{
                            height: 25,
                            backgroundColor: Constants.Colors.reddish,
                            width: 80,
                            marginVertical: 10
                        }}
                        fontsize={10}
                        handleOnPress={onPaidPress}
                    />

                </View>
            );
        }

        else if (item.type == 7) {
            return (
                <View style={styles.bottomStatusWrapper}>
                    <RoundedButton
                        text="Rejected"
                        textColor={'white'}
                        customStyle={{
                            height: 25,
                            backgroundColor: Constants.Colors.reddish,
                            width: 80,
                            marginVertical: 10
                        }}
                        fontsize={10}
                        handleOnPress={onRejectPress}
                    />

                </View>
            );
        }
        else {
            return (
                <View style={styles.bottomStatusWrapper}>
                    <RoundedButton
                        text="Pending"
                        textColor={'white'}
                        customStyle={{
                            height: 25,
                            backgroundColor: Constants.Colors.reddish,
                            width: 80,
                            marginVertical: 10
                        }}
                        fontsize={10}
                        handleOnPress={onPressPending}
                    />
                </View>
            );
        }




    }
    getLoadStatus() {

        const { item, onCarrierPress, onSignaturePress, onPressPending } = this.props;

        if (item.type == 4) {
            return (
                <TouchableOpacity onPress={onSignaturePress} style={[styles.statusWrapper, {}]}>

                    <CustomText
                        txt={"Load Status"}
                        type={"labelSmall"}
                        fontSize={12}
                        fontFamily={Constants.PoppinsRegular}
                    />

                    <CustomText
                        textColor={"black"}
                        txt={"Signature"}
                        fontFamily={Constants.PoppinsRegular}
                        type={"labelSmall"}
                    />
                    <View style={[styles.statusIconWrapper, {}]}>
                        <Icon type="FontAwesome5" name="pen-nib" style={[styles.statusIconStyle, { color: Constants.Colors.reddish,fontSize:12}]} />
                    </View>

                </TouchableOpacity>
            )
        }
        else {
            return (
                <View style={[styles.statusWrapper, {}]}>
                    <CustomText
                        txt={"Load Status"}
                        type={"labelSmall"}
                        fontSize={12}
                        fontFamily={Constants.PoppinsRegular}
                        // textColor={'#c5c6c8'}
                    />

                    <CustomText
                        textColor={"black"}
                        txt={"Drop off"}
                        fontFamily={Constants.PoppinsRegular}
                        type={"labelSmall"}
                    />
                    <View style={[styles.statusIconWrapper, { backgroundColor: Constants.Colors.reddish }]}>
                        <Icon type="MaterialCommunityIcons" name="arrow-down-bold-box" style={[styles.statusIconStyle, { color: 'white',fontSize:12 }]} />
                    </View>

                </View>
            )
        }

    }

    _disableDispatchButton = (item={}) => {
        const {loadType = 1 }=this.props;
        if(loadType == 7 || item.type == 7){
            return true;
        }
        return item.type != 2 && item.type != 3 ? false : true;
    }

    render() {

        const { item, onCarrierPress, onPressPending } = this.props;


        var loctaionImg = Constants.Locations_Dblue;

        if (item.type == 1)
            loctaionImg = Constants.Locations_Dblue
        else if (item.type == 2)
            loctaionImg = Constants.Locations_brown
        else if (item.type == 3)
            loctaionImg = Constants.Locations_green
        else if (item.type == 4)
            loctaionImg = Constants.Locations_blue
        else if (item.type == 5)
            loctaionImg = Constants.Locations_purple
        else if (item.type == 6)
            loctaionImg = Constants.locations_green_paid
        else if (item.type == 7)
            loctaionImg = Constants.Locations_brown
        else if (item.type == 8)
            loctaionImg = Constants.locations_red



        return (
            <Surface style={styles.menuWrapper}>
                <View style={styles.topDesc}>

                    <View style={styles.topTxtWrapper}>

                        <CustomText
                            txt={"B/L 122432535"}
                            type={"labelSmall"}
                            textColor={'#c6c6c9'}
                            fontSize={15}
                            fontFamily={Constants.PoppinsRegular}
                            />
                        <CustomText
                            txt={"CTN # MSCU1234567"}
                            type={"labelSmall"}
                            textColor={'#c6c6c9'}
                            fontFamily={Constants.PoppinsRegular}
                            fontSize={15}
                        />

                    </View>
                    <View style={styles.topPriceWrapper}>
                        <Heading
                            txt={"$568"}
                            fontSize={22}
                        />
                    </View>
                </View>
                <View style={styles.addressWrapper}>
                    <Image
                        source={loctaionImg}
                        style={{ width: '100%', height: '100%',resizeMode:"stretch" }}
                    />
                </View>
                <View style={styles.descContainer}>
                    <View style={styles.attributeContainer}>

                        <View style={[styles.attributeWrapper,{flex:1}]}>
                            <View>
                                <Icon name="clockcircle" type="AntDesign" style={styles.attrIcon} />
                            </View>
                            <View style={styles.attrText}>
                                <Textview
                                customStyles={styles.hoursText}
                                    text={"3hrs ago"}
                                />
                            </View>
                        </View>

                        <View style={[styles.attributeWrapper, {flex:1}]}>
                            <View>
                                <Icon name="weight" type="FontAwesome5" style={styles.attrIcon} />
                            </View>
                            <View style={styles.attrText}>
                                <Textview
                                customStyles={styles.hoursText}
                                    text={"W 320 Lbs"}
                                
                                />
                            </View>
                        </View>


                        <View style={[styles.attributeWrapper,{flex:1}]}>
                            <View>
                                <Icon name="location-pin" type="Entypo" style={styles.attrIcon} />
                            </View>
                            <View style={styles.attrText}>
                                <Textview
                                customStyles={styles.hoursText}
                                    text={"28 Miles"}
                                />
                            </View>
                        </View>

                        <View style={[styles.attributeWrapper,{flex:1}]}>
                            <View>
                                <Icon name="ruler-combined" type="FontAwesome5" style={styles.attrIcon} />
                            </View>
                            <View style={styles.attrText}>
                                <Textview
                                    text={"40"}
                                    customStyles={styles.hoursText}
                                />
                            </View>
                        </View>


                    </View>


                    <View style={[styles.statusContainer, {}]}>
                        <TouchableOpacity disabled={this._disableDispatchButton(item)} onPress={onCarrierPress} style={styles.statusWrapper}>
                            <CustomText
                                txt={"Carrier Status"}
                                type={"labelSmall"}
                                fontSize={12}
                                fontFamily={Constants.PoppinsRegular}
                            />



                            <CustomText
                                textColor={"black"}
                                txt={item.type == 2 || item.type == 3 ? "-" : "Dispatch"}
                                type={"labelSmall"}
                                fontFamily={Constants.PoppinsRegular}
                            />



                            <View style={styles.statusIconWrapper}>
                            <View style={{backgroundColor: '#22c27f', justifyContent:'center', alignItems: 'center',borderRadius:4}}>
                                    <Icon type="Entypo" name="phone" style={[styles.statusIconStyle, {fontSize:12, color: 'white' }]} />
                                </View>
                                <View style={{ width: 10 }}></View>
                                <Icon type="FontAwesome" name="wechat" style={[styles.statusIconStyle, { color: '#3885cd' }]} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.seperator}></View>
                        <View style={styles.statusWrapper}>
                            <CustomText
                            textColor={'#c5c6c8'}
                            fontSize={12}
                                txt={"Driver Status"}
                                type={"labelSmall"}
                                fontSize={12}
                                fontFamily={Constants.PoppinsRegular}
                            />

                            {
                                item.type == 2 || item.type == 3 ?
                                    <CustomText
                                        textColor={"black"}
                                        txt={"-"}
                                        fontFamily={Constants.PoppinsRegular}
                                        type={"labelSmall"}
                                    />
                                    :
                                    <CustomText
                                        textColor={"black"}
                                        txt={"Start"}
                                        fontFamily={Constants.PoppinsRegular}
                                        type={"labelSmall"}
                                    />
                            }
                            
                            <View style={styles.statusIconWrapper}>
                            <View style={{backgroundColor: '#22c27f', justifyContent:'center', alignItems: 'center',borderRadius:4}}>
                                    <Icon type="Entypo" name="phone" style={[styles.statusIconStyle, {fontSize:12, color: 'white' }]} />
                                </View>
                                <View style={{ width: 10 }}></View>
                                <Icon type="FontAwesome" name="wechat" style={[styles.statusIconStyle, { color: '#3885cd' }]} />
                            </View>
                        </View>
                        <View style={styles.seperator}></View>
                        {this.getLoadStatus()}


                    </View>


                    <View style={styles.horizontalSeprator}>
                    </View>


                    <View style={[styles.statusContainer]}>
                        <View style={styles.bottomStatusWrapper}>
                            <CustomText
                                txt={"Dept Date"}
                                fontSize={12}
                                type={"labelSmall"}
                                fontFamily={Constants.PoppinsRegular}
                            />
                            <View style={styles.bottomDateWrappper}>
                                <Icon type="FontAwesome" name="calendar" style={[styles.statusIconStyle, { color: Constants.Colors.primaryYellow, marginHorizontal: 5 }]} />
                                <CustomText
                                    txt={"28 Jul, 2019"}
                                    type={"labelSmall"}
                                    fontSize={12}
                                    fontFamily={Constants.PoppinsRegular}
                                    textColor={"black"}
                                />
                            </View>
                        </View>

                        <View style={styles.bottomStatusWrapper}>
                            <CustomText
                                txt={"Arrival Date"}
                                fontSize={12}
                                fontFamily={Constants.PoppinsRegular}
                                type={"labelSmall"}
                            />
                            <View style={styles.bottomDateWrappper}>
                                <Icon type="FontAwesome" name="calendar" style={[styles.statusIconStyle, { color: Constants.Colors.primaryYellow, marginHorizontal: 5 }]} />
                                <CustomText
                                    txt={"28 Jul, 2019"}
                                    type={"labelSmall"}
                                    textColor={"black"}
                                    fontSize={12}
                                    fontFamily={Constants.PoppinsRegular}
                                />
                            </View>
                        </View>

                        {this.getStatusBtn()}

                    </View>

                </View>
            </Surface>
        );
    }
}

export { DispatchLoadStatus };

const styles = StyleSheet.create({

    attrIconStyle: {
        fontSize: Constants.FontSize.tiny,
        color: Constants.grey,
    },
    bottomStatusWrapper: {
        alignItems: 'center',
        flex: 1,
    },
    menuWrapper: {
        // display:'none',
        backgroundColor: 'white',
        borderRadius: 15,
        marginHorizontal: 5,
        elevation: 3,
        borderColor: Constants.Colors.grey,
        marginVertical: 25,
        paddingBottom:10
    },
    topDesc: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },
    topTxtWrapper: {
        flex: 1,
        height: 80,
        justifyContent: 'center'
    },
    addressWrapper: {
        height: 105,
        // backgroundColor: 'red'
    },
    descContainer: {
        // height: 260,
        alignItems: 'center',
        paddingBottom:15
        // backgroundColor: 'green'
    },
    attributeContainer: {
        flexDirection: 'row',
        marginHorizontal: 15,
        borderColor:Constants.Colors.lightGrey,
        borderBottomWidth:1
        // backgroundColor: 'yellow'
    },
    attrText: {
        marginRight: Platform.OS == 'android' ? 3 : 3,
    },
    attributeWrapper: {
        
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 1,
        // backgroundColor: 'red'

    },
    IconStyle: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        marginHorizontal: 3,
    },
    statusContainer: {
        // height: 100,
        // borderWidth: 1,
        paddingVertical:12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    seperator: {
        height: '70%', width: 1,
        backgroundColor: Constants.Colors.lightGrey
    },
    statusWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopWidth: 1
        // paddingHorizontal: 30
    },
    statusIconWrapper: {
        flexDirection: 'row',
        height: 19,
        width: 19,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 11,
        marginTop:4
    },
    attrIcon: {
        color: Constants.Colors.primaryYellow,
        fontSize: 14,
        marginRight: 5
    },
    statusIconStyle: {
        fontSize: 14,
        padding: 1,
        // marginHorizontal: 5
        // backgroundColor: 'blue'
    },
    bottomDateWrappper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    horizontalSeprator: {
        width: '88%',
        height: 1,
        backgroundColor: Constants.Colors.lightGrey,
    },
    hoursText:{
        fontFamily:Constants.PoppinsMedium,
        fontSize:10,
        color:Constants.Colors.grey
    },
});

const stylesOld = StyleSheet.create({

    attrIconStyle: {
        fontSize: Constants.FontSize.tiny,
        color: Constants.grey,
    },
    bottomStatusWrapper: {
        alignItems: 'center',
        flex: 1,
    },
    menuWrapper: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginHorizontal: 4,
        elevation: 4,
        borderColor: Constants.Colors.grey,
        marginVertical: 25
    },
    topDesc: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },
    topTxtWrapper: {
        flex: 1,
        height: 80,
        justifyContent: 'center'
    },
    addressWrapper: {
        height: 105,
        // backgroundColor: 'red'
    },
    descContainer: {
        // height: 260,
        alignItems: 'center',
        paddingBottom:15
        // backgroundColor: 'green'
    },
    attributeContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        // backgroundColor: 'yellow'
    },
    attrText: {
        // marginRight: Platform.OS == 'android' ? 3 : 7,
        // flex:1,
        justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal:5,
    },
    attributeWrapper: {

        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 1,
        // backgroundColor: 'red'

    },
    IconStyle: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        marginHorizontal: 3,
    },
    statusContainer: {
        // height: 100,
        // borderWidth: 1,
        paddingVertical:12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    seperator: {
        height: '70%', width: 1,
        backgroundColor: Constants.Colors.lightGrey
    },
    statusWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopWidth: 1
        // paddingHorizontal: 30
    },
    statusIconWrapper: {
        flexDirection: 'row',
        height: 22,
        width: 22,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 11
    },
    attrIcon: {
        color: Constants.Colors.primaryYellow,
        fontSize: 14,
        marginRight: 5
    },
    statusIconStyle: {
        fontSize: 14,
        padding: 1,
        // marginHorizontal: 5
        // backgroundColor: 'blue'
    },
    bottomDateWrappper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    horizontalSeprator: {
        width: '88%',
        height: 1,
        backgroundColor: Constants.Colors.lightGrey,
    }



});