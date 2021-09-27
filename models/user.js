const mongoose = require('mongoose');

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

//const User = mongoose.model('User', userSchema);
// exports.User = User;
module.exports= mongoose.model('User', userSchema);
