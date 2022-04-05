import { combineReducers } from 'redux';
import auth from './auth';
import cart from './cart'
import filter from './filter'
export default combineReducers({
    auth,
    cart,
    filter
});
