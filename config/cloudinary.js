const cloudinary = require('cloudinary').v2;
require('dotenv').config();

let name = process.env.CLOUD_NAME;
let key = process.env.CLOUD_KEY;
let secret = process.env.CLOUD_SECRET;

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: name,
            api_key: key,
            api_secret: secret,
        });
    } catch (error) {
        console.log(error);
    }
}