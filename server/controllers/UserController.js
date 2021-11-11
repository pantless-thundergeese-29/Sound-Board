// Set actual database or mock database depending on environment

let databasePath = '';
if (process.env.NODE_ENV === "test") databasePath = '../mockDatabase.js';
else databasePath = '../databaseFuncs.js';
const db = require(databasePath);

const UserController = {};

UserController.login = async (req, res, next) => { 
  const { username, password } = req.body.userInfo;
  try {
    await db.login([username, password])
    return next();
  } catch (err){
    console.log("caught")
    return next({
    log: 'Error in UserController.getGaffes',
    message: {err: 'UserController.getGaffes: Error'}
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