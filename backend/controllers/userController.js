const UserModel = require('../models/Users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) =>{
   const {email, password} = req.body
   
   const user = await UserModel.findOne({email: email})

   if(!user){
      return res.status(400).send("User does not exist")
   }
   const isPasswordMatchingfromDb = bcrypt.compare(password, user.password)

   if(isPasswordMatchingfromDb){
      const token = jwt.sign({userId : user._id}, 'randomsecret')

         return res.status(200).json({
            user : savedUser,
            token: token
         })
   }
   return req.status(401).send('Incorrect login credentials');
}

const signUpUser = async (req, res)=>{
   const {name, email, password, cnf_password} = req.body
   
   if(password != cnf_password){
     return  res.status(400).send('The passwords do not match')
   }
   if(password.length < 8){
      return res.status(400).send('Password length is too short')
   }

   const userExists= await UserModel.findOne({email : email})

   if(!userExists){
      //create a user
      const hashedPassword = await bcrypt.hash(password, 10);
         
         const user = new UserModel({
            name : name,
            email : email,
            password : hashedPassword
         })

         const savedUser = await user.save()

         const token = jwt.sign({userId : savedUser._id}, 'randomsecret')

         return res.status(200).json({
            user : savedUser,
            token: token
         })

      
   }
   else{
      return res.status(400).send('User already exists!')
   }
}


module.exports = {
   loginUser,
   signUpUser
}
