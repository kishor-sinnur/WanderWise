const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Typo here, should be process.env.CLOUD_NAME
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_KEY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Wanderwise_DEV',
      allowedformat: ["png", "jpg", "jpeg"] // Typo here, should be allowedFormats
    },
});

module.exports = {
    cloudinary,
    storage,
};
