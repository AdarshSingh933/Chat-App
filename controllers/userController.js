const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register controller
const registerController =async (req,res)=>{
    try{
        const exisitingUser = await userModel.findOne({email:req.body.email});
        if(exisitingUser){
            return res.status(200).send({
                success:false,
                message:'User already exist'
            })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        req.body.password = hashPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        return res.status(200).send({
            success:true,
            message:"User registered successfully"
    })
    }catch(error){
        console.log("Error in register user",error);
        return res.status(500).send({
            success:false,
            error,
            message:"Server error"
        })
    }
}

//login controller
const loginController = async(req,res)=>{
    try{
        const user = await userModel.findOne({email:req.body.email});
        if(!user){
            return res.status(200).send({
                success:false,
                message:"User doesn't found"
            });
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            return res.status(200).send({
                success:false,
                message:"Invalid Email or Password"
            })
        }
        const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        return res.status(200).send({
            message:"Login Successful",
            success:true,
            token
        });
    }catch(error){
        console.log("Error in register user",error);
        return res.status(500).send({
            success:false,
            error,
            message:"Server error"
        })
    }
}

//auth controller
const authController = async(req,res)=>{
    try{
        const user = await userModel.findById(req.body.userId);
        user.password = undefined;
        return res.status(200).send({
            success:true,
            message:"User data fetched successfully",
            data:user
        })
    }catch(error){
        console.log("Error in register user",error);
        return res.status(500).send({
            success:false,
            error,
            message:"Server error"
        })
    }
}


module.exports = {registerController,loginController,authController};