export function ValidContent(content, postImg) {
    if (content.length === 0 && postImg.length === 0) {
        return false
    } else {
        return true
    }
}

export function ValidLength(fileUrls) {
    if (fileUrls.length > 3) {
        return true
    }else {
        return false
    }
}