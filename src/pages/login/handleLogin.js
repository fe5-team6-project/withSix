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
    const token = json.user.token;
    localStorage.setItem('token', token);

    if (!localStorage.token.length) {
        return false;
    }

    return true;
}
