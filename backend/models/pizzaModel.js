const mongoose=require('mongoose');

const pizzaModel=new mongoose.Schema({
    title:{
        type:String,
    },
    photo:{
        type:String
    },
    price:{
        type:Number
    },
    discount:{
        type:Number
    },
    titleDescription:{
      type:String  
    },
    description:{
        type:String
    },
    isCustomizable:{
        type:String,
    },
    base:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'pizzaBase'
    }],
    chesse:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"pizzaChesse"
    }],
    sauce:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"pizzaSauce"
    }],
    veg:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'pizzaVeg'
    }]
},{
    timestamps:true
})
module.exports=mongoose.model("pizzaItem",pizzaModel)