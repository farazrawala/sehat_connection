import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native';
import { Picker, Item, Icon, ActionSheet } from 'native-base';
import { Constants } from '../../utils';
import { Touchable } from '../';
import SignatureCapture from 'react-native-signature-capture';
import mainStyle from '../../components/generalStyle/style';
import { RoundedButton, } from '../../components';

class Signature extends Component {

    state = {
        imageUrl: '',
        modalVisibility: false
    }

    constructor(props) {
        super(props);

        // console.log('Signature ', props.signaturePath);
    }

    componentDidMount() {

    }

    saveSign() {

        const { modalVisibility, imageUrl } = this.state
        this.refs["sign"].saveImage();

        // console.log('image url ', );

    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    _onSaveEvent(result, prop) {

        // console.log('_onSaveEvent , ', result['pathName']);
        this.setState({ modalVisibility: false })

    }


    _onDragEvent() {
        // This callback will be called when the user enters signature
        // console.log("dragged ends ... ");
    }

    ShowModalFunction(visible) {
        this.setState({ modalVisibility: visible });
    }
    renderModal() {

        const { children = '', signaturePath } = this.props;

        return (
            <Modal
                transparent={true}
                animationType={"slide"}
                visible={this.state.modalVisibility}
            // onRequestClose={() => { this.ShowModalFunction(!this.state.modalVisibility) }}
            >
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>

                    <SignatureCapture
                        style={[{ flex: 1, marginTop: 70, marginBottom: 30, width: '90%' }, styles.signature]}
                        ref="sign"
                        onSaveEvent={(result) => {
                            this._onSaveEvent(result, this.props)
                            this.setState({ imageUrl: result['pathName'] })
                            signaturePath(result['pathName']);

                        }}
                        onDragEvent={this._onDragEvent}
                        saveImageFileInExtStorage={true}
                        showNativeButtons={false}
                        showTitleLabel={true}
                        // viewMode={"portrait"}
                         />

                    <View style={{ flexDirection: "row", marginBottom: 50, }}>
                        <RoundedButton
                            text="Save"
                            textColor={'white'}
                            customStyle={{
                                width: 150,
                                borderRadius: 30,
                                height: 45,
                                backgroundColor: Constants.Colors.primaryYellow
                            }}
                            fontsize={14}
                            handleOnPress={() => this.saveSign()}
                        />
                        <View style={{ width: 20, }} />

                        <RoundedButton
                            text="Reset"
                            textColor={'white'}
                            customStyle={{
                                width: 150,
                                borderRadius: 30,
                                height: 45,
                                backgroundColor: Constants.Colors.primaryBlue
                            }}
                            fontsize={14}
                            handleOnPress={() => this.resetSign()}
                        />

                    </View>
                </View>

            </Modal>
        )
    }
    render() {

        const { children = '', signaturePath } = this.props;

        // console.log('render ', signaturePath);

        const { imageUrl, modalVisibility } = this.state

        return (

            <Touchable onPress={() => this.setState({ modalVisibility: true })}  >

                {
                    modalVisibility ?
                        this.renderModal()
                        : children
                }
            </Touchable >

        );
    }
}


export { Signature };


const styles = StyleSheet.create({
    signature: {
        flex: 1,
        height: 500,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }

});
