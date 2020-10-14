require('dotenv').config();
const PORT = process.env.PORT || 8080;
const express = require('express');
const app = express();
// body parser
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// const assert = require('assert');
// const { mongo } = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const dbName = process.env.DB_NAME
const dbPw = process.env.DB_PW
const uri = `mongodb+srv://dmancuso:${dbPw}@cluster0.hichq.mongodb.net/${dbName}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("users");
//   // perform actions on the collection object
//   client.close();
// });


console.log('Hello')


app.get('/', function (req, res) {
  res.send("Welcome to Logger")
})

// this logs all users. ( TODO: switch to user profile)
app.get('/userindex', (req, res) => {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    let dbo = db.db(`${dbName}`);
    dbo.collection("users").find({}, function (err, result) {
      if (err) throw err;
      result.forEach((user) => {
        console.log(user); // logs current user
      })
      db.close();
    });


  });

})


// This adds a user
app.post("/adduser", (req, res) => {
  console.log(req.body)
  const body = {
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    password: req.body.password
  };

  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("logger");
    dbo.collection("users").insertOne(body, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      console.log('RES', res)
      db.close();
    });
  });

  res.end();

});



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});