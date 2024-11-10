var express = require('express');
var router = express.Router();
var passport = require('../passport');

router.route('/login')
  .get(function(req, res, next) {
    res.render('login', {title: 'Login'});
  })
  .post(passport.authenticate('local', {
    failureRedirect: '/login',
  }), function(req, res) {
    res.redirect('/');
  });

router.route('/register')
  .get(function(req, res, next) {
    res.render('register', {title: 'Register a new account'});
  })
  .post(function(req, res, next) {
    console.log(req.body)
    req.checkBody('name', 'Empty Name').notEmpty();
    req.checkBody('email', 'Invalid Email').notEmpty();
    req.checkBody('password', 'Empty Password').notEmpty();
    req.checkBody('password', 'Password do not match').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
      res.render('register', {
        name: req.body.name,
        email: req.body.email,
        errorMessages: errors,
      })
    } else {
      var user = new User();
      user.name = req.body.name;
      user.email = req.body.email;
      user.setPassword(req.body.password);
      console.log("sdfsdfdfasd")
      user.save(function(err) {
        console.log("sdasd")
        console.log(err)
        if (err) {
          res.render('register', {
            name: req.body.name,
            email: req.body.email,
            errorMessages: err
          })
        } else {
          res.redirect('/login');
        }
      })
    }
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  })
  
module.exports = router;
