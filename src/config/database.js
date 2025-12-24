const mongoose = require('mongoose');
const uri = "mongodb+srv://mdazadabdullah:Ntorq3908@namastedev.nzio25q.mongodb.net/?appName=namasteDev";
const connectDB = async () => {
    await mongoose.connect(uri);
};

module.exports = connectDB;
