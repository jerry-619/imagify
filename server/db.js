const mongoose = require('mongoose');

const ConnectDB = async () => {
    try{
        const conn = await mongoose.connect(
       'mongodb+srv://admin:imagify12@imagify.n39jt4d.mongodb.net/saved?retryWrites=true&w=majority&appName=imagify');
    console.log(`MongoDB Connected!!!`);
    }catch (error){
        console.error(error);
        process.exit(1);
    }
};

module.exports = ConnectDB;