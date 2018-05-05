import { combineReducers } from 'redux';
import PasswordReducer from './password-reducer';

const reducers = {
  passwordStore: PasswordReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;