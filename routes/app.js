//deal with the routing for the homepage "/", the  contact page "/contact" and "/dashboard"
const express = require('express');
const router = express.Router();
const User = require("../models/user");

// getting the homepage which is denoted by "/"
router.get("/",function(req,res){
    res.render("index");
})


//getting the contact page

router.get('/contact', function(req, res){
    res.render("contact");
});

//deal with post req of /dashboard

router.post('/dashboard', function(req,res){
    console.log(req.body.name)
    console.log(req.body.password)
    res.render("dashboard", {name: req.body.name, password: req.body.password});
})

module.exports = router;
