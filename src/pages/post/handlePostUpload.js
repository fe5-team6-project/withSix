import { URL } from '../../lib/apis/constant/path';

export default async function handlePostUpload(content, image) {
    const requestPath = '/post';
    const requestUrl = `${URL}${requestPath}`;

    const token = localStorage.token;
    const bearerToken = `Bearer ${token}`;

    const formData = {
        post: {
            content: content,
            image: image,
        },
    };

    const result = {
        state: false,
        message: String,
    };

    const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
            Authorization: bearerToken,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const json = await response.json();
}
