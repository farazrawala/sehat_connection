import React, { PureComponent } from 'react';
// import { Constants } from '../../utils';
import { Constants, Utils } from '../../utils';
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Surface } from 'react-native-paper';
import { CustomText, Heading, RoundedButton } from '../../components';
import { Icon } from 'native-base';
import { Textview } from '../textview';

class CarrierLoadStatus extends PureComponent {


    constructor(props) {
        super();
        this.state = {
            job_status: props.item.bids.length > 0 ? props.item.bids[0].bid_status['status'] : props.item.status
        }

    }




    getStatusBtn() {


        const { item, onConfirmPress, onNewLoadsPress, onBidLoadsPress, onPaidPress, onRejectPress, onInvoicePress, onPressPending } = this.props;
        const { job_status } = this.state

        if (job_status == 'bid_load' || job_status == 'shipment_accept' || job_status == 'carrier_accept') {
            return (
                <View style={styles.bottomStatusWrapper}>
                    <RoundedButton
                        text="Bid"
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
        else if (job_status == 'publish') {
            return (
                <View style={styles.bottomStatusWrapper}>
                    <RoundedButton
                        fontsize={10}
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
        else if (job_status == 'broker_confirm') {
            return (
                <View style={styles.bottomStatusWrapper}>
                    <RoundedButton
                        text="Confirmed"
                        textColor={'white'}
                        fontsize={10}
                        customStyle={{
                            height: 25,
                            backgroundColor: Constants.Colors.reddish,
                            width: 80,
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
                        text="Invoice Sent"
                        textColor={'white'}
                        fontsize={10}
                        customStyle={{
                            height: 25,
                            backgroundColor: Constants.Colors.reddish,
                            // width: 80,
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
                        fontsize={10}
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
                        fontsize={10}
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
                        fontsize={10}
                        customStyle={{
                            height: 25,
                            width: 80,
                            backgroundColor: Constants.Colors.reddish,

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
                        <Icon type="FontAwesome5" name="pen-nib" style={[styles.statusIconStyle, { color: Constants.Colors.reddish, fontSize: 12 }]} />
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
                    />

                    <CustomText
                        textColor={"black"}
                        txt={"Drop off"}
                        fontFamily={Constants.PoppinsRegular}
                        type={"labelSmall"}
                    />
                    <View style={[styles.statusIconWrapper, { backgroundColor: Constants.Colors.reddish }]}>
                        <Icon type="MaterialCommunityIcons" name="arrow-down-bold-box" style={[styles.statusIconStyle, { color: 'white', fontSize: 12 }]} />
                    </View>

                </View>
            )
        }

    }

    _disableDispatchButton = (item = {}) => {
        const { loadType = 1 } = this.props;
        if (loadType == 7 || item.type == 7) {
            return true;
        }
        return item.type != 2 ? false : true;
    }

    _renderLocation(status, loctaionBg) {

        const { item, onCarrierPress, onPressPending } = this.props;

        return (

            <View style={[styles.locationContainer, { flexDirection: 'row', backgroundColor: loctaionBg }]}>
                <View style={styles.sideContainer}>
                    <Image
                        source={Constants.mapyellowpin_s}
                        style={styles.MapIcon}
                    />
                    <View style={{ flex: 1, marginTop: -3, }}>
                        <FlatList
                            data={[
                                {}, {}, {},
                                {}, {}, {},
                            ]}
                            renderItem={({ item }) =>
                                <View style={styles.dotStyle} />
                            }
                        />
                    </View>
                    {/*
                    */}
                    <Image
                        source={Constants.mapyellowpin_e}
                        style={styles.MapIcon}
                    />
                </View>


                <View style={styles.centerContainer}>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.textWrapper}>
                        <Text numberOfLines={1} style={styles.addressText}>{item.addresses[0]}</Text>
                    </TouchableOpacity>

                    <View style={styles.locationSeperator} />

                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.textWrapper}>
                        <Text numberOfLines={1} style={styles.addressText}>{item.addresses[item.addresses.length - 1]}</Text>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.sideContainer}>
                    <Image
                        source={Constants.upsidedownarrow}
                        style={[styles.MapIcon, { width: 15, }]}
                    />
                </TouchableOpacity>
            </View>
        )


    }
    render() {

        const { item, onCarrierPress, onPressPending } = this.props;
        var loctaionImg = Constants.Locations_Dblue;
        const { job_status } = this.state
        var loctaionBg = '#fff';

        // job_status == 'bid_load'
        if (job_status == 'pending')
            loctaionBg = '#f6d46b'
        else if (job_status == 'publish')
            loctaionBg = '#fa635c'
        else if (job_status == 'bid_load' || job_status == 'shipment_accept' || job_status == 'carrier_accept')
            loctaionBg = '#83dfab'
        else if (job_status == 'broker_confirm')
            loctaionBg = '#6bc6f2'
        else if (job_status == 'invoice')
            loctaionBg = '#fff'
        else if (job_status == 'paid')
            loctaionBg = '#fff'
        else if (job_status == 'reject')
            loctaionBg = '#fff'


        return (
            <Surface style={styles.menuWrapper}>

                <View style={styles.topDesc}>
                    <View style={styles.topTxtWrapper}>
                        <CustomText
                            txt={"B/L " + item.reference_number+'_'+job_status}
                            type={"labelSmall"}
                            textColor={'#c6c6c9'}
                            fontSize={15}
                            fontFamily={Constants.PoppinsRegular}
                        />
                        <CustomText
                            txt={Utils.capitalizeFirstLetter(item.job_type) + '_' + item.id}
                            textColor={'#000'}
                            type={"labelSmall"}
                            fontSize={18}
                            fontFamily={Constants.PoppinsSemiBold}
                        />

                    </View>
                    <View style={styles.topPriceWrapper}>
                        <Heading
                            txt={item.carrier_rate != null ? "$" + item.carrier_rate : "$ 0"}
                            fontSize={22}
                        />
                    </View>
                </View>
                <View style={styles.addressWrapper}>
                    {
                        this._renderLocation(job_status, loctaionBg)
                    }
                </View>

                <View style={styles.descContainer}>
                    <View style={styles.attributeContainer}>

                        <View style={[styles.attributeWrapper]}>
                            {/* <View> */}
                            <Icon name="clockcircle" type="AntDesign" style={styles.attrIcon} />
                            <View style={styles.attrText}>
                                <Textview
                                    customStyles={styles.hoursText}
                                    text={"3hrs ago"}
                                />
                            </View>
                        </View>

                        <View style={[styles.attributeWrapper, { flex: 1 }]}>
                            <Icon name="weight" type="FontAwesome5" style={styles.attrIcon} />
                            <View style={styles.attrText}>
                                <Textview
                                    customStyles={styles.hoursText}
                                    text={"W 320 Lbs"}

                                />
                            </View>
                        </View>


                        <View style={[styles.attributeWrapper, { flex: 1, }]}>
                            <Icon name="location-pin" type="Entypo" style={styles.attrIcon} />
                            <View style={styles.attrText}>
                                <Textview
                                    customStyles={styles.hoursText}
                                    text={"28 Miles"}
                                />
                            </View>
                        </View>

                        <View style={[styles.attributeWrapper, {}]}>
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
                                textColor={'#c5c6c8'}
                                txt={"Carrier Status"}
                                type={"labelSmall"}
                                fontSize={12}
                                fontFamily={Constants.PoppinsRegular}
                            />

                            <CustomText
                                textColor={"black"}
                                txt={item.type != 2 ? "Dispatch" : '-'}
                                type={"labelSmall"}
                                fontFamily={Constants.PoppinsRegular}
                            />


                            <View style={styles.statusIconWrapper}>
                                <View style={{ backgroundColor: '#22c27f', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                                    <Icon type="Entypo" name="phone" style={[styles.statusIconStyle, { fontSize: 12, color: 'white' }]} />
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
                                fontFamily={Constants.PoppinsRegular}
                            />

                            <CustomText
                                textColor={"black"}
                                txt={"Start"}
                                fontFamily={Constants.PoppinsRegular}
                                type={"labelSmall"}
                            />

                            <View style={styles.statusIconWrapper}>
                                <View style={{ backgroundColor: '#22c27f', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                                    <Icon type="Entypo" name="phone" style={[styles.statusIconStyle, { fontSize: 12, color: 'white' }]} />
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


                    <View style={[styles.statusContainer,]}>
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
                                    // txt={"28 Jul, 2019"}
                                    txt={item.pickup_date && item.pickup_date.substr(1, 10)}
                                    type={"labelSmall"}
                                    fontSize={12}
                                    fontFamily={Constants.PoppinsRegular}
                                    textColor={"black"}
                                />
                            </View>
                        </View>

                        <View style={styles.bottomStatusWrapper}>
                            <CustomText
                                textColor={'#c5c6c8'}
                                txt={"Arrival Date"}
                                type={"labelSmall"}
                                fontSize={12}
                                fontFamily={Constants.PoppinsRegular}
                            />
                            <View style={styles.bottomDateWrappper}>
                                <Icon type="FontAwesome" name="calendar" style={[styles.statusIconStyle, { color: Constants.Colors.primaryYellow, marginHorizontal: 5 }]} />
                                <CustomText
                                    txt={item.dropoff_date && item.dropoff_date.substr(1, 10)}
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

export { CarrierLoadStatus };

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
        paddingBottom: 10
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
        paddingBottom: 15
        // backgroundColor: 'green'
    },
    attributeContainer: {
        flexDirection: 'row',
        marginHorizontal: 15,
        borderColor: Constants.Colors.lightGrey,
        borderBottomWidth: 1
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
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    seperator: {

        height: '70%', width: 1,
        backgroundColor: Constants.Colors.lightGrey

    },
    locationSeperator: {
        marginHorizontal: 5,
        backgroundColor: Constants.Colors.lightGrey,
        height: 1,
    },
    statusWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusIconWrapper: {
        flexDirection: 'row',
        height: 19,
        width: 19,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 11,
        marginTop: 4
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
    hoursText: {
        fontFamily: Constants.PoppinsMedium,
        fontSize: 10,
        color: Constants.Colors.grey
    },

    locationContainer:
    {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 15,

    },
    sideContainer: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    MapIcon: {
        resizeMode: 'contain',
        width: 16.5,
    },

    centerContainer: {
        height: 115,
        flex: 1,
        paddingLeft: 10,
        paddingBottom: 20,
    },

    dotStyle: {
        borderRadius: 1,
        backgroundColor: '#fec200',
        width: 2,
        height: 2,
        marginVertical: 1.5,
    },
    seperator: {
        marginHorizontal: 5,
        backgroundColor: '#f1f1f1',
        height: 1,
    },
    textInputContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'red',
        alignItems: 'flex-start',
    },
});
