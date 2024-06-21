const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/user')


const app = express()

mongoose.connect('mongodb://localhost:27017/user-auth',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`Server Running on port ${PORT}`))