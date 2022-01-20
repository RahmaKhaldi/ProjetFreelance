const express=require('express')
const User = require('../models/User')
const Post = require('../models/Post')
const isAuth = require('../middleware/isAuth')
const router=express.Router()
require('dotenv').config({path:'../config/.env'})

//test

router.get('/test',(req,res)=>{
res.send('test')
})
//@ url:api/post/addPost
//@ methode post
//@ req.body
router.post('/addPost',async(req,res)=>{
    const { content,date,etat}=req.body
   
    try {   
       const post=new Post({
        content,date,etat,userId:req.user.id
       })
       await post.save()
       res.status(200).send({msg:"post added",post})
    
    
  } catch (error) {
    res.status(500).send(error)
    console.log(Error)
      
  }
    })


//@ url:api/post/allPosts
//@ methode get
//@ req.headers
router.get('/allPost',async(req,res)=>{
 try {
   const posts=await Post.find().populate('user',"name")
   res.send(posts)
  
 } catch (error) {
  res.status(500).send('server error')
  console.log("error")
    
 }
  })

module.exports=router