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

//bcryptjs to hash the passwords
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

app.get('/dashboard', (req, res) =>{
  // res.sendFile(path.join(__dirname, 'public/dashboard/dashboard.html'));
  if(req.session.loggedIn){
      res.render('dashboard', {username: req.session.username});
  }
  else{
      res.redirect('/login');
  }
})

app.get('/register', (req, res) =>{
  // res.sendFile('public/login/login.html');
  res.sendFile(path.join(__dirname, 'public/login/register-new.html'));
})

app.get('/login', (req, res) =>{
  // res.sendFile('public/login/login.html');
  res.sendFile(path.join(__dirname, 'public/login/login-new.html'));
})

app.post('/api/register', async(req, res) =>{
  console.log('This credentials server got: ' + JSON.stringify(req.body));
  const {username, password} = req.body;
  //creating user in database:
  try{
      const response = await User.create({username,password})
      console.log("user created successfully! " + "User data: ", response);
      res.json({status: 'OK'});
  }
  catch(err){
      if(err.code === 11000){
          res.status(409).json({message: 'This username has already been taken'});
      }
      else{
          res.status(500).json({message: 'Something went wrong'});
      }
  }
})

app.post('/api/login', async(req, res) =>{
  const {username, password} = req.body;
  const user = await User.findOne({username}).lean();

  if(!user){
      return res.json({status: 'error', error: 'Invalid username/password', message: 'Please enter the correct username or password.'})
  }

  if(username === user.username && password === user.password){
      console.log("Credentials matched");
      // console.log('You can login now!')
      req.session.loggedIn = true;
      req.session.username = username;
      console.log(req.session.username);

      return res.json({status: 'OK',message: 'Credentials matched',});
  }
  // res.json({status: 'Username found in database'});
})






