const express = require("express");
const app = express();
const connectDB = require("./config/db");
const Router = require("./routes/index.js")


const passport = require('passport')

const { initializePassport } = require('./config/passport.js')

const cookieParser = require('cookie-parser');



const bodyParser = require('body-parser');
    

//initializing the passport js 
initializePassport(passport)

//middlewares
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())



app.use(Router)

const PORT = 8000
connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server runnning ${PORT}`);
    })
}).catch((error)=>{
    console.log(error);
})