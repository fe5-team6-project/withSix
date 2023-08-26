export default function checkAleadyUseId(prevId: string, nextId: string) {
    if (prevId === nextId) {
        return false;
    }

    return true;
}
