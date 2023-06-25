import { BASE_URL } from '../../lib/apis/constants';

export default function handleImagePreview(e) {
    const images = e.target.files;
    const imageUrl = `${BASE_URL}/${images[0].lastModified}`;
    console.log(images);

    if (!images.length) return;

    return [URL.createObjectURL(images[0]), imageUrl];
}
