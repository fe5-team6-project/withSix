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
        result.message = FAIL_NULL_EMAIL;
        return result;
    }
    if (!lenPassword) {
        result.message = FAIL_NULL_PASSWORD;
        return result;
    }

    result.state = true;
    return result;
};

export const validationEmail = async (email) => {
    const length = email.length;

    if (!length) {
        alert(FAIL_NULL_EMAIL);
        return false;
    }

    if (!REG_EXP_EMAIL.test(email)) {
        alert(FAIL_FORM_EMAIL);
        return false;
    }

    if (!(await checkDuplicationEmail())) {
        alert(FAIL_ALEADY_EMAIL);
        return false;
    }

    return true;
};

export const validationPassword = (password) => {
    const length = password.length;
    const [minLen, maxLen] = [6, 16];

    if (!length) {
        alert(FAIL_NULL_PASSWORD);
        return false;
    }

    if (maxLen < length || length < minLen) {
        alert(FAIL_LENGTH_PASSWORD);
        return false;
    }

    if (!REG_EXP_PASSWORD.test(password)) {
        alert(FAIL_FORM_PASSWORD);
        return false;
    }

    return true;
};

export const validationId = async (id) => {
    const length = id.length;

    if (!length) {
        alert(FAIL_NULL_ID);
        return false;
    }

    if (!REG_EXP_ID.test(id)) {
        alert(FAIL_FORM_ID);
        return false;
    }

    if (!(await checkDuplicationId())) {
        alert(FAIL_ALEADY_ID);
        return false;
    }

    return true;
};

export const validationCheckPassword = (password, password2) => {
    const length = password.length;
    const length2 = password2.length;

    if (!length || !length2) {
        alert(FAIL_NULL_PASSWORD);
        return false;
    }

    if (password !== password2) {
        alert(FAIL_CHECK_PASSWORD);
        return false;
    }

    return true;
};

export const validationName = (name) => {
    const length = name.length;

    if (!length) {
        alert(FAIL_NULL_NAME);
        return false;
    }

    return true;
};
