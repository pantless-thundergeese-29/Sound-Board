const db = require('../database.js');
const UserController = {};

UserController.login = (req, res, next) => { // make this async
  // const valid = await bcrypt.compare(password, user.password);
  // if(valid === false){
  //   res.status(401);
  // }
  const { username, password } = req.body.userInfo;
  let qString =  'select * from users Where name = $1 AND password = $2'; //grab user presets while matching for username/pw
  db.query(qString, [username, password])
    .then((data) => {
      res.locals.loginStatus = true;
      return next();
    })
    .catch(err => {
      console.log(err.message);
      return next({
        log: 'Error in UserController.getGaffes',
        message: {err: 'UserController.getGaffes: Error'}
      });
    });
};

UserController.signup = (req, res, next) => { //make this async
  const { username, password } = req.body.allInfo;
  // const encrypted = await bcrypt.hash(password, 10); //<--replace var password with var encrypted below here
  let qString =  "Insert INTO users (name, password) Values ($1, $2);" //inserting username, pw, preset options
  db.query(qString, [username, password])
    .then(() => {
      return next();
    })
    .catch(err => {
      console.log(err.message);
      return next({
        log: 'Error in UserController.signup',
        message: {err: 'UserController.signup: Error'}
      });
    });
};

module.exports = UserController;