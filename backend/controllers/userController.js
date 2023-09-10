import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { ErrorHandler } from "../middleware/errorMiddleware.js";
import Org from "../models/orgModel.js";

// create
export const createuser = asyncHandler(async (req, res, next) => {

  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist && (userExist.email === req.body.email)) {
      res.status(400);

      return res.status(400).json({success:false,message:"User with this email Already Exist"});
    }
    const orgItem = await Org.findById(req.body.organization);
    const user = await User.create({
      ...req.body,
      organization: { name: orgItem.name, orgId: orgItem._id },
    });
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get by ID

export const getUserById = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const {firstname,lastname,email,roles,_id} = user
    res.status(200).json({ success: true, data: {_id,firstname,lastname,email,roles,organization:user.organization.name} });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all
export const getAllUsers = asyncHandler(async (req, res, next) => {
    const userResponse =[]
  try {
    const users = await User.find();
    users.forEach(user=>{
        const {firstname,lastname,email,roles,_id} = user
        userResponse.push({_id,firstname,lastname,email,roles,organization:user.organization.name})
    })
    res.status(200).json({ success: true, data: userResponse });
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete by ID

export const deleteUserById = asyncHandler(async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "user has been deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// update by ID

export const updateUserById = asyncHandler(async (req, res, next) => {
  try {
    const orgItem = await Org.findById(req.body.organization);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: {...req.body,organization:{name:orgItem.name,orgId:req.body.organization}} },
      { new: true }
    );
    const {firstname,lastname,email,roles,_id} = user
    res.status(201).json({ success: true, data:{_id,firstname,lastname,email,roles,organization:user.organization.name}});
  } catch (error) {
    res.status(500).json(error);
  }
});
