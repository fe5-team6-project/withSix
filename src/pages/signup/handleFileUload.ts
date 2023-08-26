import { FAIL_ACCESS } from '../../lib/apis/constant/message';
import { DEFAULT_IMAGE, URL } from '../../lib/apis/constant/path';
import { INPUT_EVENT } from '../../lib/utils/type/eventType';

export default async function handleFileUpload(e: INPUT_EVENT) {
    const formData = new FormData();
    const profileImage = e.target.files![0];

    const uploadPath = `${URL}/image/uploadfile`;

    if (!profileImage) {
        e.target.src = DEFAULT_IMAGE;
        return DEFAULT_IMAGE;
    }

    formData.append('image', profileImage);

    try {
        const response = await fetch(uploadPath, {
            method: 'POST',
            body: formData,
        });

        const json = await response.json();
        const profileImageSrc = `${URL}/${json.filename}`;

        return profileImageSrc;
    } catch (e) {
        console.error(e);
        alert(FAIL_ACCESS);
    }
}
