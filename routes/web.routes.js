const express = require('express');
const router = express.Router();
const { PASSWORD, auth } = require('../middlewares/auth');

// **************************************************
// Publie Routes
router.get("/", (req, res) => {

  res.render('index', {
    title: 'Home Page',
  });

});

router.get("/suggest", (req, res) => {

  res.render('suggest', {
    title: 'Suggest a Website',
  });

});

router.get("/list", (req, res) => {

  res.render('list', {
    title: 'List of Quirky Websites',
  });

});

// **************************************************
// Secure Routes
router.get("/manage", auth, (req, res) => {

  res.render('manage', {
    title: 'Manage Suggestions',
  });

});

// **************************************************
// Login Routes
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', (req, res) => {

  const { password } = req.body;

  if (password === PASSWORD) {
    req.session.isAuthenticated = true;
    res.redirect('/manage');
  } else {
    res.redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;