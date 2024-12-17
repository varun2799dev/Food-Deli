const express = require('express')
const dishes = require('../backend/routes/dishesRoutes')
const user = require('../backend/routes/userRoutes')
const createOrder = require('./routes/OrderRoutes')
const app = express()
const port = 3000;
const mongoose = require('mongoose')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const cors = require('cors')

app.use(express.json())
app.use(cors())

async function main() {
  //replaced it with the actual MongoDB database link
    await mongoose.connect('mongodb+srv://varuntadpatri:iEX7CLHVolNWvVcr@gfg-mern.8edvs.mongodb.net/?retryWrites=true&w=majority&appName=GFG-MERN');
    console.log("MongoDb connected...")
    
}

main().catch(err => console.log(err));


app.use('/api',user)
app.use('/api',dishes)
app.use('/api',createOrder)



// const Cat = mongoose.model('Cat', {name : String});

// //Creating a DB entry---CRUD part "C"
// const kitty = new Cat({name : "Zildian"})
// kitty.save().then(()=> console.log('Meow'))

// //Reading from DB ---- CRUD part "R"
// Cat.find().then((kitten)=> console.log(kitten))

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api/api-docs', swaggerUI.serve,swaggerUI.setup(openapiSpecification));


app.listen(port, ()=>{
    console.log(`App started listening on port ${port}`)
})