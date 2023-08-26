import { DEFAULT_IMAGE_BOARD } from '../../../apis/constant/path';

export function validationContentImage(image: string | undefined) {
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

export function emptyContentImage(e: any) {
    e.currentTarget.style.display = 'none';
}

export function handleErrorImg(e: any) {
    e.target.src = DEFAULT_IMAGE_BOARD;
}
