const DishesModel = require('../models/Dishes')
const sendDishes = (req,res) =>{
    DishesModel.find().then((dishes)=>{
      console.log(dishes)
      res.send(dishes)
    })
}

module.exports ={
    sendDishes
}
