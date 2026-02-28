const CLOUDINARY_CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const getMimeType = (uri) => {
    const extension = uri?.split('.').pop()?.toLowerCase();
    if (extension === 'png') return 'image/png';
    if (extension === 'webp') return 'image/webp';
    if (extension === 'heic' || extension === 'heif') return 'image/heic';
    return 'image/jpeg';
};

const validateCloudinaryConfig = () => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
        throw new Error('Cloudinary is not configured. Set EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME and EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET.');
    }
};

export const uploadImageToCloudinary = async (imageUri, options = {}) => {
    validateCloudinaryConfig();

    if (!imageUri) {
        throw new Error('Missing image URI for upload.');
    }

    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1) || 'upload.jpg';
    const formData = new FormData();

    formData.append('file', {
        uri: imageUri,
        type: getMimeType(imageUri),
        name: filename,
    });
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    if (options.folder) {
        formData.append('folder', options.folder);
    }

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.secure_url) {
        throw new Error(result?.error?.message || 'Failed to upload image to Cloudinary.');
    }

    return result.secure_url;
};
