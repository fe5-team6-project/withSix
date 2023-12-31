import { URL } from '../../../lib/apis/constant/path';

export default async function getUserProfile(accountname: string) {
    const requestPath = `/profile/${accountname}`;
    const requestUrl = `${URL}${requestPath}`;

    const token = localStorage.token;
    const bearerToken = `Bearer ${token}`;

    const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
            Authorization: bearerToken,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(Response),
    });

    const json = await response.json();

    return json.profile;
}
