export const GET_MEALS = 'GET_MEALS';


export function getMealsAct() {
    return {
        type: GET_MEALS,
        payload: {
            request: {
                method: 'get',
                url: '/meals',
            }
        }
    }
}

