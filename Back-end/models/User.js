const mongoose=require('mongoose')
const schema=mongoose.Schema

const userSchema=new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    phone:{
        type:String
        
    },
    fonction:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        required:true,
        
    },
    pays:{
        type:String
       
        
    },
   imageURL:{
        type:String
       
        
    }
    

})

module.exports=mongoose.model('User',userSchema)