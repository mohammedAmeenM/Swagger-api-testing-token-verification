const mongoose =require('mongoose');


const authSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:false
    }
},{
    timestamps: true
})




const User = mongoose.model('User',authSchema);
module.exports = User;