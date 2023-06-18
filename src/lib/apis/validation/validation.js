import {
    FAIL_ALEADY_EMAIL,
    FAIL_FORM_EMAIL,
    FAIL_FORM_PASSWORD,
    FAIL_LENGTH_PASSWORD,
    FAIL_NULL_EMAIL,
    FAIL_NULL_PASSWORD,
} from '../constant/message';
import { REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../constant/regexp';

export const validationLogin = (email, password) => {
    const lenEmail = email.length;
    const lenPassword = password.length;

    if (!lenEmail) {
        alert(FAIL_NULL_EMAIL);
        return false;
    }
    if (!lenPassword) {
        alert(FAIL_NULL_PASSWORD);
        return false;
    }

    return true;
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
