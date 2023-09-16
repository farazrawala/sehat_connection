import {ScaledSheet} from 'react-native-size-matters';
import {colors} from '../../utils';

export const styles = ScaledSheet.create({
  autoCompleteField: {
    width: '100%',
    height: 60,
    // backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: '5@ms',
  },
  inputContainerStyle: {
    flex: 1,
    // backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: '5@ms',
    height: '42@ms',
    overflow: 'hidden',
    backgroundColor: 'white',
  },

  list: {
    // backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: '6@ms',
    marginTop: '4@ms',
    maxHeight: '200@ms',
    borderWidth: 0,
    width: '100%',
    margin: 0,
    backgroundColor: 'white',
  },
  autoCompleteListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '13@ms0.3',
    paddingHorizontal: '8@ms0.3',
  },
  details: {
    fontSize: '13@ms0.3',
    fontFamily: 'Roboto-Regular',
    marginLeft: '4@ms',
  },
  locationIcon: {
    fontSize: '15@ms',
    color: 'green',
  },
  autocomplete: {
    paddingLeft: '20@ms',
    paddingTop: '12@ms',
    fontFamily: 'Roboto-Regular',
    fontSize: '14@ms',
    color: 'black',
  },
});
