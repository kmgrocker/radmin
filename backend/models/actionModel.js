import mongoose from "mongoose";

const actionSchema = mongoose.Schema({
    actionname:{
        type:String,
        required:true
      }
},{timestamps: true});


const Action = mongoose.model('Action',actionSchema)

export default Action