const responseReducer = ({ actionName, initialState }) => {

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case actionName:
                return {
                    loading: true,
                };

            case `${actionName}_SUCCESS`:
                return {
                    payload: action.payload.data,
                    loading: false,
                };

            case `${actionName}_FAIL`:
                return {
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
