import { SIGNUP_OK } from '../../lib/apis/constant/message';
import { URL } from '../../lib/apis/constant/path';

export default async function handleSignup(user, image, id, name, intro) {
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
            username: name,
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
