const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const loginRoute = require("./routes/login.js");
const registerRoute = require("./routes/register.js");
const userRoute = require("./routes/user.js")
require("dotenv").config();

app = express();

mongoose.connect(process.env.MONGO_URL + process.env.MONGO_DB, {}).then(() => {
    console.log("mongoose connected");
}).catch((err) => {
    console.log("error connecting mongoose");
})

app.use(express.json())

app.use("/login", loginRoute);
app.use("/register", registerRoute);

const vaidate_jwt = (req, res, next) => {
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
};

app.use(vaidate_jwt);

app.use("/user", userRoute)

app.use((err, req, res, next) => {
    console.error(err);
    res.status(503).send("Error occured")
})

app.listen(3000, () => {
    console.log("server started on port 3000");
})

module.exports = app;