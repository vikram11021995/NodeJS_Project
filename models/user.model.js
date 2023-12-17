const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    "name":String,
    "email":{type:String, required:true},
    "password":String
});

// Create a User model based on the userSchema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of your application
module.exports = User;