import mongoose from "mongoose";

const orgSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
      },
    theme:{
        type:String,
        required:false
      },
    logo:{
        type:String,
        required:false,
        default:'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"'
      },

},{timestamps: true});


const Org = mongoose.model('Organizations',orgSchema)

export default Org