const User = require('../models/User');
const express = require('express');
const router = express.Router();



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

    const user = new User(req.body)
    const newUser = await user.save();
    return res.status(200).send(newUser)

}


//TODO: signIn function

// router.post('/signIn', async(req,res) => {
//     const {email, password } = req.body;

//     const { success: emailExists, user } = checkEmailExist(email);
//     if(!emailExists) {
//         return res.status(400).json({success: true, message: "email does not exist"})
//     }
// } )

