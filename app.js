const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const organizationRoute = require('./routes/organization');
const memberRoute = require('./routes/member');

//Set up default mongoose connection
const mongoDB = process.env.MONGO_DATABASE || 'mongodb://127.0.0.1:27017/development_xendit';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology:true });
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/orgs", organizationRoute)
app.use("/member", memberRoute)

module.exports = app;
