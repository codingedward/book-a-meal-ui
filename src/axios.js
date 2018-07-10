import axios from 'axios';
import { BASE_URL } from './constants';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

axios.auth = () => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
}


export default axios;

