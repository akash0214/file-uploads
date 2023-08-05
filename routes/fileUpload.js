const { localFileUpload, imageUpload } = require("../controllers/uploadFile");
const express = require('express');
const upload = express.Router();

upload.post('/localUpload', localFileUpload);
upload.post('/imageUpload', imageUpload);

module.exports = upload;