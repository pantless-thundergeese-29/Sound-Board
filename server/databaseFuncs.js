const db = require('./database.js');

const DatabaseFuncs = {};

DatabaseFuncs.getAll = async (username) => {
  function formatData(SQL) {
    // SQL: [{presetname: 'gaffes', names: '...#...', links: '...#...'}, {presetname: 'instruments', names: '...#...', links: '...#...'}]
    const obj ={}
    // call "db.getAll()"
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
    // return obj: {gaffes: [{name: '', link: ''}, {name: '', link: ''}], instruments: [{name: '', link: ''}, {name: '', link: ''}]}
    return obj;
    //one object with as many keys as there are families of sounds
      //each key has an array of objects
        //each object has two key value pairs, one for name and one for link 
  }
  const qString = `select presetsongs.presetName, STRING_AGG(presetsongs.sound, '#') 
  AS names, STRING_AGG(soundLinks.link, '#') 
  AS links from presetsongs
  Left Join soundlinks
  ON presetsongs.sound = soundLinks.sound
  WHERE username IS NULL or username = $1
  Group BY presetsongs.presetName`

  try {
    const data = await db.query(qString, [username]);
    const formattedData = formatData(data.rows);
    return formattedData;
  } catch (err) { return err }

}

DatabaseFuncs.savePrimary = async(names) => {
  const qString = `Insert INTO presets (name, username) Values ($1, $2)`;
  try {
    await db.query(qString, names);
    return;
  } catch (err) { return err }
}

DatabaseFuncs.savePreset = async(names) => {
  const qString =  `Insert INTO presetSongs Values 
    ($1, $2, $14), 
    ($1, $3, $14), 
    ($1, $4, $14), 
    ($1, $5, $14), 
    ($1, $6, $14), 
    ($1, $7, $14), 
    ($1, $8, $14), 
    ($1, $9, $14), 
    ($1, $10, $14), 
    ($1, $11, $14), 
    ($1, $12, $14), 
    ($1, $13, $14);`
  try {
    console.log('dbfunc save preset: query: ', qString)
    console.log('dbfunc save preset: names: ', names)
    await db.query(qString, names)
    return;
  } catch (err) { return err }
}



// DatabaseFuncs.getPokemon = () => {
//   const qString =  'SELECT pokemon.name, pokemon.link FROM pokemon';
//   db.query(qString)
//     .then(data => {
//       return data
//     })
//     .catch(err => {
//       return Error;
//     });
// };

// DatabaseFuncs.getInstruments = () => {
//   const qString =  'SELECT instruments.name, instruments.link FROM instruments';
//   db.query(qString)
//     .then(data => {
//       return data
//     })
//     .catch(err => {
//       return Error;
//     });
// };

// DatabaseFuncs.getGaffes = (req, res, next) => {
//   const qString =  'SELECT gaffes.name, gaffes.link FROM gaffes';

//   // TODO: Replace with dbFuncs.getGaffes()
//   db.query(qString)
//     .then(data => {
//       return data
//     })
//     .catch(err => {
//       return Error;
//     });
// };


// DatabaseFuncs.getPresets = (req, res, next) => {
//   const qString =  'SELECT presets.presetname, presets.list FROM presets';

//   // TODO: Replace with dbFuncs.getPresets()
//   db.query(qString)
//     //grabbing characters from the DB
//     .then(data => {
//       return data
//     })
//     .catch(err => {
//       return Error;
//     });





//   // TODO: Replace with dbFuncs.getAll()
//   let qString = `select presetsongs.presetName, STRING_AGG(presetsongs.sound, '#') AS names, STRING_AGG(soundLinks.link, '#') AS links from presetsongs
//   Left Join soundlinks
//   ON presetsongs.sound = soundLinks.sound
//   Group BY presetsongs.presetName`
//   console.log('trying to get all with the parse')
//   db.query(qString)
//     .then(data => {
//       res.locals.all = formatData(data.rows);
//       return next();
//     })
//     .catch(err => {
//       console.log('Error when trying to do the query for getting all')
//       return next ({
//         log: 'Error in the Controller.getAll',
//         message: {err: 'Controller.getAll: Error'}
//       })
//     })
// };
// Controller.savePrimary = (req, res, next) => {
//   //unable to do multiple queries at the same time so I need to create
//   //the primary key in the preset table for better username usage
//   const testing = req.body.newPreset
//   const names = [testing[0], testing[14]]
//   // TODO: Replace with dbFuncs.savePrimary(names)
//   let qString = "Insert INTO presets (name, username) Values ($1, $2)";
//   db.query(qString, names)
//     .then(() => {
//       return next();
//     })
//     .catch(err => {
//       console.log(err.message);
//       return next({
//         log: 'Error in Controller.savePrimary',
//         message: {err: 'Controller.savePrimary'}
//       });
//     });
// };
// Controller.savePreset = (req, res, next) => {
//   const testing = req.body.newPreset;
//   let qString =  "Insert INTO presetSongs Values ($1, $2, $14), ($1, $3, $14), ($1, $4, $14), ($1, $5, $14), ($1, $6, $14), ($1, $7, $14), ($1, $8, $14), ($1, $9, $14), ($1, $10, $14), ($1, $11, $14), ($1, $12, $14), ($1, $13, $14);"
//   // qString += `'${arr.shift()}','`;
//   // qString = qString + arr.join('#') + ')';
//   db.query(qString, testing)
//     .then(() => {
//       return next();
//     })
//     .catch(err => {
//       console.log(err.message);
//       return next({
//         log: 'Error in Controller.savePreset',
//         message: {err: 'Controller.savePreset'}
//       });
//     });
// };

// Controller.login = (req, res, next) => {
//   console.log('this is the post request body', req.body.userInfo);
//   const { username, password } = req.body.userInfo;
//   console.log({'username': username, 'password':password});
//   let qString =  'select * from users Where name = $1 AND password = $2'; //grab user presets while matching for username/pw
//   console.log('trying to save......Adam')
//   // TODO: Replace with dbFuncs.login(username, password)
//   db.query(qString, [username, password])
//     .then((data) => {
//       res.locals.loginStatus = true;
//       return next();
//     })
//     .catch(err => {
//       console.log(err.message);
//       return next({
//         log: 'Error in Controller.getGaffes',
//         message: {err: 'Controller.getGaffes: Error'}
//       });
//     });
// };

// Controller.signup = (req, res, next) => {
//   console.log('this is the post request body', req.body.allInfo);
//   const { username, password } = req.body.allInfo;
//   console.log(req.body.allInfo);
//   let qString =  "Insert INTO users (name, password) Values ($1, $2);" //inserting username, pw, preset options
//   console.log('trying to save......Adam')
//   // TODO: Replace with dbFuncs.signup(username, password)
//   db.query(qString, [username, password])
//     .then(() => {
//       return next();
//     })
//     .catch(err => {
//       console.log(err.message);
//       return next({
//         log: 'Error in Controller.signup',
//         message: {err: 'Controller.signup: Error'}
//       });
//     });
// };


module.exports = DatabaseFuncs;
