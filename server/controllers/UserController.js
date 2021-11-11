// Set actual database or mock database depending on environment
const bcrypt = require('bcryptjs');
let databasePath = '';
if (process.env.NODE_ENV === "test") databasePath = '../mockDatabase.js';
else databasePath = '../databaseFuncs.js';
const db = require(databasePath);

const UserController = {};

UserController.login = async (req, res, next) => { 
  const { username, password } = req.body.userInfo;

  try {
    const response = await db.login(username)
    if(response.rows.length === 0) {
      res.status(404)
      res.locals.loggedIn = false;
    }
    const db_user = response.rows[0]
    const valid = await bcrypt.compare(password, db_user.password);
    if(valid === false) {
      res.status(401);
      res.locals.loggedIn = false;
    }
    res.locals.id = db_user._id
    res.locals.loggedIn = true
    return next();
  } catch (err){
    console.log("caught")
    return next({
    log: 'Error in UserController.login',
    message: {err: 'UserController.login: Error'}
    })
  }
};

UserController.signup = async (req, res, next) => { 
  const { username, password } = req.body.allInfo;
  try {
    await db.signup(username, password)
    res.locals.username = {username: username};
    return next();
  } catch (err) {
    return next({
      log: 'Error in UserController.signup',
      message: {err: 'UserController.signup: Error'}
    });
  }
};

module.exports = UserController;