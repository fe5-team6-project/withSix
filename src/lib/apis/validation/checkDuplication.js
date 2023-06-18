import { URL } from '../constant/path';

export async function checkDuplicationEmail() {
    const input = document.querySelector('#email');
    const email = input.value;
    console.log(email);

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
        input.focus();
        return false;
    } else {
        if (message.includes('이미')) {
            input.focus();
            return false;
        }
    }

    return true;
}

export async function checkDuplicationId() {
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
        input.focus();
        return false;
    } else {
        if (message.includes('이미')) {
            input.focus();
            return false;
        }
    }

    return true;
}
