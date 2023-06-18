import axios from 'axios';
import { AUTH_TOKEN, URL } from './constants';

export const api = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
    },
});

export const urlApi = axios.create({
    baseURL: URL,
});

//headers : Authorization(token)만 있을 경우
export const tokenApi = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
    },
});

//headers : content-type만 있을 경우
export const contentApi = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

//한개이미지
export const imgApi = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});