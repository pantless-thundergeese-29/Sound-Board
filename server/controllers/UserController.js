const db = require('../database.js');
const dbFuncs = require('../databaseFuncs.js')

const UserController = {};

UserController.login = async (req, res, next) => { 
  // const valid = await bcrypt.compare(password, user.password);
  // if(valid === false){
  //   res.status(401);
  // }
  const { username, password } = req.body.userInfo;
  try {
    const data = await dbFuncs.login([username, password])
    return next();
  } catch (err){
    return next({
    log: 'Error in UserController.getGaffes',
    message: {err: 'UserController.getGaffes: Error'}
    })
  }
  // db.query(qString, [username, password])
  //   .then((data) => {
  //     res.locals.loginStatus = true;
  //     return next();
  //   })
  //   .catch(err => {
  //     console.log(err.message);
  //     return next({
  //       log: 'Error in UserController.getGaffes',
  //       message: {err: 'UserController.getGaffes: Error'}
  //     });
  //   });
};

UserController.signup = async (req, res, next) => { 
  console.log("req body in signup", req.body)
  const { username, password } = req.body.allInfo;
  try {
    const data = await dbFuncs.signup(username, password)
    console.log('data from user controller', data)
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