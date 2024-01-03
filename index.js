require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const AuthUser = require('./routes/auth')
const mongoString = process.env.DATABASE_URL;
const app = express();

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error);
});
database.once('connected', () => {
  console.log('Database connected');
});

app.use(express.json())
app.use('/auth',AuthUser)

app.listen(3000,() => {
    console.log(`Server started at localhost://3000`);
});


