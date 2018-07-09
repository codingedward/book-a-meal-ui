import axios from 'src/axios';
import { paginationInfo } from 'src/utils';
import { store } from 'src/store'

import { IMAGES_UPLOAD_URL } from 'src/constants';

export const FETCH_COUNT = 5;
export const FETCH_MEALS = 'FETCH_MEALS';
export const CREATE_MEAL = 'ADD_MEAL';
export const EDIT_MEAL = 'EDIT_MEAL';
export const DELETE_MEAL = 'DELETE_MEAL';
export const RESET_EDIT_STATUS = 'RESET_EDIT_STATUS';
export const RESET_FETCH_STATUS = 'RESET_FETCH_STATUS';
export const RESET_DELETE_STATUS = 'RESET_DELETE_STATUS';

export function resetCreateStatus() {
    return {
        type: `${CREATE_MEAL}_RESET`
    }
}

export function resetEditStatus() {
    return {
        type: `${EDIT_MEAL}_RESET`
    }
}

export function resetDeleteStatus() {
    return {
        type: `${DELETE_MEAL}_RESET`
    }
}

export function resetFetchStatus() {
    return {
        type: `${FETCH_MEALS}_RESET`
    }
}

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
                 })                    
            });
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
    }
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
            }).catch(error => {
                dispatch({
                    type: `${EDIT_MEAL}_FAIL`,
                    error,
                })
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


export function fetchMeals(params = {}) {

    let currentPage = 1;
    try {
        currentPage = paginationInfo(store.getState().meals).currentPage
    } catch(error) {}

    const page = params.page  || currentPage;
    const perPage = params.perPage || FETCH_COUNT;
    const search = params.search ? `name:${params.search}` : '';

    return {
        type: FETCH_MEALS,
        payload: {
            request: {
                method: 'get',
                url: `/meals?per_page=${perPage}&page=${page}&search=${search}`,
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
