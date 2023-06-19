import { DEFAULT_IMAGE } from '../../lib/apis/constant/path';

export function checkProfileImage(image) {
    let src = image;
    console.log(image);

    if (!src) {
        src = DEFAULT_IMAGE;
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

    if (!src.includes('api') && !src.includes('Ellipse')) {
        src = `${URL}/${src}`;
        return src;
    }

    return src;
}

export function emptyImage(e) {
    e.currentTarget.style.src = DEFAULT_IMAGE;
}
