import { FAIL_NULL_CONTENT } from '../../lib/apis/constant/message';

const result = {
    state: false,
    message: String,
};

export const validPostContent = (content) => {
    const length = content.length;

    if (!length) {
        result.state = false;
        result.message = FAIL_NULL_CONTENT;
    }
};

export const validPostImage = (image) => {};
