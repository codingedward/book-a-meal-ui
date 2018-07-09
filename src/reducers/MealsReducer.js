import { Status } from '../constants';
import { 
    EDIT_MEAL,
    CREATE_MEAL, 
    FETCH_MEALS,
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
                ...state,
                payload: { ...state.payload },
                fetchStatus: Status.STARTED,
                requiresFetch: false
            };

        case `${FETCH_MEALS}_SUCCESS`:
            return {
                ...state,
                payload: action.payload.data,
                fetchStatus: Status.SUCCESS,
            };

        case `${FETCH_MEALS}_FAIL`:
            return {
                ...state,
                payload: { ...state.payload },
                error: action.error.response,
                fetchStatus: Status.FAIL,
            };

        case `${FETCH_MEALS}_RESET`:
            return {
                payload: { ...state.payload },
                fetchStatus: Status.DEFAULT,
            }

        case CREATE_MEAL:
            return { 
                payload: { ...state.payload },
                createStatus: Status.STARTED
            }

        case `${CREATE_MEAL}_SUCCESS`:
            return {
                payload: { ...state.payload },
                createStatus: Status.SUCCESS,
                requiresFetch: true,
            }

        case `${CREATE_MEAL}_FAIL`:
            return {
                payload: { ...state.payload },
                error: action.error.response,
                createStatus: Status.FAIL
            }

        case `${CREATE_MEAL}_RESET`:
            return {
                payload: { ...state.payload },
                createStatus: Status.DEFAULT
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
                    ...state.payload,
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

        case `${EDIT_MEAL}_RESET`:
            return {
                payload: { ...state.payload },
                editStatus: Status.DEFAULT
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
                deleteStatus: Status.SUCCESS,
                requiresFetch: true,
            }

        case `${DELETE_MEAL}_FAIL`:
            return {
                payload: { ...state.payload },
                error: action.error.response,
                deleteStatus: Status.FAIL
            }
        case `${DELETE_MEAL}_RESET`:
            return {
                payload: { ...state.payload },
                deleteStatus: Status.DEFAULT
            }

        default:
            return state;
    }
}

export default mealsReducer;

