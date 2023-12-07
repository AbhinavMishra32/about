const express = require('express');
const path = require("path");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
app.use(express.json({limit: '1mb'}));
const User = require('./model/user');

const uri = process.env.API_KEY;

const PORT = process.env.PORT || 3000
mongoose.set('strictQuery', false);
app.use(express.static('public'));


async function start(){
  try{
    await mongoose.connect(uri);
    app.listen(PORT, () => {
      console.log("Connected to MongoDB")
      console.log(`App listening at ${PORT}`)
    })
  }
  catch(err){
    console.log(err.message);
  }
}

start();

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');

app.use('/', indexRouter);
app.use('/login', loginRouter);


// app.post('/api/register', async (req, res)=>{
//   User
//   res.json({status: 'OK'});
// })




