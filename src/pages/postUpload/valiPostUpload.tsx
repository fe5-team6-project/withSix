export function ValidContent(content: string, postImg: any) {
    if (content.length === 0 && postImg.length === 0) {
        return false;
    } else {
        return true;
    }
}

export function ValidLength(fileUrls: string[]) {
    if (fileUrls.length > 3) {
        return true;
    } else {
        return false;
    }
}
