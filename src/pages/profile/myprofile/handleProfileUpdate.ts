import { PROFILE_UPDATE_OK } from '../../../lib/apis/constant/message';
import { URL } from '../../../lib/apis/constant/path';

export default async function handleProfileUpdate() {
    const id = document.querySelector('#id') as HTMLInputElement;
    const nickname = document.querySelector('#name') as HTMLInputElement;
    const intro = document.querySelector('#intro') as HTMLInputElement;
    const image = document.querySelector('#profile_image') as HTMLImageElement;

    const requestPath = '/user';
    const requestUrl = `${URL}${requestPath}`;

    const token = localStorage.token;
    const bearerToken = `Bearer ${token}`;

    const result = {
        state: false,
        message: '',
    };

    const userData = {
        user: {
            username: nickname.value,
            accountname: id.value,
            intro: intro.value,
            image: image.src,
        },
    };

    const response = await fetch(requestUrl, {
        method: 'PUT',
        headers: {
            Authorization: bearerToken,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const json = await response.json();
    result.state = true;
    result.message = PROFILE_UPDATE_OK;

    return result;
}
