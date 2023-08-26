import { INPUT_EVENT } from '../../lib/utils/type/eventType';

export default function handleImagePreview(e: INPUT_EVENT) {
    const image = e.target.files![0];

    if (!image) return;

    const preview = URL.createObjectURL(image);
    const result = [preview, image];

    return result;
}
