import { FAIL_ACCESS } from '../../lib/apis/constant/message';
import { URL } from '../../lib/apis/constant/path';
import { PostProps } from '../../lib/utils/interface/interface';

export default async function getPost({ ...props }: PostProps) {
    const category = props.category;
    let requestPath = '/post';

    if (props.isMyPost) {
        if (category === '') {
            requestPath = `/post/?limit=10&skip=${props.skip}`;
        } else if (category === 'my') {
            requestPath = `/post/${props.accountname}/userpost/?limit=10&skip=${props.skip}`;
        } else if (category === 'feed') {
            requestPath = `/post/feed/?limit=10&skip=${props.skip}`;
        }
    } else {
        requestPath = `/post/${props.accountname}/userpost/?limit=10&skip=${props.skip}`;
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
            body: JSON.stringify(Response),
        });

        const json = await response.json();
        const postList = json.posts || json.post || [];

        return postList;
    } catch (e) {
        console.error(e);
        alert(FAIL_ACCESS);
    }
}
