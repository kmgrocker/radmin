import asyncHandler from 'express-async-handler'
import BuisnessFunction from '../models/buisnessFunctionModel.js'

// create 
export const createBuisness = asyncHandler(async(req,res,next)=>{
    try {
    const buisness = await BuisnessFunction.create(req.body);
       res.status(201).json({success:true,buisness})
    } catch (error) {
        res.status(500).json(error)
    }
 })

 // get by ID

 export const getBuisnessById = asyncHandler(async(req,res,next)=>{
    try {
    const buisness = await BuisnessFunction.findById(req.params.id);
       res.status(200).json({success:true,data:buisness})
    } catch (error) {
        res.status(500).json(error)
    }
 })

 // get all 
 export const getAllBuisness = asyncHandler(async(req,res,next)=>{
    try {
    const buisness = await BuisnessFunction.find();
       res.status(200).json({success:true,data:buisness})
    } catch (error) {
        res.status(500).json(error)
    }
 })

 // delete by ID 

 export const deleteBuisnessById = asyncHandler(async(req,res,next)=>{
    try {
     await BuisnessFunction.findByIdAndDelete(req.params.id);
       res.status(200).json({success:true,message:'buisness function has been deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
 })

  // update by ID 

export const  updateBuisnessById = asyncHandler(async(req,res,next)=>{
    try {
        const buisness = await BuisnessFunction.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
          res.status(201).json({success:true,buisness})
       } catch (error) {
           res.status(500).json(error)
       }
})
