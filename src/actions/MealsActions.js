import axios from '../axios';
import { IMAGES_UPLOAD_URL } from '../constants';

export const CREATE_MEAL = 'ADD_MEAL';
export const FETCH_MEALS = 'FETCH_MEALS';
export const FETCH_COUNT = 10;
export const EDIT_MEAL = 'EDIT_MEAL';
export const DELETE_MEAL = 'DELETE_MEAL';

export function createMeal(meal, meta) {

    if (meal.image) {
        let image = {
            file: meal.image,
            upload_preset: 'pztk1zzn'
        }
        // async, first post image
        const response = axios.post(IMAGES_UPLOAD_URL, image);
        return (dispatch) => {
            response.then(({ data }) => {
                 dispatch({
                    type: CREATE_MEAL,
                    payload: {
                        request: {
                            method: 'post',
                            url: '/meals',
                            data: {
                                name: meal.name,
                                cost: meal.cost,
                                img_url: data.secure_url,
                            }
                        }
                    }
                });
            })
        }
    } 

    return {
        type: CREATE_MEAL,
        payload: {
            request: {
                method: 'post',
                url: '/meals',
                data: {
                    name: meal.name,
                    cost: meal.cost,
                }
            }
        }
    };
}

export function editMeal(meal) {
    if (meal.image) {
        let image = {
            file: meal.image,
            upload_preset: 'pztk1zzn'
        }
        const response = axios.post(IMAGES_UPLOAD_URL, image);
        return (dispatch) => {
            response.then(({ data }) => {
                 dispatch({
                    type: EDIT_MEAL,
                    payload: {
                        request: {
                            method: 'put',
                            url: `/meals/${meal.id}`,
                            data: {
                                name: meal.name,
                                cost: meal.cost,
                                img_url: data.secure_url,
                            }
                        }
                    }
                });
            })
        }
    } 

    return {
        type: EDIT_MEAL,
        payload: {
            request: {
                method: 'put',
                url: `/meals/${meal.id}`,
                data: meal
            }
        }
    };

}


export function fetchMeals(page = 1, per_page = FETCH_COUNT) {
    return {
        type: FETCH_MEALS,
        payload: {
            request: {
                method: 'get',
                url: `/meals?per_page=${per_page}&page=${page}`,
            }
        }
    }
}

export function deleteMeal(meal) {
    return (dispatch) => {
        dispatch({
            type: DELETE_MEAL,
            payload: {
                request: {
                    method: 'delete',
                    url: `/meals/${meal.id}`
                }
            }
        }).then(() => {
            dispatch(fetchMeals())
        }).catch(error => {
            dispatch({
                type: `${DELETE_MEAL}_FAIL`,
                error
            })
        })
    }
}
