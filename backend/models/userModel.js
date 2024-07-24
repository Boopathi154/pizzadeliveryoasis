const mongoose=require('mongoose')
const userModel=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    }],
    isAdmin:{
        type:Boolean,
        default:false
    },token:{
        type:String
    }
})
module.exports=mongoose.model("User",userModel)