const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const logger = require('morgan')
const port = 3000
const bodyParser = require('body-parser')

// =================database connection=============
mongoose.connect("mongodb://localhost/restapi", { useUnifiedTopology: true, useNewUrlParser:true, useCreateIndexes:false })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch(err => {
    console.log(err);
  });

//  ============body-parser and morgan middleware configuration============
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}))

// ======================route-grouping===============
const defaultRoute = require('./routes/index')
const PersonRoute = require('./routes/Person')
const userRoute = require('./routes/user')

app.use("/", defaultRoute);
app.use(PersonRoute);
app.use(userRoute);

// ==================rendering middlewares==========
app.use((req, res,next)=>{
    console.log(`${new Date().toString()} ==> this is the url ${req.originalUrl}`)
    next()
})

// ====error 404 handler middleware=============
app.use((req,res, next)=>{
    res.status(404).send('the page you are looking for is not found please return to the home page')
    next()
})


//==========error 500 handler====
app.use((err, req, res, next)=>{
    console.log(err.stack)
    res.sendFile(path.join(__dirname, './public/error500.html'))
    
})
// ---------------app listening to port 3000-----------
app.listen(port,(req, res)=>{
    console.log('server connected at ' + port)
})