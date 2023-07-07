import { URL } from '../../lib/apis/constant/path';
import { api } from '../../lib/apis/axiosConfig';
import { FAIL_ACCESS } from '../../lib/apis/constant/message';

export default async function getMyInfo() {
    const requestPath = '/user/myinfo';
    const requestUrl = `${URL}${requestPath}`;

    const result = {
        state: false,
        message: FAIL_ACCESS,
    };

    try {
        const response = await api.get(requestUrl);
        const data = await response.data;

        return data.user;
    } catch (e) {
        return [false, result];
    }
}
