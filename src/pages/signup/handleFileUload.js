import { DEFAULT_IMAGE, URL } from '../../lib/apis/constant/path';

export default async function handleFileUpload(e) {
    const img = document.querySelector('#profile_image');
    const formData = new FormData();
    const profileImage = e.target.files[0];

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
    return profileImageSrc;
}
