var jwt = require('jsonwebtoken');
require('dotenv').config({path:'../config/.env'})

const isAuth=(req,res,next)=>{
    const token =req.headers["authorization"]
    if(!token){
        return res.status(401).send({errors:[{msg:"you are not authorized"}]})
    }
    try {
        var decoded = jwt.verify(token, process.env.mySecrete);
        req.user=decoded
        next()
    } catch (error) {
        return res.status(500).send('server error')
        
    }

}
module.exports=isAuth