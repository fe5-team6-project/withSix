export default function checkAleadyUseId(prevId, nextId) {
    if (prevId === nextId) {
        return false;
    }

    return true;
}
