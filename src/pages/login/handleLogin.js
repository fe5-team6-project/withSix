import {
    FAIL_VALID_EMAIL_PASSWORD,
    LOGIN_OK,
} from '../../lib/apis/constant/message';
import { URL } from '../../lib/apis/constant/path';
import { contentApi } from '../../lib/apis/axiosConfig';

export default async function handleLogin(email, password) {
    const requestPath = '/user/login';
    const requestUrl = `${URL}${requestPath}`;

    const userData = {
        user: {
            email: email,
            password: password,
        },
    };

    const result = {
        state: false,
        message: '',
    };

    const response = await contentApi.post(requestUrl, userData);

    const data = await response.data;
    if (!data.user) {
        result.state = false;
        result.message = FAIL_VALID_EMAIL_PASSWORD;
        return result;
    } else {
        result.state = true;
        result.message = LOGIN_OK;
    }

    const token = data.user.token;
    localStorage.setItem('token', token);

    return result;
}
