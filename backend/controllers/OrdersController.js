const OrdersModel = require('../models/Orders')

const createOrder = async (req, res) => {
  try {
    console.log(req.body)
    const { orderedItems, userId, username, totalAmount } = req.body;


    // Check if orderedItems is empty
    if (!orderedItems || !Array.isArray(orderedItems) || orderedItems.length === 0) {
      return res.status(400).send('Your cart is empty');
    }

    // Calculate the total amount if not provided by the frontend
    let total = totalAmount || 0; // If totalAmount is not provided, start with 0

    if (!totalAmount) {
      // If totalAmount is not provided, we calculate the total in backend
      orderedItems.forEach(item => {
        total += item.price * item.quantity; // Multiply price by quantity for the correct total
      });
    }

    // Create the order object based on the schema
    const order = new OrdersModel({
      userId: userId,  // User ID from localStorage (sent from frontend)
      username: username,  // Username from localStorage (sent from frontend)
      items: orderedItems,  // Ordered items array
      totalAmount: total  // Total price of all items in the cart
    });

    // Save the order to the database
    const orderSave = await order.save();

    return res.status(200).json({
      order: orderSave,
      message: 'Your order has been saved successfully!'
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    return res.status(500).json({ message: 'Failed to save your order. Please try again later.' });
  }
}

module.exports = createOrder;
