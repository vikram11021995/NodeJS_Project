const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserModel = require("./models/user.model");
const PostModel = require("./models/post.model");
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;
// Successful connection
db.on('connected', () => {
    console.log('Connected to MongoDB');
});
  
// Connection error
db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Use body-parser middleware to parse URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/user",(req,res)=>{
    console.log("Inside GET user api")
    res.send("ok")
})

app.post("/user",async (req,res)=>{
    try{
        console.log("Inside POST user api");
        const {name,email,pwd}=req.body;
        const userFound = await UserModel.findOne({"email":email});
        if(! userFound) {
            const newUser = new UserModel({
                "name":name,
                "email":email,
                "password":pwd
            });
            await newUser.save();
            console.log("Newly created user", newUser);
            res.status(201).send(newUser)
        } else {
            res.json({"message":"User exist","user":userFound})
        }
    } catch(err){
        console.log("Error in API : ",err);
        res.status(500).send(err);
    }
})

app.post("/post",async (req,res)=>{
    try{
        console.log("Inside POST user api");
        const {message,userId}=req.body;
        const newPost = new PostModel({
            "message":message,
            "userId":new mongoose.Types.ObjectId(userId)
        });
        await newPost.save();
        console.log("Newly created post", newPost);
        res.status(201).send(newPost)
    } catch(err){
        console.log("Error in API : ",err);
        res.status(500).send(err);
    }
})

app.listen(8080,()=>{
    console.log("Server started on port 8080")
});