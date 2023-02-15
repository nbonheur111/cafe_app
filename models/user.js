const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        umique: true,
       
    },
    name: {
        type: String,
        required: true,
   
    },
    password: {
        type: String,
        minLength: 4,
        required: true,
    }
},
{
    timestamps: true
});

const User= mongoose.model('users', userSchema);

module.exports = User;