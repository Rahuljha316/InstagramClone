const mongoose = require('mongoose');
const config = require('../config/config.json')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ' ',
        maxlength: 40
    },
    userName: {
        type: String,
        required: true,
        maxlength: 40
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    bio: {type: String,
    trim: true
    },
    encrpted_password: {
        type: String,
        required: true
    }
},
    {timestamps: true}

);


userSchema.methods.generateAuthToken = function (){
    let token = jwt.sign({ name: this.name, userName: this.userName, email: this.email }, config.jwtPrivateKey );
    return token

}

//const User = mongoose.model('User', userSchema);
// exports.User = User;
module.exports= mongoose.model('User', userSchema);


