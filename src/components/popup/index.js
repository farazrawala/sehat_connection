import React, { Component } from 'react';
import { View, Text,ScrollView } from 'react-native';
import styles from './styles';
import PopupButtons from '../popupButtons';
import PopupItemCounter from '../popupItemCounter';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        counterValue:1
    };
  }

  onButtonPress = (type =1) => {
    alert(type);
  }

  onValueChange = (type,index) => {
    var counter = this.state.counterValue;
    var counterVal = type == 1 ? (counter+1) : (counter-1);
    this.setState({counterValue:counterVal});
  }

  render() {
    const {
        title = 'alsdjfalsdf alsdkfasd f',
        description='asldfj laskdfj alsdfkj asdlfka sdfl'
    } = this.props;
    const {
        counterValue = 1,
    } = this.state;
    return (
        <View style={styles.background}>
            <View style={styles.mainView}>
                <View style={styles.subView}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.itemContainer}>
                        
          <ScrollView showsVerticalScrollIndicator={false}>
                            <PopupItemCounter counterValue={counterValue} index={1} onValueChange={this.onValueChange.bind(this)} />
                        </ScrollView>
                    </View>
                </View>
                <PopupButtons onButtonPress={this.onButtonPress.bind(this)} />
            </View>
        </View>
    );
  }
}

export {Popup}