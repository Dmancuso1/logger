require('dotenv').config();
const PORT = process.env.PORT || 8080;


//Express
const express = require('express');
const app = express();
app.use("/uploads", express.static('uploads'))

// Cors
const cors = require('cors');
app.use(cors())


// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// multer (file upload)
var multer = require('multer')


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








//Home  //////////////////////////////////
app.get('/', function (req, res) {
  res.send("Welcome to Logger")
})



// GET  USER  ////////////////////////////////// logs all users
app.get('/userindex', (req, res) => {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    let dbo = db.db(`${dbName}`);
    const userIndex = dbo.collection("users").find({})
    userIndex.forEach((user) => {
      // db.close();
      console.log(user); // logs current user 
    })
    res.end();
  });
})



// POST ADDUSER REGISTER ////////////////////////////////// adds one user
// multer config
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    var ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
  }
}),
  upload = multer({ storage: storage }).single("avatar");



app.post("/adduser", upload, (req, res, next) => {
  const body = {
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, saltRounds),
    address: req.body.address,
    avatar: req.file,
    startDate: new Date()
  };
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, db) {
    if (err) throw err;
    let dbo = db.db("logger");
    const isDupe = await dbo.collection("users").findOne({ email: `${req.body.email}` });
    if (isDupe) {
      //fail:
      console.log('Email already exists!!!')
      console.log("0 documents inserted");
      db.close();
      res.end()
    } else {
      // success:
      dbo.collection("users").insertOne(body, function (err, result) {
        if (err) throw err;
        const newUser = result.ops[0]
        console.log("1 document inserted");
        console.log('returned user', newUser)
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
        db.close();
      });
    }
  });
});



// GET  LOGIN  //////////////////////////////////
app.get("/login", (req, res, next) => {
  res.send("Hello From Login")
});


// POST  LOGIN  //////////////////////////////////     
app.post("/login", (req, res, next) => {
  // TODO: add functionality.
  // findOne user by req.body.email
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, db) {
    if (err) throw err;
    // console.log("this is what's in the req.body: ", req.body.email)
    let dbo = db.db("logger");

    const getUser = await dbo.collection("users").findOne({ email: `${req.body.email}` });
    // console.log("GET USER!!! ", getUser)

    if (!getUser) {
      //Login FAIL
      console.log('User not found!')
      res.status(400).send({
        error: "User Not Found."
      })
    } else {

      // Login PASS!
      await bcrypt.compare(req.body.password, getUser.password).then(async function (result) {
        if (!result) {
          console.log('incorrect password! bcrypt result = ', result)
          res.status(400).send({
            error: "Wrong password."
          })
        } else {
          // sign/set JWT token
          const token = jwt.sign({ email: getUser.email }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
          });
          // send response to client
          res.status(200).send({
            accessToken: token,
            currentUser: getUser
          });
        }
      });

    };
    db.close();
  });

});


//////////////////////////////////
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});