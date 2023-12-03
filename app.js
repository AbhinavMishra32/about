const express = require('express');
const path = require("path");
const app = express();


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App listening at ${port}`)
})

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('public', options));

app.get('/', (req, res) =>{
  try {
    res.status(200).send(req)
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})





















module.exports = app