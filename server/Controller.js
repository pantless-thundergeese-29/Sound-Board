const db = require('./database.js');
  //const bcrypt = require('bcryptjs');
const Controller = {};

// Controller.savePreset = (req, res, next) => {
  
//   req.body = ['Connor','charmander','whip','two_hours_later','xylophone','marimba','zither','gta','what_are_those','recorder','vulpix','fbi','ash_boogy'];
//   let qString =  'INSERT INTO presets VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)';
//   // qString += `'${arr.shift()}','`;
//   // qString = qString + arr.join('#') + ')';
//   console.log('trying to save......')
//   db.query(qString, req.body)
//     .then(data => {
//       return next();
//     })
//     .catch(err => {
//       console.log("ERROR!!!");
//       return next({
//         log: 'Error in Controller.getGaffes',
//         message: {err: 'Controller.getGaffes: Error'}
//       });
//     });
// };

Controller.getALL = (req, res, next) => {
  console.log(req.body);
  console.log('currently in the controller get ALl');
  function formatData(SQL) {
    const obj ={}
    SQL.forEach((element) => {
      obj[element.presetname] = []
      const nameArray = element.names.split('#')
      const linkArray = element.links.split('#')
      const arrayObj = []
      for(let i =0; i< nameArray.length; i++) {
        const nameLink = {}
        nameLink.name = nameArray[i]
        nameLink.link = linkArray[i]
        arrayObj.push(nameLink)
      }
      obj[element.presetname] = arrayObj
    })
    return obj;
    //one object with 3 keys
      //each key has an array of objects
        //each object has a name and link key
  }
  let qString = `select presetsongs.presetName, STRING_AGG(presetsongs.sound, '#') AS names, STRING_AGG(soundLinks.link, '#') AS links from presetsongs
  Left Join soundlinks
  ON presetsongs.sound = soundLinks.sound
  Group BY presetsongs.presetName`
  console.log('trying to get all with the parse')
  db.query(qString)
    .then(data => {
      res.locals.all = formatData(data.rows);
      console.log('Res.locals.all:', res.locals.all)
      return next();
    })
    .catch(err => {
      console.log('Error when trying to do the query for getting all')
      return next ({
        log: 'Error in the Controller.getAll',
        message: {err: 'Controller.getAll: Error'}
      })
    })
}
Controller.savePrimary = (req, res, next) => {
  //unable to do multiple queries at the same time so I need to create
  //the primary key in the preset table for better username usage
  const testing = req.body.newPreset
  console.log('req.body.newPreset', testing)
  const names = [testing[0], testing[14]]
  let qString = "Insert INTO presets (name, username) Values ($1, $2)";
  db.query(qString, names)
    .then(() => {
      return next();
    })
    .catch(err => {
      console.log(err.message);
      return next({
        log: 'Error in Controller.savePrimary',
        message: {err: 'Controller.savePrimary'}
      });
    });
}
Controller.savePreset = (req, res, next) => {
  const testing = req.body.newPreset;
  let qString =  "Insert INTO presetSongs Values ($1, $2, $14), ($1, $3, $14), ($1, $4, $14), ($1, $5, $14), ($1, $6, $14), ($1, $7, $14), ($1, $8, $14), ($1, $9, $14), ($1, $10, $14), ($1, $11, $14), ($1, $12, $14), ($1, $13, $14);"
  // qString += `'${arr.shift()}','`;
  // qString = qString + arr.join('#') + ')';
  db.query(qString, testing)
    .then(() => {
      return next();
    })
    .catch(err => {
      console.log(err.message);
      return next({
        log: 'Error in Controller.savePreset',
        message: {err: 'Controller.savePreset'}
      });
    });
};

Controller.login = (req, res, next) => { // make this async
  // const valid = await bcrypt.compare(password, user.password);
  // if(valid === false){
  //   res.status(401);
  // }
  console.log('this is the post request body', req.body.userInfo);
  const { username, password } = req.body.userInfo;
  console.log({'username': username, 'password':password});
  let qString =  'select * from users Where name = $1 AND password = $2'; //grab user presets while matching for username/pw
  console.log('trying to save......Adam')
  db.query(qString, [username, password])
    .then((data) => {
      res.locals.loginStatus = true;
      return next();
    })
    .catch(err => {
      console.log(err.message);
      return next({
        log: 'Error in Controller.getGaffes',
        message: {err: 'Controller.getGaffes: Error'}
      });
    });
};
Controller.signup = (req, res, next) => { //make this async
  console.log('this is the post request body', req.body.allInfo);
  const { username, password } = req.body.allInfo;
  console.log(req.body.allInfo);
  // const encrypted = await bcrypt.hash(password, 10); //<--replace var password with var encrypted below here
  let qString =  "Insert INTO users (name, password) Values ($1, $2);" //inserting username, pw, preset options
  console.log('trying to save......Adam')
  db.query(qString, [username, password])
    .then(() => {
      return next();
    })
    .catch(err => {
      console.log(err.message);
      return next({
        log: 'Error in Controller.signup',
        message: {err: 'Controller.signup: Error'}
      });
    });
};


module.exports = Controller;
