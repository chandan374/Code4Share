var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', {title: 'Code4Share - a platform for sharing code'})
});

router.route('/contact')
  .get(function(req, res, next) {
    res.render('contact', {title: 'Code4Share - a platform for sharing code'})
  })
  .post(function(req, res, next) {
    req.checkBody('name', 'Invalid Name').notEmpty();
    req.checkBody('email', 'Invalid email').notEmpty();
    req.checkBody('message', 'Invalid message').notEmpty();
    var errors = req.validationErrors();
    console.log(errors)
    if (errors) {
      res.render('contact', {
        title: 'Code4share',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessage: errors
      })
    } else {
      res.render('thank', {title: 'Code4Share - a platform for sharing code'}) 
    }
  });

module.exports = router;
