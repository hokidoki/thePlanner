import axios from 'axios';

export const instanceWithCredential = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 180000,
    withCredentials: true
})