const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    "message":String,
    "userId":{type:mongoose.Types.ObjectId, required:true}
});

// Create a User model based on the userSchema
const Post = mongoose.model('Post', postSchema);

// Export the User model for use in other parts of your application
module.exports = Post;