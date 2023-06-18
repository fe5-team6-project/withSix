import { DEFAULT_IMAGE } from '../../lib/apis/constant/path';

export default async function handleFileUpload(event) {
    const img = document.querySelector('#profile_image');
    const formData = new FormData();
    const profileImage = event.target.files[0];

    const uploadPath = `${URL}/image/uploadfile`;

    if (!profileImage) {
        img.src = DEFAULT_IMAGE;
        return false;
    }

    formData.append('image', profileImage);

    const response = await fetch(uploadPath, {
        method: 'POST',
        body: formData,
    });

    const json = await response.json();
    const profileImageSrc = `${URL}/${json.filename}`;

    img.src = profileImageSrc;
    console.log(img.src);
    return true;
}
