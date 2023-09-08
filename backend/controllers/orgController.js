import asyncHandler from 'express-async-handler'
import Org from '../models/orgModel.js'
import fileUpload from 'express-fileupload'

// create 
export const createOrg= asyncHandler(async(req,res,next)=>{ 
   // dealing with base 64 which is less efficent if this file upload task is more in that case we can use multer or some other cloud storage 
   try {
      const organization = Org.create({name:req.body.name,theme:req.body.theme,logo:req.body.logo});
         res.status(201).json({success:true,organization})
      } catch (error) {
          res.status(500).json(error)
      }
   
 })

 // get by ID

 export const getOrgById = asyncHandler(async(req,res,next)=>{
    try {
    const orgItem = await Org.findById(req.params.id);
       res.status(200).json({success:true,data:orgItem})
    } catch (error) {
        res.status(500).json(error)
    }
 })

 // get all 
 export const getAllOrg = asyncHandler(async(req,res,next)=>{
    try {
    const orgs = await Org.find();
       res.status(200).json({success:true,data:orgs})
    } catch (error) {
        res.status(500).json(error)
    }
 })

 // delete by ID 

 export const deleteOrgById = asyncHandler(async(req,res,next)=>{
    try {
     await Org.findByIdAndDelete(req.params.id);
       res.status(200).json({success:true,message:'organization has been deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
 })

  // update by ID 

export const  updateOrgById = asyncHandler(async(req,res,next)=>{
    try {
        const org = await Org.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
          res.status(201).json({success:true,org})
       } catch (error) {
           res.status(500).json(error)
       }
})
