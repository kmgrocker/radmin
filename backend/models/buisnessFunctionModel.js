import mongoose from "mongoose";
const buisnessFunctionSchema = mongoose.Schema({
    buisness:{
        type:String,
        required:[true,'Please enter your buisness function name'],
        maxlength:[30,'Your buisness function name can not exceed 30 characters']
    },
    parentBuisness:{
        type:String,
        required:[true,'Please enter your parent buisness function name'],
        maxlength:[30,'Your  parent buisness function can not exceed 30 characters']
    },

    actions:{
        type:[String],
        required:[true,'Please enter action'],
        maxlength:[20,'Your action can not be empty']
      },

},{timestamps: true});


const BuisnessFunction = mongoose.model('BuisnessFunctions',buisnessFunctionSchema)

export default BuisnessFunction