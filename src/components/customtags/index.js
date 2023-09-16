import React, {Component} from 'react';
import {StyleSheet , View, Text, TouchableOpacity} from 'react-native';
// import {View, Dimensions, TouchableHighlight, Text} from 'native-base';
import {Constants, Utils} from '../../utils';
// import { Touchable } from '../';
// import TagInput from 'react-native-tags-input';

const mainColor = Constants.Colors.primaryBlue;

class CustomTags extends Component {
  state = {
    tags: {
      tag: '',
      tagsArray: [],
    },
    tagsColor: 'white',
    tagsText: '#fff',
    suggestions: [],
  };

  componentDidMount() {}


  // updateTagState = (state) => {
  //   this.setState({
  //     tags: state
  //   })
  // };

  // updateTagState = state => {
  //   this.setState(
  //     {
  //       tags: state,
  //     },
  //     () => {
  //       this.updateSuggestionState(state);
  //     },
  //   );
  // };

  updateSuggestionState = state => {
    if (state.tag === '') {
      return;
    }

    // Replace this with a callback from a search in your database
    let suggestionsArr = [
      'test1',
      'test2',
      'test3',
      'npm',
      'github',
      'react',
      'react native',
      'react-native-tags-input',
    ];
    let tempSuggestions = []; //
    //
    for (let i = 0; i < suggestionsArr.length; i++) {
      //
      if (suggestionsArr[i].includes(state.tag) === true) {
        // Replace this with database search result which will be
        tempSuggestions.push(suggestionsArr[i]); // added to the tempSuggestions-array.
      } //
    }
    if (tempSuggestions.length > 0) {
      this.setState({
        suggestions: tempSuggestions,
      });
    } else {
      this.setState({
        suggestions: [],
      });
    }
  };

  renderSuggestions = () => {
    if (this.state.suggestions.length > 0) {
      return this.state.suggestions.map((item, count) => {
        return (
          <TouchableOpacity
            onPress={() => this.onSuggestionClick(item)}
            key={count}>
            <Text>{item}</Text>
          </TouchableOpacity>
        );
      });
    } else {
      return null;
    }
  };

  render() {
    return (
      <View style={{backgroundColor:'red', width:'100%', height:300}}>

        <Text>Custom Tags</Text>


        {/* <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          /> */}


        {/* <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          placeholder="Symptoms... 2"
          // label='Press comma & space to add a tag'
          labelStyle={{color: '#fff'}}
          // customElement={<View>{this.renderSuggestions()}</View>}
          leftElementContainerStyle={{marginLeft: 3}}
          containerStyle={{width: '80%'}}
          inputContainerStyle={[
            styles.textInput,
            {backgroundColor: this.state.tagsColor},
          ]}
          inputStyle={{color: this.state.tagsText}}
          onFocus={() =>
            this.setState({
              tagsColor: '#fff',
              tagsText: Constants.Colors.primaryBlue,
            })
          }
          onBlur={() => this.setState({tagsColor: 'white', tagsText: '#fff'})}
          autoCorrect={false}
          tagStyle={styles.tag}
          deleteIconStyles={{
            fontSize: 50,
            color: 'white',
            // backgroundColor: 'white',
          }}
          tagTextStyle={styles.tagText}
          keysForTag={', '}
        /> */}
        {/* <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          placeholder="Tags..."
          label="Press comma & space to add a tag"
          labelStyle={{color: '#fff'}}
          //   leftElement={
          //     <Icon
          //       name={'tag-multiple'}
          //       type={'material-community'}
          //       color="red"
          //     />
          //   }
          leftElementContainerStyle={{marginLeft: 3}}
          containerStyle={{width: ''}}
          inputContainerStyle={[styles.textInput, {backgroundColor: 'black'}]}
          inputStyle={{color: 'white'}}
          onFocus={() =>
            this.setState({tagsColor: '#fff', tagsText: mainColor})
          }
          onBlur={() => this.setState({tagsColor: mainColor, tagsText: '#fff'})}
          autoCorrect={false}
          //   tagStyle={styles.tag}
          //   tagTextStyle={styles.tagText}
          keysForTag={', '}
        /> */}
      </View>
    );
  }
}

export {CustomTags};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Constants.Colors.primaryBlue,
  },
  deleteIconStyles: {
    color: 'white',
    fontSize: 10,
  },
  tagText: {
    // backgroundColor: Constants.Colors.primaryBlue
    color: 'white',
  },
  symptontextSytle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
