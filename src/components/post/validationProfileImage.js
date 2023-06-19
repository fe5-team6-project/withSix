import { DEFAULT_IMAGE, URL } from '../../lib/apis/constant/path';

export function validationProfileImage(image) {
    let src = image;

    if (!src) {
        src = DEFAULT_IMAGE;
        return src;
    }

    if (!src.includes('api') && !src.includes('Ellipse')) {
        src = `${URL}/${src}`;
        return src;
    }

    if (src.includes('api') && src.includes('Ellipse')) {
        src = DEFAULT_IMAGE;
        return src;
    }

    if (src.split('://').length > 2) {
        console.log(src.split('://'));
        src = DEFAULT_IMAGE;
        return src;
    }

    return src;
}

export function emptyProfileImage(e) {
    e.currentTarget.style.src = DEFAULT_IMAGE;
}