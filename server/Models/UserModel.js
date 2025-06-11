const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Useremail:{
        type:String,
        required:true,
        unique:true
    },
    Userpassword:{
        type:String,
        required:true
    },
    Userimage:{
        type:String,
        required:false
    },
    Userphone:{
        type:String,
        required:true
    },

    isAdmin: { type: Boolean, default: false },

})


module.exports = mongoose.model('User',UserSchema)