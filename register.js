const express = require("express");
const { User } = require('./user.model.js');
const { userSchema } = require('./schemas.js');

const router = express.Router();

router.post('', async (req, res) => {
    const { name, email, password } = req.body;
    const error = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(500).send('Error creating user: ' + error.message);
    }
});

module.exports = router;