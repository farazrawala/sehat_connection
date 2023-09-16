import { Constants } from '../../utils';
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Surface } from 'react-native-paper';
import React, { PureComponent } from 'react';
import { RoundedButton } from '../../components';
import { Icon } from 'native-base';


class PateintReciept extends PureComponent {
    
    render() {

        const { onPress, text = 'Add More Container', _data = [] } = this.props;
        
        return (
            <View style={styles.container}>

                
            </View>
        )
    }
}


export { PateintReciept };

const styles = StyleSheet.create({

    container: {
        backgroundColor: Constants.Colors.listingBoxBg,
        flexDirection: 'row',
        width: '100%',
        height: 130,
        borderRadius: 20,
        marginVertical: 10,
    },
    
});