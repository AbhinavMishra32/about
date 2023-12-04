const express = require('express');
const path = require("path");
const app = express();
const mongoose = require('mongoose');
app.use(express.json({limit: '1mb'}));

// mongoose.connect(process.env.API_KEY);

const port = process.env.PORT || 3000

app.use(express.static('public'));

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');

app.use('/', indexRouter);
app.use('/login', loginRouter);


app.listen(port, () => {
  console.log(`App listening at ${port}`)
})

