const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const path = require("path")
const {ConnectDb} = require('./Config/Db')
const UserRoute = require('./Routes/UserRoute')
const ChefRoute = require('./Routes/ChefRoute')
const FoodRoute = require('./Routes/FoodRoute')
const CartRoute = require('./Routes/CartRoute')
const OrderRoute = require('./Routes/OrderRoute')
const ReservationRoute = require('./Routes/ReservationRoute')
const ContactRoute = require('./Routes/ContactRoute')



const app = express()


app.use(express.json());
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/users',UserRoute)
app.use('/api/chefs',ChefRoute)
app.use('/api/foods',FoodRoute)
app.use('/api/carts',CartRoute)
app.use('/api/orders',OrderRoute)
app.use('/api/reservations',ReservationRoute)
app.use('/api/contacts',ContactRoute)








app.listen(process.env.PORT,()=>{
    ConnectDb()
    console.log(`Server is Running on OnlineFoodDelivery : ${process.env.PORT}`)
})