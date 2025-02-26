const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('./user.model.js');

require("dotenv").config();

router.post("", async (req, res) => {
    console.log("login route");
    const { username, email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if(!user) {
        res.status(404).send("user not found!, need to register first");
        return;
      } else {
        if(user.password != password) {
            res.status(401).send("Unauthorised!");
        } else {
            const token = jwt.sign({username, email}, process.env.JWT_TOKEN_KEY);
            console.log(username, email, token);
            res.status(200).send({accessToken : token});
        }
      }
      
    } catch (error) {
      res.status(500).send('Error authenticating user: ' + error.message);
    }
    
    
})

module.exports = router;