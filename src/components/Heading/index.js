import React, { PureComponent } from 'react';
import { Constants } from '../../utils';
import { StyleSheet, Text,View } from 'react-native';

class Heading extends PureComponent {


    render() {
        const { txt, family, customStyle, type = '', fontSize = 0, textColor } = this.props;
        var Font = family || Constants.PoppinsSemiBold;
        var size = fontSize || 25;
        var txtColor = textColor || Constants.Colors.primaryBlue;
        var weight = null;
        // alert(type)
        if (type == 'large') {
            size = fontSize || 27;
            txtColor= Constants.Colors.primaryBlue

        }
        if (type == 'medium') {
            size = fontSize || 18;
        }
        if (type == 'small') {
            size = fontSize || 17;
            Font = Constants.PoppinsSemiBold;
            // weight = 'bold';
        }


        return (
            <Text style={[customStyle, { fontWeight: weight, fontFamily: Font, fontSize: size, color: txtColor }]} >{txt}</Text>
        );

    }
}


// const Heading = ({txt = ''}) => {
//     return (
//       <View style={styles.spinnerStyle}>
//         <Text>klsadklfakj</Text>
//       </View>
//     );
//   };
  
//   const styles = {
    
//   };
  
  export {Heading};


