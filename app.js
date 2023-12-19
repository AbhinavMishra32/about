const express = require("express");
const session = require('express-session');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();

app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const uri = process.env.API_KEY;
const PORT = process.env.PORT;

const User = require('./model/user');

async function start(){
    try{
        await mongoose.connect(uri);
        app.listen(PORT, () =>{
            console.log("Connected to Mongo DB");
            console.log(`App listening at ${PORT}`);
        })
    }
    catch(err){
        console.log(err.message);
    }
}

start();

app.use(session({
    secret: 'abhinavmishrasecretkeyyoyoyo',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) =>{
    res.sendFile('index.html', {root: 'public'})
  })

app.get('/register', (req, res) =>{
// res.sendFile('public/login/login.html'); //cant work since it doesnt work with relative path. needs full path
res.sendFile(path.join(__dirname, 'public/login/register-new.html'));
})

app.get('/login', (req, res) =>{
// res.sendFile('public/login/login.html'); //cant work since it doesnt work with relative path. needs full path
res.sendFile(path.join(__dirname, 'public/login/signin.html'));
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

app.post('/api/register', async(req, res) =>{
    console.log('This credentials server got: ' + JSON.stringify(req.body));
    const {username, password} = req.body;
    //creating user in database:
    try{
        const response = await User.create({username,password})
        req.session.loggedIn = true;
        req.session.username = username;
        console.log("user created successfully! " + "User data: ", response);
        res.json({status: 'OK'});
    }
    catch(err){
        if(err.code === 11000){
            res.status(409).json({message: 'This username has already been taken'});
        }
        else if(username ==="" || password ===""){
            res.json({message:"Please enter the username or password"})
        }
        else{
            res.status(500).json({message: 'Something went wrong'});
        }
    }
})
//TODO: add login with correct routing 
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

// app.post('/api/register/accountcreated', async(req,res)=>{
//     if(req.status ==="accountcreated"){
        
//     }
// })

// app.get('/dashboard', (req, res) =>{

// })

// app.post('/api/logout', async(req, res) =>{
    
// });
