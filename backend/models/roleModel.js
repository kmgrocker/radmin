import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
    role:{
        type:String,
        required:[true,'role is required'],
        maxlength:[20,'role can not exceed 20 characters']
      },
      organization:{
        type:String,
        required:[true,'organization name is required'],
        maxlength:[20,'Your organization can not exceed 20 characters']
      },
      permissions:{
        type:[String],
        required:[true,'permissions is required'],
        maxlength:[20,'permission can not be empty']
      },

},{timestamps: true});


const Role = mongoose.model('Roles',roleSchema)

export default Role