const PORT = process.env.PORT || 8080;
require('dotenv').config();
const express = require('express');
const app = express();

// body parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const dbName = process.env.DB_NAME
const dbPw = process.env.DB_PW
const uri = `mongodb+srv://dmancuso:${dbPw}@cluster0.hichq.mongodb.net/${dbName}?retryWrites=true&w=majority`;








//Home
app.get('/', function (req, res) {
  res.send("Welcome to Logger")
})


// this logs all users. ( TODO: switch to user profile)
app.get('/userindex', (req, res) => {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    let dbo = db.db(`${dbName}`);
    const userIndex = dbo.collection("users").find({})
    userIndex.forEach((user) => {
      db.close();
      console.log(user); // logs current user
    })
    res.end();
  });
})


// POST to /adduser, inserts one user
app.post("/adduser", (req, res, next) => {

  console.log(req.body)
  const body = {
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    password: req.body.password,
    startDate: new Date(),
    lastLogin: new Date()
  };
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, db) {
    if (err) throw err;
    let dbo = db.db("logger");
    const isDupe = await dbo.collection("users").findOne({ email: `${req.body.email}` });
    if (isDupe) {
      console.log('Email already exists!!!')
    } else {
      dbo.collection("users").insertOne(body, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    }
  });
  res.end();
});








app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});