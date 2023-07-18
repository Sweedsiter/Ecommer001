//app file การใช้งาน Ejs dynamic web npm install ejs 
// app.set('views',path.join(__dirname,'views')) app.set('view engine','ejs')
const express = require('express')
const router = require('./myRouters/myrouters')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(session({secret:"mysession",resave:false,saveUninitialized:false}))

app.use(cookieParser())
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false})) 
app.use(router)
app.use(express.static(require('path').join(__dirname,'public')))

app.listen(8080,'localhost',()=>{
    console.log('start port 8080')
})