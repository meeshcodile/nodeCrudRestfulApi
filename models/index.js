const mongoose = require('mongoose')
const {Schema} = mongoose


const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports = user = mongoose.model('user', userSchema)