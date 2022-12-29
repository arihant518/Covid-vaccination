const mongoose = require('mongoose')

const centerSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        unique:true,
    },
    city: {
        type : String,
        required : true,
    },
   slots:{
    type:Object,
   } 
})

const Center = mongoose.model("centers", centerSchema)

module.exports = Center