const express =require('express')
const app=express()
const connectDB=require('./config/db')
const authRoutes=require('./routes/auth')
const postRoutes=require('./routes/post')

connectDB()
//middleware
app.use(express.json())
app.use('/api/auth',authRoutes)

app.use('/api/post',postRoutes)










const port=5000
app.listen(port,()=>console.log(`server runing en port ${port}`))