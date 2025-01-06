const UserModel = require('../models/Users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
   try {
     const { email, password } = req.body;
 
     // Find user by email
     const user = await UserModel.findOne({ email: email });
     if (!user) {
       return res.status(400).send("User does not exist");
     }
 
     // Compare passwords
     const isPasswordMatchingfromDb = await bcrypt.compare(password, user.password);
     if (isPasswordMatchingfromDb) {
       // Generate JWT token
       const token = jwt.sign({ userId: user._id }, 'randomsecret');
 
       // Respond with user info and token
       return res.status(200).json({
         user: user, // Send the user object (be careful about sensitive data like password)
         token: token
       });
     }
 
     // Incorrect password case
     return res.status(401).send('Incorrect login credentials');
   } catch (error) {
     // Handle any unexpected errors
     console.error(error);
     return res.status(500).send('Internal server error');
   }
 };
 

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
