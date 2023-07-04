import axios from 'axios';
import { URL } from '../../lib/apis/constant/path';
import { api } from '../../lib/apis/axiosConfig';

export default async function getMyInfo() {
    const requestPath = '/user/myinfo';
    const requestUrl = `${URL}${requestPath}`;

    const response = await api.get(requestUrl);

    const data = await response.data;

    axios.interceptors.request.use((config) => {
        const token = localStorage.token;
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    return data.user;
}
