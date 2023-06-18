import { FAIL_NULL_EMAIL, FAIL_NULL_PASSWORD } from '../constant/message';

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
