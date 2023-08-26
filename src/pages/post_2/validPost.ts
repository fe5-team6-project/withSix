import {
    FAIL_NULL_CONTENT,
    POST_UPLOAD_OK,
} from '../../lib/apis/constant/message';

const result = {
    state: false,
    message: '',
};

export const validPostContent = (contents: string) => {
    const length = contents?.length;

    if (!length) {
        result.state = false;
        result.message = FAIL_NULL_CONTENT;
        return result;
    }

    result.state = true;
    result.message = POST_UPLOAD_OK;
    return result;
};
