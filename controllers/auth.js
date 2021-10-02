const User = require('../models/User');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const bcrypt = require('bcrypt');

async function run(){


const saltRounds = 10;
const myPlainTextPassword = 'abcd';


const salt = await bcrypt.genSalt(saltRounds);
const hash = await bcrypt.hash(myPlainTextPassword, salt);




console.log(hash);


}


//TODO: make a function to check if email exist or not



async function  checkEmailExist(email){

    try{
        
    let user = await User.findOne({ email })
    console.log(user);
    if(user) return {success: true, user};
    return { success: false, user };
    }
    catch(ex) {}

    
};



//TODO: signUp function


exports.signUp = async(req,res) => {
    
    const {success: emailExists, user: existingUser } = await checkEmailExist(

        req.body.email
    );
    console.log(User)
    if (!!emailExists) {
        return res.status(400).json({
            success: true,
            message: "email already exists"
        })
    }

    
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const password = await bcrypt.hash(req.body.password, salt)
    req.body.encrpted_password = password
    const user = new User(req.body)
    const newUser = await user.save();
    
    const token = user.generateAuthToken()
    return res.status(200).send({token})

}


//TODO: signIn function

exports.signIn = async(req,res) => {
    const {email, password } = req.body;

    const { success: emailExists, user } = await checkEmailExist(email);
    console.log(user, emailExists)
    if(!emailExists) {
        return res.status(400).json({success: false, message: "email does not exist"})
    }
    console.log(password, user.encrpted_password, password === user.encrpted_password);

    const isPasswordSame =await bcrypt.compare(password, user.encrpted_password )
    if(isPasswordSame){

        const token = user.generateAuthToken()

        return res.status(200).json({ success: true, message: 'login successfully', token})
    }
    return res.status(200).json({ success: true, message: 'invalid password'})
} 

