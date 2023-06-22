import {
    FAIL_ALEADY_EMAIL,
    FAIL_ALEADY_ID,
    FAIL_CHECK_PASSWORD,
    FAIL_FORM_EMAIL,
    FAIL_FORM_ID,
    FAIL_FORM_PASSWORD,
    FAIL_LENGTH_PASSWORD,
    FAIL_NULL_EMAIL,
    FAIL_NULL_ID,
    FAIL_NULL_NAME,
    FAIL_NULL_PASSWORD,
} from '../constant/message';
import {
    REG_EXP_EMAIL,
    REG_EXP_ID,
    REG_EXP_PASSWORD,
} from '../constant/regexp';
import { checkDuplicationEmail, checkDuplicationId } from './checkDuplication';

const result = {
    state: false,
    message: String,
};

export const validationLogin = (email, password) => {
    const lenEmail = email.length;
    const lenPassword = password.length;

    if (!lenEmail) {
        result.state = false;
        result.message = FAIL_NULL_EMAIL;
        return result;
    }
    if (!lenPassword) {
        result.state = false;
        result.message = FAIL_NULL_PASSWORD;
        return result;
    }

    result.state = true;
    return result;
};

export const validationEmail = async (email) => {
    const length = email.length;

    if (!length) {
        result.state = false;
        result.message = FAIL_NULL_EMAIL;
        return result;
    }

    if (!REG_EXP_EMAIL.test(email)) {
        result.state = false;
        result.message = FAIL_FORM_EMAIL;
        return result;
    }

    if (!(await checkDuplicationEmail())) {
        result.state = false;
        result.message = FAIL_ALEADY_EMAIL;
        return result;
    }

    result.state = true;
    return result;
};

export const validationPassword = (password) => {
    const length = password.length;
    const [minLen, maxLen] = [6, 16];

    if (!length) {
        result.state = false;
        result.message = FAIL_NULL_PASSWORD;
        return result;
    }

    if (maxLen < length || length < minLen) {
        result.state = false;
        result.message = FAIL_LENGTH_PASSWORD;
        return result;
    }

    if (!REG_EXP_PASSWORD.test(password)) {
        result.state = false;
        result.message = FAIL_FORM_PASSWORD;
        return result;
    }

    result.state = true;
    return result;
};

export const validationId = async (id) => {
    const length = id.length;

    if (!length) {
        result.state = false;
        result.message = FAIL_NULL_ID;
        return result;
    }

    if (!REG_EXP_ID.test(id)) {
        result.state = false;
        result.message = FAIL_FORM_ID;
        return result;
    }

    if (!(await checkDuplicationId())) {
        result.state = false;
        result.message = FAIL_ALEADY_ID;
        return result;
    }

    result.state = true;
    return result;
};

export const validationCheckPassword = (password, password2) => {
    const length = password.length;
    const length2 = password2.length;

    if (!length || !length2) {
        result.state = false;
        result.message = FAIL_NULL_PASSWORD;
        return result;
    }

    if (password !== password2) {
        result.state = false;
        result.message = FAIL_CHECK_PASSWORD;
        return result;
    }

    result.state = true;
    return result;
};

export const validationName = (name) => {
    const length = name.length;

    if (!length) {
        result.state = false;
        result.message = FAIL_NULL_NAME;
        return result;
    }

    result.state = true;
    return result;
};
