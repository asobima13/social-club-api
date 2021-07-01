const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

dotenv.config();
const app = express();

// Mongodb Connection
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to MongoDB!')
})

// Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

// Routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

app.listen(8800, () => {
    console.log('Backend server is running!')
})