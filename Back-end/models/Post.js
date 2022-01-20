const mongoose=require('mongoose')
const schema=mongoose.Schema

const postSchema=new schema({
    content:{
        type:String,
        required:true
    },
    date:{
        type:String,
       
    },
    etat:{
        type:String
        
    },
    userId:{
        type:schema.Types.ObjectId,
        ref:'User'
        
    },
    
   

})

module.exports=mongoose.model('post',postSchema)