import asyncHandler from 'express-async-handler'
import Role from '../models/roleModel.js'

// create 
export const createRole= asyncHandler(async(req,res,next)=>{
    try {
    const role = await Role.create(req.body);
       res.status(201).json({success:true,role})
    } catch (error) {
        res.status(500).json(error)
    }
 })

 // get by ID

 export const getRoleById = asyncHandler(async(req,res,next)=>{
    try {
    const role = await Role.findById(req.params.id);
       res.status(200).json({success:true,data:role})
    } catch (error) {
        res.status(500).json(error)
    }
 })

 // get all 
 export const getAllRoles = asyncHandler(async(req,res,next)=>{
    try {
    const roles = await Role.find();
       res.status(200).json({success:true,data:roles})
    } catch (error) {
        res.status(500).json(error)
    }
 })

 // delete by ID 

 export const deleteRoleById = asyncHandler(async(req,res,next)=>{
    try {
     await Role.findByIdAndDelete(req.params.id);
       res.status(200).json({success:true,message:'role has been deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
 })

  // update by ID 

export const  updateRoleById = asyncHandler(async(req,res,next)=>{
    try {
        const role = await Role.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
          res.status(201).json({success:true,role})
       } catch (error) {
           res.status(500).json(error)
       }
})
