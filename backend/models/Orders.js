const mongoose = require('mongoose')

const OrdersModel = mongoose.model('Order',{
    userId: { type: String, required: true }, // User ID directly from localStorage
    username: { type: String, required: true }, // Username of the user
    items: [
      {
        id: { type: Number, required: true }, // Unique item identifier
        name: { type: String, required: true }, // Item name
        price: { type: Number, required: true }, // Price per unit
        quantity: { type: Number, required: true }, // Quantity of the item
      }
    ],
    totalAmount: { type: Number, required: true },
},{timestamps : true});

module.exports = OrdersModel;
