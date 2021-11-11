const express = require('express');
const router = express.Router();
const path = require('path');
const BoardController = require('../controllers/BoardController');
const UserController = require('../controllers/UserController');
const CookieController =require('../controllers/CookieController');

//This path not being run when using webpack
router.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname + '/index.html'));
});

// Return all sounds for a board
router.post('/all', BoardController.getAll, (req, res)=> {
  return res.status(200).json(res.locals.all)
})

// Save new preset to database
router.post('/savePreset', BoardController.savePrimary, BoardController.savePreset, BoardController.getAll, (req, res) => {
  return res.sendStatus(200);
});

// Log in  user
router.post('/login', UserController.login, BoardController.getAll, (req, res) => {
  return res.status(200).json(res.locals); 
});

// Sign up user
router.post('/signup', UserController.signup, (req, res) => {
  return res.status(200).json(res.locals.username);
});


module.exports = router;