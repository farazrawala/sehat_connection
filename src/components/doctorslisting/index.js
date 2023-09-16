import { Constants } from '../../utils';
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Surface } from 'react-native-paper';
import React, { PureComponent } from 'react';


class Categories extends PureComponent {

    _renderItems = ({ item, index }) => {

        const { _data = [] } = this.props;
            console.log('item REnders');
        if (index % 2 == 0) {

            return (

                <View>

                    <View style={styles.menuWrapper}>
                        <Image
                            source={Constants.coviImg}
                            style={styles.covidImg}
                        />
                        <Text style={styles.headingStyle}>{_data[index].title}</Text>
                    </View>
                    {
                        index + 1 <= _data.length - 1 ?
                            <View style={styles.menuWrapper}>
                                <Image
                                    source={Constants.coviImg}
                                    style={styles.covidImg}
                                />
                                <Text style={styles.headingStyle}>Covid-19~{"\n"}Advice</Text>
                            </View>
                            : null
                    }

                </View>

            )
        }
    }

    render() {
        const { onPress, text = 'Add More Container', _data = [] } = this.props;

        console.log('Props __ ',_data);

        return (
            <View style={styles.categoryContainer}>

                <Text style={styles.heading}>Cateogories</Text>

                <View style={styles.categoriesWrapper}>

                    <FlatList
                        data={_data}
                        extraData={this.props}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItems}
                        scrollEnabled={true}
                        // numColumns={2}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />

                </View>

            </View>
        )
    }
}


export { Categories };

const styles = StyleSheet.create({

    surfaceStyle: {
        elevation: 3,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 15,

        width: 150,
        height: 100,

        backgroundColor: 'white'
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
        height: 260,
        padding: 20,
    },
    desContainer: {
        // flex: 1,
        height: 500,
        backgroundColor: Constants.Colors.primaryBlue
    },
    headingStyle: {
        // width:80,
        flex: 1
    },
    menuWrapper: {
        width: 170,
        marginRight: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        borderRadius: 15,
        marginBottom: 15,
    },
    covidImg: {
        width: 60,
        marginHorizontal: 10,
        // marginLeft:10,
        // marginRight: 10,
        resizeMode: 'contain'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Constants.primaryBlue,
        marginBottom: 15,
    }


});