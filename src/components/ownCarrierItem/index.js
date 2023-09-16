import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';

import { Touchable, Textview } from '../';
import { Constants } from '../../utils';
import { Icon } from 'native-base';
import { Surface } from 'react-native-paper';
import StarRating from 'react-native-star-rating';


const onStarRatingPress = () => {
    // console.log('on Hear press');

}

const OwnCarrierItem = ({
    isBidding = false,
    item,
    index,
    onSelect,
    onPress,
    defaultValue = false,
}) => {

    const [heart, setHeart] = useState(false);
    const [selected, setSelected] = useState(defaultValue);

    useEffect(() => {
        setSelected(defaultValue)
    }, [defaultValue])

    return (
        <Touchable
            // onPress={onPress}
            onPress={() => {

                
                onSelect({ type: !selected, id: item.id, first_name: item.first_name })
                setSelected(!selected)
                
            }}
            buttonStyle={styles.itemContainer}>
            <Surface style={styles.imageContainer}>
                <Image source={Constants.img_1} style={styles.itemImage} />
            </Surface>
            <Surface style={styles.itemSubContainer}>
                <View style={styles.subContainer}>
                    <View style={styles.itemDetail}>
                        <Textview text={item.first_name + ' ' + item.last_name} lines={1} customStyles={styles.itemTitle} />
                        {isBidding ? <View style={styles.itemRateContainer}>
                            <Textview text='Rate: ' customStyles={styles.itemRateTitle} />
                            <Textview text='$500' customStyles={styles.itemRateAmount} />
                        </View> : null}
                        <View style={{ width: 80, marginTop: !isBidding ? 5 : 0 }}>

                            <StarRating
                                disabled={false}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                maxStars={5}
                                starSize={isBidding ? 13 : 16}
                                rating={5}
                                selectedStar={(rating) => onStarRatingPress(rating)}
                                fullStarColor={Constants.Colors.primaryYellow}
                            />
                        </View>
                    </View>
                    <Touchable buttonStyle={{ paddingVertical: 8, marginTop: 3 }} onPress={() => setHeart(!heart)} >
                        <Icon style={styles.favIcon} name={heart ? 'favorite' : 'favorite-border'} type='MaterialIcons' />
                    </Touchable>
                </View>
                <View style={styles.itemActionButtons}>
                    <Touchable buttonStyle={[styles.itemButtons]}><View style={styles.callIconContainer}><Icon style={styles.call} name='ios-call' type='Ionicons' /></View><Textview customStyles={styles.actionButtonText} text='Call' /></Touchable>
                    <View style={styles.seperator} />
                    <Touchable buttonStyle={[styles.itemButtons]}><Icon style={styles.chat} name='ios-chatbubbles' type='Ionicons' /><Textview customStyles={styles.actionButtonText} text='Message' /></Touchable>
                    {
                        isBidding ? <View style={styles.seperator} /> : null}
                    {isBidding ? <Touchable
                        onPress={() => {
                            onSelect({ type: !selected, id: item.id, name: item.first_name })
                            setSelected(!selected)
                        }}
                        buttonStyle={[styles.itemButtons]}>
                        <Icon style={styles.selected} name={selected ? 'ios-checkbox' : 'ios-square-outline'} type='Ionicons' />
                        <Textview customStyles={styles.actionButtonText} text='Select' />
                    </Touchable> : null}

                </View>
            </Surface>
        </Touchable >
    );
}


const styles = {
    itemContainer: {
        padding: 0,
        // elevation:4,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row'
    },
    imageContainer: {
        borderRadius: 10,
        elevation: 3,
        width: 120,
        height: '100%',
        // backgroundColor:"green"
        overflow: 'hidden'
    },
    itemImage: {
        borderRadius: 10,
        width: 120,
        height: 120,
        // resizeMode:'contain'
    },
    itemSubContainer: {
        flex: 1,
        marginVertical: 5,
        // backgroundColor:"#cff",
        paddingHorizontal: 7,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 3,
        // marginLeft:-2
    },
    subContainer: {
        flexDirection: 'row',
        // backgroundColor:'cyan',
        flex: 1,
        borderBottomColor: Constants.Colors.lightGrey,
        borderBottomWidth: 0.8,
    },
    itemDetail: {
        flex: 1,
        padding: 8
    },
    itemTitle: {
        fontSize: 15,
        fontFamily: Constants.PoppinsSemiBold
    },
    itemRateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemRateTitle: {
        fontFamily: Constants.PoppinsRegular,
        fontSize: 12
    },
    itemRateAmount: {
        fontSize: 13,
        fontFamily: Constants.PoppinsSemiBold
    },
    favIcon: {
        fontSize: 20,
        color: Constants.Colors.redHearColor,
        paddingHorizontal: 12
    },
    itemActionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 3,
    },
    itemButtons: {
        // flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        // padding:0,
        paddingVertical: 3,
    },
    callIconContainer: {
        // width:20,
        // height:20,
        paddingHorizontal: 2,
        backgroundColor: '#20c27f',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    call: {
        // padding:5,
        fontSize: 12,
        color: Constants.Colors.white
    },
    chat: {
        // paddingHorizontal:5,
        fontSize: 15,
        color: Constants.Colors.primaryBlue,
    },
    selected: {
        // paddingHorizontal:5,
        fontSize: 18,
        color: Constants.Colors.primaryYellow,
    },
    actionButtonText: {
        color: Constants.Colors.grey,
        paddingHorizontal: 5,
        fontFamily: Constants.PoppinsLight,
        fontSize: 9,
    },
    seperator: {
        height: "100%",
        width: 1,
        backgroundColor: Constants.Colors.lightGrey
    }
}

export { OwnCarrierItem };
