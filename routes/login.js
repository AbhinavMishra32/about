const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
app.use(express.json());

// router.get('/', (req, res) =>{
//     // res.sendFile('public/login/login.html');
//     res.sendFile(path.join(__dirname, '../public/login/login.html'));
// });

router.post('/api/register', async (req, res)=>{
    console.log(req.body);
    res.json({status: 'OK'})
})

module.exports = router;