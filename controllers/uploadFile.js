const File = require('../models/file');
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req, res) => {
    try {
        //fetch the file
        const file = req.files.file;
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path : ", path);

        //move the file to desired path
        file.mv(path, (err) => {
            if(err){
                console.log(err);
            }
        });
        res.status(200).json({
            message: "File uploaded successfully !!",
            success: true,
        })
        
    } catch (error) {
        console.log(error);
    }
}

function isSupportedFileType(type, supportedType){
    return supportedType.includes(type);
}

async function uploadToCloudinary(file, folder){
    const options = {folder};
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//uploading image to cloud
exports.imageUpload = async(req, res) => {
    try {
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        const file = req.files.imageFile;
        console.log(file);
        const supportedFiles = ["png", "jpeg", "jpg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if(!isSupportedFileType(fileType, supportedFiles)){
            return res.status(400).json({
                success: false,
                message: "Not supported file type !!",
            });
        }
        //file format is supported
        const response = await uploadToCloudinary(file, "test");
        console.log(response);

        //saving entry to DB
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url,
        })

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully !!",
            file: fileData,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong !!",
            error: error,
        });
    }
}