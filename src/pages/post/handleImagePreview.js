export default function handleImagePreview(e) {
    const images = e.target.files;
    if (!images.length) return;

    return [URL.createObjectURL(images[0]), images[0]];
}
