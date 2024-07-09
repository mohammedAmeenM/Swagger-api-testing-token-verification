const bcrypt = require('bcrypt')
const User = require("../models/authSchama");
const { generateToken } = require('../utils/generateToken');


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         phoneNumber:
 *           type: number
 *       required:
 *         - name
 *         - email
 *         - password
 */

const registerUser = async (req, res) => {
  try {
    const data = req.body;
    if (!data.password) {
        return res.status(400).json({
          status: "failure",
          message: "Password is required",
        });
      }
    
    const hashedPassword = await bcrypt.hash(data.password,10)
      
    const user = new User({ ...data,password:hashedPassword });
    if (!user) {
      return res.status(400).json({
        status: "failure",
        message: "Somthing went wrong",
      });
    }
    await user.save();
   
    res.status(201).json({
      status: "success",
      message: "Successfully created user",
      user
    
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error_message: error.message,
    });
  }
};

const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(404).json({
                status:'failure',
                message:'User not found'
            })
        };
        const findPassword = await bcrypt.compare(password, user.password);
        
        if(!findPassword){
            return res.status(400).json({
                 status:'failure',
                 message:'invalied password'
            })
        };
       const token = generateToken(user._id)
        res.status(200).json({
            status:'success',
            message:'Login successfully',
            user,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Internal server error",
            error_message: error.message,
          });
    }
}

const getAllUsers =async (req,res)=>{
    try {
        const users = await User.find();
        if(!users){
            return res.status(404).json({
                status:'failure',
                message:'Users not found'
            })
        };
        res.status(200).json({
            status:'success',
            message:'Successfully fetched users',
            users
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Internal server error",
            error_message: error.message,
          });
    }
}

const getUserById = async (req,res)=>{
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
              status: "failure",
              message: "User not found",
            });
          };
        res.status(200).json({
            status:'success',
            message:'Successfully fetched user',
            user
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Internal server error",
            error_message: error.message,
          });
    }
}

module.exports = {registerUser,loginUser,getAllUsers,getUserById};
