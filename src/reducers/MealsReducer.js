import { Status } from '../constants';
import { 
    EDIT_MEAL,
    CREATE_MEAL, 
    FETCH_MEALS,
    FETCH_COUNT,
    DELETE_MEAL
} from '../actions/MealsActions';

const initialState = {
    payload: {
        meals:[]
    }
}

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MEALS:
            return { 
                payload: { ...state.payload },
                fetchStatus: Status.STARTED,
            };

        case `${FETCH_MEALS}_SUCCESS`:
            return {
                payload: action.payload.data,
                fetchStatus: Status.SUCCESS
            };

        case `${FETCH_MEALS}_FAIL`:
            return {
                payload: { ...state.payload },
                error: action.error.response,
                fetchStatus: Status.FAIL
            };

        case CREATE_MEAL:
            return { 
                payload: { ...state.payload },
                createStatus: Status.STARTED
            }

        case `${CREATE_MEAL}_SUCCESS`:
            let meals = [action.payload.data.meal].concat(state.payload.meals);
            meals.concat(state.payload.meals);

            // ensure maximum meals count is FETCH_COUNT
            while (meals.length > FETCH_COUNT) {
                meals.pop();
            }
            return {
                payload: { 
                    ...state.payload,  
                    meals,
                },
                createStatus: Status.SUCCESS,
            }

        case `${CREATE_MEAL}_FAIL`:
            return {
                payload: { ...state.payload },
                error: action.error.response,
                createStatus: Status.FAIL
            }

        case EDIT_MEAL:
            return {
                payload: { ...state.payload },
                editStatus: Status.STARTED
            }
        case `${EDIT_MEAL}_SUCCESS`:
            const { meal } = action.payload.data
            return {
                payload: {
                    meals: state.payload.meals.map(currentMeal => {
                        if (currentMeal.id === meal.id) {
                            return meal;
                        }
                        return currentMeal;
                    })
                },
                editStatus: Status.SUCCESS
            }
        case `${EDIT_MEAL}_FAIL`:
            return {
                payload: { ...state.payload },
                error: action.error.response,
                editStatus: Status.FAIL
            }

        case DELETE_MEAL:
            return {
                payload: { ...state.payload },
                deleteStatus: Status.STARTED
            }
        case `${DELETE_MEAL}_SUCCESS`:
            // fetch is triggered...
            return {
                payload: { ...state.payload },
                deleteStatus: Status.SUCCESS
            }
        case `${DELETE_MEAL}_FAIL`:
            return {
                payload: { ...state.payload },
                error: action.error.response,
                deleteStatus: Status.FAIL
            }
        default:
            return state;
    }
}

export default mealsReducer;

