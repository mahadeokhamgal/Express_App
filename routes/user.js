const express = require("express");
const router = express.Router();

const middleWare = (req, res, next) => {
    console.log("req, res, next -> ");
    next();
};

router.get("", middleWare, async (req, res) => {
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
});

module.exports = router;