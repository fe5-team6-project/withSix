import { DEFAULT_IMAGE_BOARD } from '../../../apis/constant/path';

export function validationContentImage(image) {
    let src = image;

    if (!src) {
        src = undefined;
        return src;
    }

    if (!src.includes('api')) {
        src = `${URL}/${src}`;
        return src;
    }

    if (src.includes('api')) {
        src = undefined;
        return;
    }

    if (src.split('://').length > 2) {
        src = undefined;
        return;
    }

    return src;
}

export function emptyContentImage(e) {
    e.currentTarget.style.display = 'none';
}

export function handleErrorImg(e) {
    e.target.src = DEFAULT_IMAGE_BOARD;
}
