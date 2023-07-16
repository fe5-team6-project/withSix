import { FAIL_ACCESS } from '../../lib/apis/constant/message';
import { URL } from '../../lib/apis/constant/path';

export default async function changeHeart(hearted, id) {
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
            body: JSON.stringify(),
        });

        const json = await response.json();
        const result = json.post.hearted;
        return result;
    } catch (e) {
        console.error(e);
    }
}
