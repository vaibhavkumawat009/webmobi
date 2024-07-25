const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number
    },
    salt:{
        type:String
    },
    hash:{
        type:String
    },
    password:{
        type:String,
       
    }
},{ timestamps: true })

const User = new mongoose.model("user",userSchema)
module.exports = User