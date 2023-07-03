import axios from 'axios';
import { URL } from '../../lib/apis/constant/path';

export default async function getMyInfo() {
    const requestPath = '/user/myinfo';
    const requestUrl = `${URL}${requestPath}`;

    const token = localStorage.token;
    const bearerToken = `Bearer ${token}`;

    // const response = await fetch(requestUrl, {
    //     method: 'GET',
    //     headers: {
    //         Authorization: bearerToken,
    //         'Content-type': 'application/json',
    //     },
    //     body: JSON.stringify(),
    // });

    // const json = await response.json();

    // return json.user;

    const response = await axios({
        method: 'GET',
        url: requestUrl,
        headers: {
            Authorization: bearerToken,
            'Content-type': 'application/json',
        },
    });

    const data = await response.data;

    axios.interceptors.request.use((config) => {
        const token = localStorage.token;
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    return data.user;
}
