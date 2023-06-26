import {
    FAIL_ALEADY_EMAIL,
    FAIL_ALEADY_ID,
    FAIL_CHECK_PASSWORD,
    FAIL_FORM_EMAIL,
    FAIL_FORM_ID,
    FAIL_FORM_PASSWORD,
    FAIL_LENGTH_PASSWORD,
    FAIL_LENGTH_TITLE,
    FAIL_NULL_CONTENT,
    FAIL_NULL_EMAIL,
    FAIL_NULL_ID,
    FAIL_NULL_NAME,
    FAIL_NULL_PASSWORD,
    FAIL_NULL_PRICE,
    FAIL_NULL_TITLE,
} from '../../apis/constant/message';
import {
    REG_EXP_EMAIL,
    REG_EXP_ID,
    REG_EXP_PASSWORD,
} from '../../apis/constant/regexp';
import { checkDuplicationEmail, checkDuplicationId } from './checkDuplication';

const result = {
    state: false,
    message: String,
};

export const validationLogin = (email, password) => {
    const lenEmail = email?.length;
    const lenPassword = password?.length;

    if (!lenEmail || !email) {
        result.state = false;
        result.message = FAIL_NULL_EMAIL;
        return result;
    }
    if (!lenPassword || !password) {
        result.state = false;
        result.message = FAIL_NULL_PASSWORD;
        return result;
    }

    result.state = true;
    return result;
};

export const validationEmail = async (email) => {
    const length = email?.length;

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
    const length = password?.length;
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
    const length = id?.length;

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

export const validationTogether = (itemName, price, link) => {
    const lenItemName = itemName?.length;
    // const lenPrice = price?.length;
    // 숫자여서 length 안되기때문에 처음부터 문자열로 받고 유효성넣어도됨
    const lenLink = link?.length;
    const [minLen, maxLen] = [2, 15];

    if (!lenItemName || !itemName) {
        result.state = false;
        result.message = FAIL_NULL_TITLE;
        return result;
    }

    if (lenItemName < minLen || maxLen < lenItemName) {
        result.state = false;
        result.message = FAIL_LENGTH_TITLE;
        return result;
    }

    if (!price) {
        result.state = false;
        result.message = FAIL_NULL_PRICE;
        return result;
    }

    if (!lenLink || !link) {
        result.state = false;
        result.message = FAIL_NULL_CONTENT;
        return result;
    }

    result.state = true;
    return result;
}