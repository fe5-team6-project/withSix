import { DEFAULT_IMAGE, URL } from '../../lib/apis/constant/path';

export function checkProfileImage(image) {
    let src = image;
    console.log(image, '<<====');

    if (!src) {
        src = DEFAULT_IMAGE;
        console.log(src, '<==== 비어있음');
        return src;
    }

    if (!src.includes('api') && !src.includes('Ellipse')) {
        src = `${URL}/${src}`;
        console.log(src, '<==== api, ellipse 없음');
        return src;
    }

    if (src.includes('api') && src.includes('Ellipse')) {
        src = DEFAULT_IMAGE;
        console.log(src, '<==== api, Ellipse 둘 다 있음');
        return src;
    }

    if (src.split('://').length > 2) {
        console.log(src.split('://'));
        src = DEFAULT_IMAGE;
        console.log(src, '<==== 주소가 두개 이상 합쳐짐');
        return src;
    }

    console.log(image, '<=== 문제없음');
    return src;
}

export function emptyProfileImage(e) {
    e.currentTarget.style.src = DEFAULT_IMAGE;
}
