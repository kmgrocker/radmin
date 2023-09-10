import asyncHandler from "express-async-handler";
import Role from "../models/roleModel.js";
import { isObjectIdOrHexString } from "mongoose";
import Org from "../models/orgModel.js";

// create
export const createRole = asyncHandler(async (req, res, next) => {
  try {
    const orgItem = await Org.findById(req.body.organization);

    const role = await Role.create({
      ...req.body,
      organization: { name: orgItem.name, orgId: req.body.organization },
    });
    res.status(201).json({ success: true, role });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get by ID

export const getRoleById = asyncHandler(async (req, res, next) => {
  try {
    const role = await Role.findById(req.params.id);
    res
      .status(200)
      .json({
        success: true,
        data: {
          _id: role._id,
          role: role.role,
          organization: role.organization.name,
          permissions: role.permissions,
        },
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all
export const getAllRoles = asyncHandler(async (req, res, next) => {
  const responseRoles = [];
  try {
    const roles = await Role.find();
    roles.forEach((role) => {
      responseRoles.push({
        _id: role._id,
        role: role.role,
        organization: role.organization.name,
        permissions: role.permissions,
      });
    });
    res.status(200).json({ success: true, data: responseRoles });
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete by ID

export const deleteRoleById = asyncHandler(async (req, res, next) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "role has been deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// update by ID

export const updateRoleById = asyncHandler(async (req, res, next) => {
  try {
    const orgItem = await Org.findById(req.body.organization);

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
          organization: { name: orgItem.name, orgId: req.body.organization },
        },
      },
      { new: true }
    );
    res
      .status(201)
      .json({
        success: true,
        data: {
          _id: role._id,
          role: role.role,
          organization: role.organization.name,
          permissions: role.permissions,
        },
      });
  } catch (error) {
    res.status(500).json(error);
  }
});
