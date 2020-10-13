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




app.post("/adduser", (req, res) => {
  console.log(req.body)
  const body = {
    fName: req.body.first,
    lName: req.body.last,
    email: req.body.email,
    password: req.body.password
  };

  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("logger");
    dbo.collection("users").insertOne(body, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });

  res.end();

});



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});