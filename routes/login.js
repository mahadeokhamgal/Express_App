const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../model/user.model.js');
const { userSchema } = require('../schema/schemas.js');
require("dotenv").config();

router.post("", async (req, res) => {
    console.log("login route");
    

    try {
      const { username, email, password } = req.body;
      const { error } = userSchema.validate(req.body);
      
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const user = await User.findOne({ email: email });
      if(!user) {
        res.status(404).send("user not found!, need to register first");
        return;
      } else {
        if(user.password != password) {
            res.status(401).send("Unauthorised!");
        } else {
            const token = jwt.sign({username, email}, process.env.JWT_TOKEN_KEY, { expiresIn: '1m' });
            console.log(username, email, token);
            res.cookie('auth_token', token, {
              httpOnly: true,  // Makes the cookie accessible only by the server (prevents XSS attacks)
              secure: true,    // Ensures the cookie is only sent over HTTPS (useful in production)
              sameSite: 'Strict', // Protects against CSRF attacks by restricting cross-site cookie sending
              maxAge: 60 * 60 * 1000, // Token expires after 1 hour (in milliseconds)
            })
            res.status(200).send("Login successfull!");
        }
      }
      
    } catch (error) {
      res.status(500).send('Error authenticating user: ' + error.message);
    }
    
    
})

module.exports = router;