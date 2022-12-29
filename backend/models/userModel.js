const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
        unique : true,
    },
    password: {
        type : String,
        required : true
    },
    type: {
        type: String,
        enum:["admin","user"],
        default: "user"
    }
})

const User = mongoose.model("users", UserSchema)

module.exports = User