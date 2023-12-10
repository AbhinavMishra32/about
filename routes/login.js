const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
app.use(express.json());
const User = require('../model/user');


// router.get('/', (req, res) =>{
//     // res.sendFile('public/login/login.html');
// res.sendFile(path.join(__dirname, '../public/login/login.html'));
// });


module.exports = router;