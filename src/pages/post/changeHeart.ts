import { URL } from '../../lib/apis/constant/path';

export default async function changeHeart(hearted: boolean, id: string) {
    const method = hearted ? 'POST' : 'DELETE';
    const param = hearted ? 'heart' : 'unheart';

    const requestPath = `/post/${id}/${param}`;
    const requestUrl = `${URL}${requestPath}`;

    const token = await localStorage.token;
    const bearerToken = `Bearer ${token}`;

    try {
        const response = await fetch(requestUrl, {
            method: method,
            headers: {
                Authorization: bearerToken,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(Response),
        });

        const json = await response.json();
        const result = json.post.hearted;
        return result;
    } catch (e) {
        console.error(e);
    }
}
