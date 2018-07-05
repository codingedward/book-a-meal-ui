const responseReducer = ({ actionName, initialState }) => {

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case actionName:
                return {
                    ...state,
                    loading: true,
                };

            case `${actionName}_SUCCESS`:
                return {
                    ...state,
                    payload: action.payload.data,
                    loading: false,
                };

            case `${actionName}_FAIL`:
                return {
                    ...state,
                    error: action.error.response,
                    loading: false,
                };

            default:
                return state;
        }
    }
    return reducer;
}


export default responseReducer;
