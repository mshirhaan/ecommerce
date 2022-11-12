const router = require('express').Router();
const User = require("../model/user");

router.get('/users', (req, res)=>{
    res.render("users");
});

router.get('/user/:id', (req, res)=>{
    res.end('user with id:' + req.params.id);
});

module.exports = router;