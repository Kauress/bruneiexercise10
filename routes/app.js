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
    let new_user = new User(req.body);
    console.log(new_user);
    new_user.save(function(err, result){
        if(err){
            console.log(err);
            //res.status(401).send('auth error');
            // or use
            // return
            res.render("error")
        } else {
            res.render("dashboard", {name: req.body.name, password: req.body.password});
        
        }
    
    // it is within post, as when the user posts their info only then will we save the user
    
    });

})

router.get("/login", function(req, res){
    res.render("login");
})

router.post("/login", function(req,res){
//use authenticate method here
User.authenticate(req.body.name, req.body.password, function(error, user){
 if(error || !user){

    /*
 or write a use case for  password === null 
 Try rendering custom error message

    */
res.render("error")
 } else {
res.render("dashboard", {name: req.body.name, password: req.body.password})
 }

})
});

module.exports = router;
