import {
    FAIL_VALID_EMAIL_PASSWORD,
    LOGIN_OK,
} from '../../lib/apis/constant/message';
import { URL } from '../../lib/apis/constant/path';

export default async function handleLogin() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const requestPath = '/user/login';
    const requestUrl = `${URL}${requestPath}`;

    const userData = {
        user: {
            email: email,
            password: password,
        },
    };

    const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const json = await response.json();
    if (!json.user) {
        alert(FAIL_VALID_EMAIL_PASSWORD);
        return false;
    }
    const token = json.user.token;
    localStorage.setItem('token', token);

    alert(LOGIN_OK);
    return true;
}
