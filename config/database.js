const mongoose = require('mongoose');
require('dotenv').config();

let url = process.env.DATABASE_URL;

exports.dbConnect = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(console.log("DB connected successfully !!"))
        .catch((err) => {
            console.log("Error connecting DB !!");
            console.error(err);
            process.exit(1);
        })
}