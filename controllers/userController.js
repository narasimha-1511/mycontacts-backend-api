const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//@desc login
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler( async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){

        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },  
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"},
        );

        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("password is not valid")
    }
});

//@desc register
//@route POST /api/users/register
//@access public
const RegisterUser = asyncHandler( async (req,res)=>{6
    const {username,email,password}=req.body;
    if(!username || !email ||!password){
        res.status(400)
        throw new Error ("All Fields are Mandatory");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400)
        throw new Error ("User Already Exists");
    }

    //Encrypt The Password
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,email,password:hashedPassword
    })
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    }else{
        res.status(400);
        throw new Error("User Data is not Valid")
    }
});

//@desc Current Information
//@route GET /api/users/current
//@access private 
const CurrentUser = asyncHandler( async (req,res)=>{
    res.json(req.user);
});

module.exports = {loginUser,RegisterUser,CurrentUser};