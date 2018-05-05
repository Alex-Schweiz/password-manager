import { createStore, applyMiddleware,compose } from "redux";
import thunk from 'redux-thunk';
import PasswordReducer from './reducers';

export default compose(applyMiddleware(thunk))(createStore)(PasswordReducer);