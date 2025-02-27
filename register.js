const express = require("express");
const { User } = require('./user.model.js');

const router = express.Router();

router.post('', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).send('User created successfully');
    } catch (error) {
      res.status(500).send('Error creating user: ' + error.message);
    }
});

module.exports = router;