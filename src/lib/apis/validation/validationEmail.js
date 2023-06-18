import { URL } from '../constant/path';

export default async function validationEmail() {
    const input = document.querySelector('#email');
    const email = input.value;

    const requestPath = '/user/emailvalid';
    const requestUrl = `${URL}${requestPath}`;

    const userData = {
        user: {
            email: email,
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
    const message = json.message;

    if (!response.ok) {
        alert(message);
        input.focus();
        return false;
    } else {
        if (message.match('이미 사용중인')) {
            alert(message);
            input.focus();
            return false;
        }
    }

    alert(message);
    return true;
}
