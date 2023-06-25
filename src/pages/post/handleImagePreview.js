export default function handleImagePreview(e) {
    const image = e.target.files[0];
    console.log(image);

    if (!image) return;

    const preview = URL.createObjectURL(image);
    const result = [preview, image];

    return result;
}
