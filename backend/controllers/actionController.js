import asyncHandler from 'express-async-handler'
import Action from '../models/actionModel.js'

// create 
export const createAction = asyncHandler(async(req,res,next)=>{
    try {
    const action = await Action.create(req.body);
       res.status(201).json({success:true,action})
    } catch (error) {
        res.status(500).json(error)
    }
 })

 // get action by ID

 export const getActionById = asyncHandler(async(req,res,next)=>{
    try {
    const actionItem = await Action.findById(req.params.id);
       res.status(200).json({success:true,data:actionItem})
    } catch (error) {
        res.status(500).json(error)
    }
 })

 // get all action 
 export const getAllAction = asyncHandler(async(req,res,next)=>{
    try {
    const actions = await Action.find();
       res.status(200).json({success:true,data:actions})
    } catch (error) {
        res.status(500).json(error)
    }
 })

 // delete action by ID 

 export const deleteActionById = asyncHandler(async(req,res,next)=>{
    try {
     await Action.findByIdAndDelete(req.params.id);
       res.status(200).json({success:true,message:'action has been deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
 })

  // update action by ID 

export const  updateActionById = asyncHandler(async(req,res,next)=>{
    try {
        const action = await Action.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
          res.status(201).json({success:true,action})
       } catch (error) {
           res.status(500).json(error)
       }
})
