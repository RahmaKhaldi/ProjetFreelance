const{body,validationResult}=require('express-validator')
const registerRules=[
    body('name','name is required !').notEmpty(),
   // body('email','enter a valid e-mail!').isEmail(),
    body('password','password at least 6 characters!').isLength({min:6})
]
const loginRules=[
   
   // body('email','enter a valid e-mail!').isEmail(),
    //body('password','password at least 6 characters!').isLength({min:6})
]
const validator=(req,res,next)=>{
    const result =validationResult(req)
    if(!result.isEmpty()){
        return res.status(400).send({errors:result.array()})
    }
    next()
}
module.exports={registerRules,validator,loginRules}