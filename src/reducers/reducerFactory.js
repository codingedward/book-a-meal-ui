import { Status } from '../constants';

export const reducer = ({ resource, resourceCollection, initialState }) => {

    const createReducer = (state = initialState, action) => {
        switch (action.type) {
            case `${resource}_CREATE`:
                return {
                    ...state,
                    createStatus: Status.STARTED,
                };

            case `${resource}_CREATE_SUCCESS`:
                return {
                    ...state,
                    createStatus: Status.SUCCESS,
                    payload: {
                        ...state.payload,
                        [resource]: state.payload[resource].concat(action.payload[resource])
                    }
                };

            case `${resource}_CREATE_FAIL`:
                return {
                    ...state,
                    error: action.error.response,
                    createStatus: Status.FAIL,
                };

            case `${resource}_FETCH`:
                return {
                    ...state,
                    fetchStatus: Status.STARTED,
                }
            case `${resource}_FETCH_SUCCESS`:
                return {
                    ...state,
                    fetchStatus: Status.SUCCESS,
                    [resource]: action.payload.data
                }

            default:
                return state;
        }
    }
    return reducer;
}


export default responseReducer;
