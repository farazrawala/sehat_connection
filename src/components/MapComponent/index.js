import React, { PureComponent } from 'react';
import { Constants, Utils } from '../../utils';
import {
    StyleSheet, Text, View, Image, Dimensions,
    Linking, PermissionsAndroid, TextInput,
    TouchableOpacity, Platform, FlatList
} from 'react-native';
import MapView, { Marker, MarkerAnimated } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GoogleAutoComplete, AddMoreTouch } from '../../components';
import Geolocation from '@react-native-community/geolocation';
import { takeWhile } from 'lodash';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;



function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}

class MapComponent extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {

            locationText: '',
            modalVisible: false,
            fieldIndex: 0,
            searchWithinCountry: false,
            yourLocation: 'Your Location',
            chooseDestination: 'Choose Destination',
            markers: this.props.mapPredefineAddress ?
                this.props.mapPredefineAddress : [
                    { title: 'Your Location', coordinate: { latitude: 0, longitude: 0 } },
                    { title: 'Your Destination', coordinate: { latitude: 0, longitude: 0 } },
                ],
            canEdit: this.props.canEdit || true,
            stopsAddress: [],
            updateYellowDots: this.updateYellowDots.bind(this),
            mapDots:
                [
                    {}, {}, {},
                    {}, {}, {},
                ]

        };

    }



    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }


    async componentDidMount() {

        var that = this;

        if (Platform.OS === 'ios') {
            this.callLocation(that);
        } else {

            const status = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );

            if (status === PermissionsAndroid.RESULTS.GRANTED) {
                this.callLocation(that)
            }

            if (status === PermissionsAndroid.RESULTS.DENIED) {
                alert('Location permission denied by user.');
            }
            else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {

                alert('Location permission revoked by user.');
            }
        }


    }

    updateYellowDots() {

        const { mapDots, markers = [] } = this.state

        // console.log('updateYellowDots runs ', );

        // var temp = mapDots;
        var times = markers.length - 2;

        for (var i = 0; i < 11 * times; i++) {
            mapDots.push({});
            // console.log('i', i);
        }

        // this.setState({ mapDots: temp })



    }

    onPressChangeLocation(item) {


        console.log('item ', item);


        const { markers, yourLocation, chooseDestination } = this.state
        const { markersValues } = this.props


        var temparr = Array.from(markers);


        var temp = markers[item.index]
        var temp1 = markers[item.index - 1]


        console.log('temp', temp);
        console.log('temp1', temp1);




        temparr[item.index - 1] = temp
        temparr[item.index] = temp1

        if (item.index == 1 && temp.coordinate.latitude != 0) {
            this.setState({
                lat: temp.coordinate.latitude,
                lng: temp.coordinate.longitude,
            })
        }


        if (item.index == 1 && temp1.coordinate.latitude == 0) {
            temparr[item.index] = { title: 'Add Stop', coordinate: { latitude: 0, longitude: 0 } }
        }

        if (item.index == 1 && temp.coordinate.latitude == 0) {
            temparr[item.index - 1] = { title: this.state.yourLocation, coordinate: { latitude: 0, longitude: 0 } }
        }

        // temparr[item.index - 1].title = this.state.yourLocation


        if (item.index == markers.length - 1 && temp1.coordinate.latitude == 0)
            temparr[item.index] = { title: this.state.chooseDestination, coordinate: { latitude: 0, longitude: 0 } }
        if (item.index == markers.length - 1 && temp.coordinate.latitude == 0)
            temparr[item.index - 1] = { title: 'Add Stop', coordinate: { latitude: 0, longitude: 0 } }

        // console.log('temparr ', temparr);

        this.setState({ markers: temparr });
        markersValues(temparr);

        // setTimeout(() => {
        //     console.log('markers after change loction ', this.state.markers);
        // }, 2000)



    }



    static getDerivedStateFromProps(props, state) {

        console.log('state.latitude', state);
        console.log('props', props);

        if (props.mapPredefineAddress) {

            if (props.mapPredefineAddress.length > 1) {
                return {
                    // lat: props.mapPredefineAddress[0].coordinate.latitude == 0 ? props.mapPredefineAddress[0].coordinate.latitude : state.lat,
                    // lng: props.mapPredefineAddress[0].coordinate.longitude == 0 ? props.mapPredefineAddress[0].coordinate.longitude : state.long,
                    markers: props.mapPredefineAddress,
                    // model: state.updateYellowDots(props.model)
                }
            }

        }
        // else {
        //     return {
        //         yourLocation: props.yourLocation,
        //         chooseDestination: props.chooseDestination,
        //         searchWithinCountry: props.searchWithinCountry,
        //     };
        // }


    }


    callLocation(that) {

        const { region = {} } = this.state;

        Geolocation.getCurrentPosition(
            (position) => {

                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })

            },
            (error) => {
                // alert(error.message)


                console.log('error_permission', error);
                if (error.PERMISSION_DENIED == 1) {
                    // Linking.openURL('app-settings:');

                    setTimeout(() => {
                        Utils.confirmSettings("", 'Turn on Location Services to Allow "Google Maps" to Determine Your Location', (status) => {
                            if (status == 'success') {
                                Linking.openURL('app-settings:');
                            }
                        })
                    }, 1000)

                }

            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

    }

    onMapPress(e) {
        this.setState({
            markers: [
                ...this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                    key: id++,
                    color: randomColor(),
                },
            ],
        });
    }


    showLocationPopup(index, isLocationVisible = false) {

        this.setState({
            isLocationVisible: true,
            fieldIndex: index
        })

    }

    updateMapCenter() {

        const { markers } = this.state

        // console.log('index_markers  ', markers);

        if (markers[0].desc != undefined) {
            this.setState({
                lat: markers[0].coordinate.latitude,
                lng: markers[0].coordinate.longitude,
            })
        }
    }

    onPressSetMyLocation = () => {
        if (Platform.OS === "ios") {
            this.requestLocationPermissionIOS();
        } else if (Platform.OS === "android") {
            this.requestLocationPermissionAndroid();
        }
    };

    requestLocationPermissionIOS = () => {
        Geolocation.requestAuthorization();
        Geolocation.getCurrentPosition(
            (info) => {

                this.onLocationChange(info.coords);
            },
            (error) => {
                console.log(error)
            }
        );
    }

    onLocationChange = (value) => {

        // console.log('onLocationChange ++', value)

        if (value != []) {
            var address = ''
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${value.latitude},${value.longitude}&key=AIzaSyAyFOKFuPvlou4KJV1LPXGRgi-gVk1q-qA&fields=formatted_address`)
                .then(response => response.json())
                .then(response => {
                    address = response
                    if (response.status == 'OK') {

                        this.onLocationSeclect(this.state.fieldIndex,
                            {
                                latitude: value.latitude,
                                longitude: value.longitude,
                                address: response.results[1].formatted_address
                            }, response.results[1], true);


                    }
                }).catch(error => {
                    console.log(error, 'Response in catch')
                });

        }

    }

    requestLocationPermissionAndroid = () => {
        Geolocation.getCurrentPosition(
            (info) => {

                this.onLocationChange(info.coords);
            },
            () => {
                // alert("Location permissions denied");
            },
            { enableHighAccuracy: true, timeout: 5000 }
        );
    }





    onLocationSeclect = (index, markersData, details = null, modalVisible = false) => {

        const { onLocationSeclect, markersValues } = this.props;
        const { markers } = this.state

        var countryCode = '';
        {
            details.address_components.map(address => {
                if (address.types[0] == 'country') {
                    countryCode = address.short_name.toLowerCase();
                }
            })
        }


        markers[index] = {
            title: markersData.address,
            desc: markersData.address,
            country: countryCode,
            coordinate: { latitude: markersData.latitude, longitude: markersData.longitude },
        }


        if (index == 0)
            this.updateMapCenter()

        this.setState({ markers })

        markersValues(markers);


        if (index == 0) {
            this.setState({
                yourLocation: markersData.address
            })
        }
        if (index == 1) {
            this.setState({
                chooseDestination: markersData.address
            })
        }
        this.setState({ isLocationVisible: modalVisible })
    }

    // updateMapDots() {
    //     const { mapDots = [], markers = [] } = this.state
    //     this.setState({ mapDots, markers })
    // }

    onAddStopPress() {


        const { mapDots = [], markers = [] } = this.state
        const { markersValues } = this.props

        for (var i = 0; i < 11; i++) {
            mapDots.push({});
        }

        markers[markers.length] = markers[markers.length - 1]
        markers[markers.length - 2] = { title: 'Add Stop', coordinate: { latitude: 0, longitude: 0 } }
        this.showLocationPopup(markers.length - 2);

        this.setState({ mapDots, markers })
        this.onPressSetMyLocation();
        markersValues(markers);


    }

    onPressLocationSwitch(item) {

        // console.log('pres onPressLocationSwitch');

        this.setState({
            markers: [
                { title: 'Your Location', coordinate: { latitude: 0, longitude: 0 } },
            ]
        })
    }



    renderChangeLocationIcon = (item) => {

        const { markers } = this.state
        const { mapEdit = true } = this.props

        console.log('renderChangeLocationIcon', item);

        if (item.index !== 0 && mapEdit == true) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.onPressChangeLocation(item);
                    }}
                    style={{ marginTop: 5.5, }}>
                    <Image
                        source={Constants.upsidedownarrow}
                        style={styles.MapIcon}
                    />
                </TouchableOpacity>
            )
        }

    }


    onRemovePress(index) {

        const { markers, mapDots } = this.state
        var temp = []
        for (var i = 0; i < mapDots.length - 11; i++)
            temp.push({});


        Utils.confirmAlert("Confirm", "Are you sure you want to remove this stop ?", (status) => {
            if (status == 'success') {
                markers.splice(index, 1);
                this.setState({ markers, mapDots: temp });
            }
        })

    }

    renderCrossBtn(index) {

        const { markers } = this.state
        const { mapEdit = true } = this.props

        if (mapEdit == true) {

            if (markers.length - 1 != index) {
                return (
                    <TouchableOpacity onPress={() => this.onRemovePress(index)}>
                        <Image
                            source={Constants.map_cross_btn}
                            style={styles.CrossIcon}
                        />
                    </TouchableOpacity>
                )
            }

        }
    }


    render() {

        const { lat = 0, searchWithinCountry = false, markers = [], canEdit, fieldIndex = 0, isLocationVisible, yourLocation = 'Your Location', chooseDestination = 'Choose Destination', lng = 0 } = this.state;
        const {
            showLocationPopup,
            onDismiss,
            markersValues,
            mapEdit
        } = this.props;

        console.log('render works');

        return (
            <View style={styles.mapContainer}>
                <View style={styles.mapWrappper}>
                    <MapView
                        provider={this.props.provider}
                        style={styles.map}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        initialRegion={{
                            latitude: parseFloat(lat),
                            longitude: parseFloat(lng),
                            // latitude: 37.8025259, longitude: -122.4351431,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                        region={{
                            latitude: parseFloat(lat),
                            longitude: parseFloat(lng),
                            // latitude: 37.8025259, longitude: -122.4351431,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                    >
                        {markers.map((marker, index) => {
                            var coordinate = marker.coordinate

                            console.log('_marker=' + index, marker);
                            var last = markers.length - 1
                            var icon = index == 0 || last == index ? Constants.mapPinYellow : Constants.mapPin

                            return (
                                <View>
                                    <Marker
                                        key={marker.place_id}
                                        coordinate={coordinate}
                                        pinColor={'red'}
                                        image={icon}
                                        title={marker.name}
                                        description={marker.formatted_address}
                                    />
                                </View>
                            )
                        }
                        )}
                    </MapView>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <View style={styles.sideContainer}>
                            <Image
                                source={Constants.mapyellowpin_s}
                                style={styles.MapIcon}
                            />
                            <View style={{ flex: 1, marginTop: -3, }}>
                                <FlatList
                                    data={this.state.mapDots}
                                    extraData={this.state}
                                    renderItem={({ item }) =>
                                        <View style={styles.dotStyle} />
                                    }
                                />
                            </View>
                            <Image
                                source={Constants.mapyellowpin_e}
                                style={styles.MapIcon}
                            />
                        </View>
                        <View style={styles.textInputContainer}>
                            <FlatList
                                data={this.state.markers}
                                renderItem={({ item, index }) =>

                                    <View style={{ flex: 1, paddingRight: 10, }}>

                                        {

                                            index != 0 ?
                                                <View style={styles.seperator} /> : null
                                        }

                                        <View style={[styles.textContainer, {}]}>
                                            <TouchableOpacity
                                                activeOpacity={mapEdit ? .5 : 1}
                                                onPress={() =>
                                                    mapEdit ?
                                                        this.showLocationPopup(index, 'chooseDestination') : null
                                                }
                                                style={styles.textWrapper}>

                                                <Text numberOfLines={2} >
                                                    {
                                                        // item.index == 0 && item.desc ?
                                                        //     item.desc : item.title
                                                        item.title || item
                                                    }
                                                </Text>

                                            </TouchableOpacity>
                                            {
                                                index == 0 && mapEdit == true ?
                                                    <AddMoreTouch
                                                        text="Add Stop"
                                                        onPress={() => this.onAddStopPress()}
                                                    /> : this.renderCrossBtn(index)
                                            }

                                        </View>
                                    </View>
                                }
                            />
                        </View>
                        <View style={styles.sideContainer}>
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                alignContent: 'space-between',
                                paddingTop: 20,
                            }}>
                                <FlatList
                                    data={this.state.markers}
                                    extraData={this.state.markers}
                                    keyExtractor={this._keyExtractor}
                                    renderItem={this.renderChangeLocationIcon}
                                    scrollEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <GoogleAutoComplete
                    isVisible={isLocationVisible}
                    onDismiss={() => {
                        this.setState({
                            isLocationVisible: false
                        })
                    }}
                    firstAddress={markers[0]}
                    searchWithinCountry={searchWithinCountry}
                    fieldIndex={fieldIndex}
                    onSelectLocation={(detail, marker) => {
                        this.onLocationSeclect(fieldIndex, detail, marker);
                    }}

                    // Not workign now.
                    ref={ref => this.GoogleAutoComplete = ref}
                    handleOnPress={() => {
                        var thisMethod = this.GoogleAutoComplete.updateCurrentLocation();
                    }}

                />


            </View>

        );
    }
}

export { MapComponent };

const styles = StyleSheet.create({

    inputContainer: {
        borderRadius: 15,
        marginTop: -20,
        backgroundColor: 'white',
        marginHorizontal: 20,
        backgroundColor: "#FFF",
        shadowColor: "#787878",
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: Platform.OS == 'ios' ? 3 : 3,

    },
    seperator: {
        marginHorizontal: 5,
        backgroundColor: '#f1f1f1',
        height: 1,
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        height: 50,
        // backgroundColor: 'blue'
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'green',
        // height: 49,
        // height: 70,
    },
    stopWrapper: {
        flexDirection: 'row'
    },
    inputWrapper: {
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,

    },
    sidebar: {
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 8,
        paddingLeft: 10,
    },
    sideContainer: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,

    },
    mapContainer: {
        width: '100%',

    },
    mapWrappper: {
        height: 220,
        marginTop: -15,
        width: '100%',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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

    CrossIcon: {
        resizeMode: 'contain',
        width: 12,
        // borderWidth:1,
    },
    MapIcon: {
        resizeMode: 'contain',
        width: 22,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width: '100%',
        height: '100%',
    },
    modalView: {
        // margin: 20,

        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        paddingTop: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        height: '100%'
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        width: 40,
        height: 40,
        // padding: 10,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",

        fontSize: 20,
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    dotStyle: {
        borderRadius: 1,
        backgroundColor: '#fec200',
        width: 2,
        height: 2,
        marginVertical: 1.36,
    },
    changeLocationWrapper: {

        // justifyContent: 'space-between',
        // alignItems: 'center',
        // alignContent: 'space-around',
        backgroundColor: 'yellow'
    }

});