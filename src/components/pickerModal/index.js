import React, { Component } from 'react';
import { View, FlatList,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import styles from './styles';
class PickerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _renderItem = ({item,index}) => {
      const {
        onItemPress
      } = this.props;
      return(
          <TouchableOpacity style={styles.itemView} onPress={onItemPress}>
              <Icon style={styles.itemIcon} name={item.selected ? 'radio-button-checked' : 'radio-button-unchecked'} />
              <Text style={styles.itemTitle}>{item.title}</Text>
          </TouchableOpacity>
      )
  }

  _keyExtractor = (item,index) => index+"";

  render() {
      const {
          data=[]
      } = this.props
    return (
        <View style={styles.background}>
            <View style={styles.mainView}>
                <FlatList 
                    data={data}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        </View>
    );
  }
}

export {PickerModal}
