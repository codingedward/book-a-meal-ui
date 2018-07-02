import { combineReducers } from 'redux';
import authentication from './AuthReducer';

const reducer = combineReducers({
    authentication,
})

export default reducer;
