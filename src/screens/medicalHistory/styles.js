import {Constants, Colors} from '../../utils';
import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Constants.Colors.backgrounGrey,
  },
  diseasContainer: {
    // backgroundColor: 'red',
  },
  secSubContainer: {
    // backgroundColor: 'yellow',
    // flexDirection: 'row',
  },
  inputWrapper:{
      // paddingHorizontal:10,
  },
  attachmentsStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  crossBtn:{
    backgroundColor: 'white',
    width: 20,
    height: 20,
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:5
  },
  tagWrap:{
    backgroundColor: Constants.Colors.primaryBlue,
    padding:5,
    paddingHorizontal:10,
    borderRadius:20,
    marginRight:10,
    flexDirection:'row',
    marginTop:5,
  },
  tagStyle:{
    color:'white',
    // padding:10,
    borderRadius:15,
  },

  tagWrapper:{
    flexDirection:'row',
    paddingVertical:10,
    flexWrap: 'wrap',

  },
  inputTagsStyle:{
    backgroundColor: 'white',
    color:'black',
    paddingHorizontal:10,
  },
  tagContainer:{
    width:'100%',
    // backgroundColor: 'red',
    // height:200,
  },
  symtomsStyle: {
    height: 50,
    // marginTop: 20,
    // backgroundColor: 'red',
  },
  deseasTxtStyl: {
    fontSize: 16,
    color: Constants.Colors.grey,
  },
  searchWrapper: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.Colors.primaryGreen,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  filterWrapper: {
    width: 50,
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    color: Constants.Colors.primaryGreen,
    fontSize:20,
  },
  fitlerIcon: {
    color: 'white',
    fontSize:20,
    // width: 50,
  },
  suggestionContainer: {
    marginTop: -10,
  },
  diseaseWrapper: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
  },
  attachmentWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  attchImgStyle: {
    width: 15,
    resizeMode: 'contain',
    marginRight: 5,
  },
  attchTextStyle: {
    color: Constants.Colors.primaryGreen,
    fontSize: 12,
    fontWeight: 'bold',
  },
  desContainer: {
    flex: 1,
    padding: 20,
    // paddingHorizontal: 20,
    // backgroundColor: 'red'
  },
  symptomsContainer: {
    backgroundColor: 'white',
    // padding: 10,
    paddingTop: 10,
    // backgroundColor: 'red',
    // paddingHorizontal: 10,
    borderRadius: 8,
  },
  tag: {
    backgroundColor: Constants.Colors.primaryBlue,
    color: 'white',
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
  symtomsWrapper: {
    backgroundColor: Constants.Colors.lightGrey,
    marginRight: 10,
    marginBottom: 10,
    // marginHorizontal: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 3,
  },
  crossIconStyle: {
    color: 'white',
    fontSize: 17,
    // marginVertical: 5,
    marginHorizontal: 5,
  },
  suggestionWrapper: {
    // backgroundColor: 'red',
    // position: 'absolute',
    // zIndex: 9999,
    paddingHorizontal: 10,
    height: 30,
    justifyContent: 'center',
    width: '100%',
  },
  suggestionStyle: {
    color: Constants.Colors.primaryBlue,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
export default loginStyles;
