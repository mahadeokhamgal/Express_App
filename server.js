const express = require("express");
const mongoose = require('mongoose');
const { URL } = require("url");
const { User } = require('./user.model.js');
const jwt = require('jsonwebtoken');

const loginRoute = require('./login.js');

app = express();

mongoose.connect("mongodb://localhost:27017/user", {}).then(() => {
    console.log("mongoose connected");
}).catch((err) => {
    console.log("error connecting mongoose");
})

app.use(express.json())
app.use("/login", loginRoute);

app.use("", (req, res, next) => {
    const { jwt_token } = req.headers;
    const token = jwt_token;
    if(!token) {
        res.status(401).send("Unauthorised!");
    } else {
        jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, user) => {
            if(err) {
                console.log(err);
                res.status(403).send("Invalid token!!");
            } else {
                req.user = user;
                next();
            }
        })
    }
})

app.use((req, res, next) => {
    console.log("req, res, next -> ");
    next();
})

app.get("/user", async (req, res) => {
    console.log("req received", req.url, req.params);
    let url = new URL("http://localhost:3000"+req.url);
    if(req.params.id == 2) {
        throw new Error("cannot be two error");
    } 
    const users = await User.find({}).select('-password');
    users.forEach(u => {
        delete u.password;
    })
    res.status(200).json(users);
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).send('User created successfully');
    } catch (error) {
      res.status(500).send('Error creating user: ' + error.message);
    }
  });

app.use((err, req, res, next) => {
    console.error(err);
    res.status(503).send("Error occured")
})

app.listen(3000, () => {
    console.log("server started on port 3000");
    
})

