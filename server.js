const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express(); 
require("dotenv/config");

app.use(bodyParser.json());

const port = process.env.PORT || 3000;


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://messageboard:<password>@cluster0.91twr.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();


// Routes
const disorderRoute = require('./routes/disorders');
app.use('/api', disorderRoute);

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.on('open', () => console.error("Connected to DB"));


app.listen(port, () => {
    console.log("Running server on port " + port);
});