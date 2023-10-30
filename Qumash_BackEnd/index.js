import { log } from "console";
import express from "express";
import jwt from "jsonwebtoken";
import { Db } from "mongodb";
import mongoose from "mongoose";
import {registerValidation} from "./validations/auth.js"
import {registerValidationPost} from "./validations/post.js"
import { validationResult } from "express-validator";
import UserModel from "./models/User.js"
import PostModel from "./models/Post.js"
import bcrypt from "bcrypt"
mongoose
.connect( 
    'mongodb+srv://admin:dastan1234@cluster0.5pu5xgz.mongodb.net/blog?retryWrites=true&w=majority')
.then(()=>console.log('DB ok!'))
.catch((err)=> console.log("DB ERROR!!!", err));
const app = express();

app.use(express.json());
app.post('/auth/login', async (req,res)=>{
    try {
        const user = await UserModel.findOne({ email: req.body.email});
        if(!user){
            return res.status(404).json({
                message: 'No User! '
            })
        } 
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if(!isValidPass){
            return res.status(404).json({
                message: 'Wrong password!'
            })
        }
        const token = jwt.sign({
            _id: user._id 
            },'secret123',{expiresIn:'30d'});
    } catch (err) {
        
    }
})


app.post('/auth/register',registerValidation, async (req,res)=>{
try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doc = new UserModel({
    email:req.body.email,
    passwordHash:hash,
    fullName:req.body.fullName,
    avatarUrl:req.body.avatarUrl
    });

    const user = await doc.save();
    const token = jwt.sign({
    _id: user._id 
    },'secret123',{expiresIn:'30d'});
    const {passwordHash, ... userData}=user._doc;
    res.json({ ... userData ,token });
     
}catch(err){
    console.log(err);
    res.status(500).json({message:'Не удалось зарегестрироваться!!!'})
}
});


app.listen(4444,(err)=>{
    if(err){
        return console.log(err);
    }
    console.log("Server OK!");
});