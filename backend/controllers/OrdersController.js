const OrdersModel = require('../models/Orders')


const createOrder = async (req, res)=>{
  try {
    // Destructure orderedItems, userId, and totalAmount from the request body
    const { orderedItems, userId, totalAmount } = req.body;

    // Check if orderedItems is empty
    if (orderedItems.length === 0) {
      return res.status(400).send('Your cart is empty');
    }

    // Calculate the total amount
    let total = totalAmount || 0; // If totalAmount is not provided, start with 0

    orderedItems.forEach(item => {
      total += item.price * item.quantity; // Multiply price by quantity for the correct total
    });

    // Create the order object based on the schema
    const order = new OrdersModel({
      userId: userId, // User ID
      username: orderedItems[0].username, // Assuming username is available in the items
      items: orderedItems, // Array of ordered items
      totalAmount: total // Total price of all items in the cart
    });

    // Save the order to the database
    const orderSave = await order.save();

    return res.status(200).json({
      order: orderSave,
      message: 'Your order is saved successfully!'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to save your order' });
  }




}

module.exports = createOrder;