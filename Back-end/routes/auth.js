const express=require('express')
const User = require('../models/User')
const router=express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config({path:'../config/.env'})
const { validator,registerRules ,loginRules}= require('../middleware/validator');
const isAuth = require('../middleware/isAuth');
const upload = require('../middleware/uploadImage');

//test

router.get('/test',(req,res)=>{
res.send('test')
})
//@ url:api/auth/signup
//@ methode post
//@ req.body
router.post('/signup',[registerRules,validator],async(req,res)=>{
    const {name,email,password,phone,fonction,role,pays}=req.body
   let imageURL=""
    if(req.file){
      imageURL=req.file.filename
    }
    try {
      //check user exist
      const user=await User.findOne({email})
      if(user)
      {
        return res.status(400).send({errors:[{msg:"email already exists!"}]})        
      }
          const newUser=new User({
            name,email,password,phone,fonction,role,pays,imageURL
        })
        //hash password
      const salt=10
      const hashpassword=await bcrypt.hash(password,salt)
      newUser.password=hashpassword  
  
        await newUser.save()
        //token
        const payload={
          id:newUser._id
        }
        var token = jwt.sign(payload, process.env.mySecrete,{expiresIn:'3d'});
        res.send({msg:"user added",newUser,token})
    
  } catch (error) {
    res.status(500).send(error)
    console.log(Error)
      
  }
    })

    //@ url:api/auth/signin
//@ methode post
//@ req.body
router.post('/signin',[loginRules,validator],async(req,res)=>{
  const {email,password}=req.body
  try {
    //check user exist
    const user=await User.findOne({email})
    if(!user)
    {
      return res.status(400).send({errors:[{msg:"bad credentials !"}]})        
    }
      
      //chek password
    const salt=10
    const ismatch=await bcrypt.compare(password,user.password)
    if(!ismatch)
    {
      return res.status(400).send({errors:[{msg:"bad credentials !"}]})        
    } 

      //token
      const payload={
        id:user._id
      }
      var token = jwt.sign(payload, process.env.mySecrete,{expiresIn:'3d'});
      res.send({msg:"Signin",user,token})
      console.log(res)
  
} catch (error) {
  res.status(500).send({errors:[{msg:"bad credentials !"}]})
  console.log("error")
    
}
  })

//@ url:api/auth/current
//@ methode get
//@ req.headers
router.get('/current',isAuth,async(req,res)=>{
 try {
   const user=await User.findById(req.user.id)
   res.send(user)
  console.log(req.user)
 } catch (error) {
  res.status(500).send({errors:[{msg:"Error Server!"}]})
  console.log("error")
    
 }
  })
//@ url:api/auth/updateUser
//@ methode get
//@ req.headers

  router.put('/updateUser/:UserId', upload.single("myImage"), async(req,res)=>{
    const {UserId}=req.params
    let imageURL=req.body.imageURL
    if(req.file){
      imageURL=req.file.filename
    }
    try {
        const user= await User.findByIdAndUpdate(UserId,{$set:{...req.body,imageURL:imageURL}})
        console.log(user)
        res.status(200).send({msg:'user updated',user:user})
    } catch (error) {
        res.status(500).send({errors:[{msg:"user updated !"}]})
        console.log(error) 
    }
  })

module.exports=router