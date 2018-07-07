import reducerFactory from './reducerFactory';
import { GET_MEALS } from '../actions/MealsActions';

const meals = reducerFactory({
    actionName: GET_MEALS,
    initialState: [],
    stateField: 'meals'
});

export default meals;

