import { PROFILE_UPDATE_OK } from '../../lib/apis/constant/message';
import { URL } from '../../lib/apis/constant/path';

export default async function handleProfileUpdate() {
    const id = document.querySelector('#id').value;
    const nickname = document.querySelector('#name').value;
    const intro = document.querySelector('#intro').value;
    const image = document.querySelector('#profile_image').src;

    const requestPath = '/user';
    const requestUrl = `${URL}${requestPath}`;

    const token = localStorage.token;
    const bearerToken = `Bearer ${token}`;

    const userData = {
        user: {
            username: nickname,
            accountname: id,
            intro: intro,
            image: image,
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
    console.log(json);

    alert(PROFILE_UPDATE_OK);
    return true;
}
