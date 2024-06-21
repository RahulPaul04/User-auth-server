const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', async(req,res)=>{
    console.log(req.body);
    let {firstname,lastname,email,password,phno} = req.body
    password  = await bcrypt.hash(password, 10)


    try {
        console.log("in herre register");
        let user = await User.findOne({email})
        let ph = await User.findOne({phno})
        if(user){
            return res.status(400).json({message:"Email already registered"})
        }
        else if (ph){
            return res.status(400).json({message:"Phone Nnumber already registered"})
        }


        user = new User({firstname,lastname,email,password,phno})
        await user.save()

        res.status(201).json({message:"User Registered Successfully"})



    }
    catch(err) {
        console.log("register error",err);
        res.status(500).json({message:"Server error"})
    }
})


router.post('/login', async(req,res)=>{
    console.log(req.body);
    const {email,password} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)


    try {

        console.log("in here password");
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }


        console.log("userpassword",user.password);
        console.log("current password",password,hashedPassword);

        const passmatch = bcrypt.compare(user.password,hashedPassword)
        console.log("passmatch",passmatch);
        if(!passmatch){
            return res.status(400).json({message:"Invalid Credentials"})
        }
         console.log("curent user",user);
        const token = jwt.sign({userId:user._id},'jwt-secret-key',{expiresIn:'1h'})
        res.json({token})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"})
    }
})

module.exports = router