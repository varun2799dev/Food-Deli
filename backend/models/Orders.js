const mongoose = require('mongoose')

const OrdersModel = mongoose.model('Order',{
    items:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dishes'
    },],
    
    orderedByUserId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required : true
    },
    
    totalOrderAmount : {
        type: Number,
        required: true
    }
},{timestamps : true});

module.exports = OrdersModel;
