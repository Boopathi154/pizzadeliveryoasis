const mongoose = require('mongoose');
const pizzaChesse = new mongoose.Schema({
    name: {
        type: String,
    },
    quantity: {
        type: Number,
    }
})
module.exports = mongoose.model('pizzaChesse', pizzaChesse)