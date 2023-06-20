import { URL } from '../../lib/apis/constant/path';

export default async function getPost(category, accountname, pages) {
    let requestPath = '/post';
    const type = category;

    if (type === '') {
        requestPath = `/post/?limit=${pages}&skip=${0}`;
    } else if (type === 'my') {
        requestPath = `/post/${accountname}/userpost`;
    } else if (type === 'feed') {
        requestPath = '/post/feed';
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
    const postList = json.posts;

    return postList;
}
