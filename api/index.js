require('dotenv').config();
const PORT = process.env.PORT || 8080;

//Express
const express = require('express');
const app = express();

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// JWT
var jwt = require('jsonwebtoken');

//bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const dbName = process.env.DB_NAME;
const dbPw = process.env.DB_PW;
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


// REGISTER - POST to /adduser, inserts one user


app.post("/adduser", (req, res, next) => {
  console.log(req.body)
  const body = {
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, saltRounds),
    startDate: new Date(),
    lastLogin: new Date()
  };
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, db) {
    if (err) throw err;
    let dbo = db.db("logger");
    const isDupe = await dbo.collection("users").findOne({ email: `${req.body.email}` });
    if (isDupe) {
      //fail:
      // console.log('Email already exists!!!')
      // console.log("0 documents inserted");
      // res.end();
    } else {
      // success:
      dbo.collection("users").insertOne(body, function (err, result) {
        if (err) throw err;
        const newUser = result.ops[0]
        // console.log("1 document inserted");
        // console.log('returned user', newUser)
        // create Token
        const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
          expiresIn: 86400 // 24 hours
        });
        // console.log('NEW JWT TOKEN', token)
        // send response obj with user and token info 
        res.status(201).send({
          accessToken: token,
          currentUser: newUser
        });
        //close db
        db.close();
      });
    }
  });
});


// LOGIN - GET
app.get("/login", (req, res, next) => {
  res.send("Hello From Login")
});

// LOGIN - POST
app.post("/login", (req, res, next) => {
  // TODO: add functionality.
  // findOne user by req.body.email
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, db) {
    if (err) throw err;

    console.log("this is what's in the req.body: ", req.body.email)

    let dbo = db.db("logger");

    const getUser = await dbo.collection("users").findOne({ email: `${req.body.email}` });
    console.log("GET USER ", getUser)
    if (!getUser) {
      //fail
      console.log('user not found. Would you like to create an account?')
      res.status(400).send({
        error: "User Not Found."
      })
    } else {
      const token = jwt.sign({ email: getUser.email }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });
      // console.log('NEW JWT TOKEN', token)
      // send response obj with user and token info 
      res.status(200).send({
        accessToken: token,
        currentUser: getUser
      });
      //close db
      db.close();

    };

  });

  // compare req.body.password using bcrypt compare
  // then set token in local storage.
  // find username of the request in database, if it exists
  // compare password with password in database using bcrypt, if it is correct
  // generate a token using jsonwebtoken
  // return user information & access Token
});




app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});