const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
app.use(express.json());
const User = require('../model/user');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) =>{
    // res.sendFile('public/login/login.html');
    res.sendFile(path.join(__dirname, '../public/login/login.html'));
});

router.post('/api/register', async (req, res)=>{
    console.log(req.body);
    const {username, password: plainTextPassword} = req.body;
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

    res.json({status: 'OK'})
})

module.exports = router;