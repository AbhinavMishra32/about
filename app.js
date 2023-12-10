const express = require('express');
const app = express();
const path = require("path");
const jwt = require('jsonwebtoken');
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

require('dotenv').config();
const mongoose = require('mongoose');
//Makes mongoose only work with schema database, will not work without making a schema
mongoose.set('strictQuery', false);

//User Schema
const User = require('./model/user');
//API key 
const uri = process.env.API_KEY;
//PORT from environement
const PORT = process.env.PORT || 3000

//bcrypt js to hash passwords
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'dsa;dsalkbdaasehowbopbweobemwmgopwf#(*&@%#@!%)KFWEIJ'


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


//API ENDPOINT ROUTES:-

//Index route:
app.get('/', (req, res) =>{
  res.sendFile('index.html', {root: 'public'})

})

app.get('/register', (req, res) =>{
  // res.sendFile('public/login/login.html');
  res.sendFile(path.join(__dirname, 'public/login/register.html'));
})

app.get('/login', (req, res) =>{
  // res.sendFile('public/login/login.html');
  res.sendFile(path.join(__dirname, 'public/login/login.html'));
})

app.post('/api/register', async (req, res)=>{
  console.log(req.body);
  const {username, password: plainTextPassword} = req.body; //syntax to make variables of same name in a list and make it as seperate variable
  const password = await bcrypt.hash(plainTextPassword, 10);

  try{
      const response = await User.create({
          username,
          password
      })
      console.log("User created successfully", response);
  }
  catch(err){
      if(err.code === 11000){
          res.status(409).json({message: 'Username already exists'});
      }
      else{
          res.status(500).json({message: 'Something went wrong'});

  }
}

  res.json({status: 'OK'})
})

app.post('api/login', async (req, res) =>{
  const {username, password} = req.body;
  const user = await user.findOne({username}).lean();

  if(!user){
    return res.json({status: 'error', error: 'Invalid username/password'})
  }

  if(await bcrypt.compare(password, user.password)){
    const token = jwt.sign({
      id: user._id, 
      username:user.username
    }, JWT_SECRET)
    return res.json({status: 'ok', error: 'password matched! user logged in'})
  }

  res.json({status: 'error', data: 'Invalid username/password'})
})






