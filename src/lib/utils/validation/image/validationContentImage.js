import togetherImg from '../../../../assets/images/togetherImg.png'

export function validationContentImage(image) { }

export function emptyContentImage(e) {
    e.currentTarget.style.display = 'none';
}

export function handleErrorImg(e) {
    e.target.src = togetherImg;
}