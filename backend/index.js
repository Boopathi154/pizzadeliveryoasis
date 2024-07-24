const express=require('express');
const cors=require('cors')
const userRouter=require('./router/userRouter')
const loginRouter=require('./router/loginRouter')
const adminLoginRouter=require('./router/adminLoginRouter')
const adminPizza=require('./router/adminPizza')
const userPassword=require('./router/userPassword')
const alltype=require('./router/alltype')
const pizzaItem=require('./router/pizzaItem')
const allItem=require('./router/showItems')
const orderHandle=require('./router/orderHandle')
const cartHandle=require('./router/cartHandle')
const checkAuth=require('./router/checkAuth')
const app=express()
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const adminCheckAuth=require("./router/adminCheckAuth")
const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/pizza").then(()=>{
    console.log("Database connected")
})

app.use(express.static('uploads'));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())
app.use('/api/register',userRouter)
app.use('/api/login',loginRouter)
app.use('/api/admin/login',adminLoginRouter)
app.use('/api/admin/pizza',adminPizza)
app.use('/api/forget-password',userPassword)
app.use('/type',alltype)
app.use('/api/',pizzaItem)
app.use('/api',allItem)
app.use('/api/order',orderHandle)
app.use('/api/cart/',cartHandle)
app.use('/api/checkauth',checkAuth)
app.use('/api/admincheck',adminCheckAuth)


app.listen(8000,()=>{
    console.log("App running under 8000 port")
})