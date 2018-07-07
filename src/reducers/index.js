import { combineReducers } from 'redux';
import auth from './AuthReducer';
import meals from './MealsReducer';

const reducer = combineReducers({
    auth,
    meals
})

export default reducer;
