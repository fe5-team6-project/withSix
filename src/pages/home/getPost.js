import { URL } from '../../lib/apis/constant/path';

export default async function getPost(category, accountname, skip) {
    const type = category;
    let requestPath = '/post';

    if (type === '') {
        requestPath = `/post/?limit=10&skip=${skip}`;
    } else if (type === 'my') {
        requestPath = `/post/${accountname}/userpost/?limit=10&skip=${skip}`;
    } else if (type === 'feed') {
        requestPath = `/post/feed/?limit=10&skip=${skip}`;
    }

    const requestUrl = `${URL}${requestPath}`;

    const token = localStorage.token;
    const bearerToken = `Bearer ${token}`;

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
}
