const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phno:{
        type:String,
        required:true,
        unique:true
    }
})

// UserSchema.pre('save', async function(next) {
//     if(this.isModified('passowrd')){
//         this.password = await bcrypt.hash(this.password,10)
//     }

//     next()
// })

module.exports = mongoose.model('User',UserSchema)