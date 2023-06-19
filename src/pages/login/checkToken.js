export default function checkToken() {
    const token = localStorage.token;

    if (!token) {
        return false;
    }

    return true;
}
