const mongoose = require('mongoose')

const DishesModel = mongoose.model('Dishes', {
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type: Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    }
})

module.exports = DishesModel;