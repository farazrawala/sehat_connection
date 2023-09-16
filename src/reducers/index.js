import {combineReducers} from 'redux';
import ConfigReducer from './ConfigReducer';
const AppReducer = combineReducers({
  main: ConfigReducer,
});

export default AppReducer;
