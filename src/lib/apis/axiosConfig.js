import axios from 'axios';
import { AUTH_TOKEN, BASE_URL } from './constants';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
    }
});

export const urlApi = axios.create({
    baseURL: BASE_URL,
});

//headers : Authorization(token)만 있을 경우
export const tokenApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
    }
});

//headers : content-type만 있을 경우
export const contentApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});