import React, { Component } from 'react';
// import Constant from '../../common/Constants';
import { Constants } from '../../utils';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;



function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}


class BusinessMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [
                {
                    id: 1,
                    title: 'Location 1',
                    desc: 'Description 1',
                    coordinate: { latitude: 37.78925, longitude: -122.4324 },
                },
                {
                    id: 2,
                    title: 'Location 2',
                    desc: 'Description 2',
                    coordinate: { latitude: 37.76825, longitude: -122.4324 },
                },
                {
                    id: 2,
                    title: 'Location 2',
                    desc: 'Description 2',
                    coordinate: { latitude: 37.76825, longitude: -122.3322 },
                },
            ],
        };
    }


    onMapPress(e) {}

    render() {

        const { } = this.props;

        return (

            <View style={styles.mapContainer}>
                <View style={styles.mapWrappper}>
                    <MapView
                        ref={ref => myMap = ref}
                        provider={this.props.provider}
                        style={styles.map}
                        initialRegion={this.state.region}
                        onPress={e => this.onMapPress(e)}
                    >
                        {this.state.markers.map(marker => (
                            <Marker
                                key={marker.key}
                                coordinate={marker.coordinate}
                                pinColor={marker.color}
                                image={Constants.business_pin}
                                title={marker.title}
                                description={marker.desc}
                            />
                        ))}
                        {this.props.children}
                    </MapView>
                </View>
            </View>

        );
    }
}

export { BusinessMap };

const styles = StyleSheet.create({
    mapInput: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    inputContainer: {
        // height: 115,
        // flex:1,
        borderRadius: 15,
        marginTop: -20
    },
    mapContainer: {
        // height: Constants.ScreenHeight - 120,
        // top: 10,
        // zIndex:-1000,
        // elevation:-3,
        // flex:1,
        width:'100%',
        height:"100%",
    },
    mapWrappper: {
        flex: 1,
        backgroundColor:"red",
        zIndex:-9999,
        elevation:-4,
        // marginTop: -15,
        // width: '100%',
    },
    map: {
        width:"100%",
        height:"100%",
        zIndex:-9999,
        elevation:-4
        // position: 'absolute',
        /* top: 0,
        left: 0,
        right: 0,
        bottom: 0, */
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },

});