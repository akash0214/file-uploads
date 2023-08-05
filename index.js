const express = require('express');
const { dbConnect } = require('./config/database');
const app = express();
require('dotenv').config();
const { cloudinaryConnect } = require('./config/cloudinary');
const upload = require('./routes/fileUpload');
const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles: true,
    temp: '/tmp/'
}));

app.use(express.json());
const port = process.env.PORT || 5000;

dbConnect();
cloudinaryConnect();

app.use('/api/v1/upload', upload);

app.get('/', (req, res) => {
    res.send("You are watching homepage!!");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})