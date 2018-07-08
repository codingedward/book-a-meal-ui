import axios from 'axios';
import { BASE_URL } from './constants';
import { store } from './store';

axios.defaults.baseURL = BASE_URL;
axios.auth = () => {
    const payload = store.getState().auth.login.payload;
    if (payload && payload.access_token) {
        axios.default.headers.common['Authorization'] = `Bearer ${payload.access_token}`
    }
}

export default axios;

