import { FAIL_ACCESS } from '../../lib/apis/constant/message';
import { URL } from '../../lib/apis/constant/path';

export default async function getPost(category, accountname, skip, isMyPost) {
    const type = category;
    let requestPath = '/post';

    if (isMyPost) {
        if (type === '') {
            requestPath = `/post/?limit=10&skip=${skip}`;
        } else if (type === 'my') {
            requestPath = `/post/${accountname}/userpost/?limit=10&skip=${skip}`;
        } else if (type === 'feed') {
            requestPath = `/post/feed/?limit=10&skip=${skip}`;
        }
    } else {
        requestPath = `/post/${accountname}/userpost/?limit=10&skip=${skip}`;
    }

    const requestUrl = `${URL}${requestPath}`;

    const token = localStorage.token;
    const bearerToken = `Bearer ${token}`;

    try {
        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                Authorization: bearerToken,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(),
        });

        const json = await response.json();
        const postList = json.posts || json.post || [];

        return postList;
    } catch (e) {
        console.error(e);
        alert(FAIL_ACCESS);
    }
}
