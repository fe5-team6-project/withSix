import { URL } from '../constant/path';

export default async function validationId() {
    const input = document.querySelector('#id');
    const id = input.value;

    const requestPath = '/user/accountnamevalid';
    const requestUrl = `${URL}${requestPath}`;

    const userData = {
        user: {
            accountname: id,
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
        if (message.match('이미 가입된')) {
            alert(message);
            input.focus();
            return false;
        }
    }

    alert(message);
    return true;
}
