import axios from 'axios';
import { AUTH_TOKEN, BaseURL } from './constants';

export const api = axios.create({
    baseURL: BaseURL,
    headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
    }
});

export const urlApi = axios.create({
    baseURL: BaseURL,
});

//headers : Authorization(token)만 있을 경우
export const tokenApi = axios.create({
    baseURL: BaseURL,
    headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
    }
});

//headers : content-type만 있을 경우
export const contentApi = axios.create({
    baseURL: BaseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});