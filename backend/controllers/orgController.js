import asyncHandler from 'express-async-handler'
import Org from '../models/orgModel.js'
import fileUpload from 'express-fileupload'
import Role from '../models/roleModel.js';
import { ErrorHandler } from '../middleware/errorMiddleware.js';
import User from '../models/userModel.js';

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

   // before deleting check that is is used or not with other entity 
   // have to experiment wity mongoose delete pre hook that may be use full in this case
    try {
      const  findTheExistingOrgInRoles = await Role.find({'organization.orgId':req.params.id})
   
      const  findTheExistingOrgInUsers = await User.find({'organization.orgId':req.params.id})
      if(findTheExistingOrgInRoles.length>0 ||  findTheExistingOrgInUsers.length>0){
         return res.status(400).json({success:false,message:'organization can not be deleted since it is in used'})
      }
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
