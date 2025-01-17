export const isValidImageUrl = (url) => {
    if (!url) return false;
    return url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null || url.includes('cloudinary.com');
};

export const getImageUrl = (url, fallback) => {
    if (isValidImageUrl(url)) {
        return url;
    }
    return fallback;
}; 