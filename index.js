const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const multer = require('multer')
const path = require('path')

dotenv.config();
const app = express();

// Mongodb Connection
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to MongoDB!')
})

// cb(null, file.originalname)
// Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

// Local path config
app.use("/images", express.static(path.join(__dirname, "public/images")))

// Upload file config
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
            cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        console.log(req.file)
        cb(null, req.file)
    }
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully!")
    } catch (err) {
        console.log(err)
    }
})

// Routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

app.listen(8800, () => {
    console.log('Backend server is running!')
})