import { URL } from '../../lib/apis/constant/path';

export async function handleMultiImageUpload(imagesSrc) {
    const formData = new FormData();
    const uploadPath = `${URL}/image/uploadfiles`;
    const uploadImages = [];

    const result = {
        state: false,
        message: String,
    };

    if (!imagesSrc?.length) {
        return undefined;
    }

    for (const item of imagesSrc) {
        formData.append('image', item);

        const response = await fetch(uploadPath, {
            method: 'POST',
            body: formData,
        });
        const json = await response.json();
        uploadImages.push(`${URL}/${json[0].filename}`);
    }

    return uploadImages.join(',');
}
