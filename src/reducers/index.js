import { combineReducers } from 'redux';
import auth from './AuthReducer';

const reducer = combineReducers({
    auth,
})

export default reducer;
