import { FAIL_ACCESS, SIGNUP_OK } from '../../lib/apis/constant/message';
import { URL } from '../../lib/apis/constant/path';

export default async function handleSignup(user) {
    const id = document.querySelector('#id').value;
    const nickname = document.querySelector('#name').value;
    const intro = document.querySelector('#intro').value;
    const image = document.querySelector('#profile_image').src;

    const email = user.email;
    const password = user.password;

    const requestPath = '/user';
    const requestUrl = `${URL}${requestPath}`;

    const result = {
        state: false,
        message: String,
    };

    const userData = {
        user: {
            username: nickname,
            email: email,
            password: password,
            accountname: id,
            intro: intro,
            image: image,
        },
    };

    const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const json = response.json();
    result.state = true;
    result.message = SIGNUP_OK;

    return result;
}
