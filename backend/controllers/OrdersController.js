const OrdersModel = require('../models/Orders')


const createOrder = async (req, res)=>{
  const [orderedItems , userId, totalAmount] = req.body;

  if(orderedItems.length === 0){
    res.send('Your cart is empty')
  }
  
  for(let i=0; i<orderedItems.length ; i++){
    totalAmount+= orderedItems[i].price
  }

  const order = new OrdersModel({
    items : [...orderedItems.name],
    orderedByUserId : userId,
    totalOrderAmount : totalAmount
})

 const orderSave = await order.save()

 return res.status(200).json({
    order : orderSave,
    message: 'Your order is saved'
 });




}

module.exports = createOrder;