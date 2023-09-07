import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// create 
export const createuser = asyncHandler(async(req,res,next)=>{
    try {
    const user = await User.create(req.body);
       res.status(201).json({success:true,user})
    } catch (error) {
        res.status(500).json(error)
    }
 })

 // get by ID

 export const getUserById = asyncHandler(async(req,res,next)=>{
    try {
    const user = await User.findById(req.params.id);
       res.status(200).json({success:true,data:user})
    } catch (error) {
        res.status(500).json(error)
    }
 })

 // get all 
 export const getAllUsers = asyncHandler(async(req,res,next)=>{
    try {
    const users = await User.find();
       res.status(200).json({success:true,data:users})
    } catch (error) {
        res.status(500).json(error)
    }
 })

 // delete by ID 

 export const deleteUserById = asyncHandler(async(req,res,next)=>{
    try {
     await User.findByIdAndDelete(req.params.id);
       res.status(200).json({success:true,message:'user has been deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
 })

  // update by ID 

export const  updateUserById = asyncHandler(async(req,res,next)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
          res.status(201).json({success:true,user})
       } catch (error) {
           res.status(500).json(error)
       }
})
