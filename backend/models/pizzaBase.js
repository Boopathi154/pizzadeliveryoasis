const mongoose=require('mongoose');
const pizzaBase=new mongoose.Schema({
    name:{
        type:String,
    },
    quantity: {
        type: Number,
    }
})
module.exports=mongoose.model('pizzaBase',pizzaBase)