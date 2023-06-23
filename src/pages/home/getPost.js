import { URL } from '../../lib/apis/constant/path';

export default async function getPost(category, accountname, pages) {
    console.log(accountname);
    const type = category;
    let requestPath = '/post';

    if (type === '') {
        requestPath = `/post/?limit=${pages}&skip=0`;
    } else if (type === 'my') {
        requestPath = `/post/testN/userpost/?limit=20&skip=0`;
    } else if (type === 'feed') {
        requestPath = `/post/feed/?limit=${pages}&skip=0`;
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
