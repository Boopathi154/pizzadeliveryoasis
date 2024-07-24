const mongoose=require('mongoose');

const address=new mongoose.Schema({
    floor:{
        type:String,
    },
    area:{
        type:String
    },
    city:{
        type:String,
    },
    pincode:{
        type:Number
    },
},
{
    timestamps:true
})
module.exports=mongoose.model("Address",address)