const mongoose = require('mongoose');


const connectDb =async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/vedio-call')
        console.log('Db connected sucessfully')
    } catch (error) {
        console.log('error coonecting db',error)
    }
}
module.exports = connectDb;