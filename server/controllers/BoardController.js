const db = require('../database.js');
const BoardController = {};

BoardController.getAll = (req, res, next) => {

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
 
  db.query(qString)
    .then(data => {
      res.locals.all = formatData(data.rows);
      return next();
    })
    .catch(err => {
      console.log('Error when trying to do the query for getting all')
      return next ({
        log: 'Error in the BoardController.getAll',
        message: {err: 'BoardController.getAll: Error'}
      })
    })
}

BoardController.savePrimary = (req, res, next) => {
  //unable to do multiple queries at the same time so I need to create
  //the primary key in the preset table for better username usage
  const testing = req.body.newPreset
  const names = [testing[0], testing[14]]
  let qString = "Insert INTO presets (name, username) Values ($1, $2)";
  db.query(qString, names)
    .then(() => {
      return next();
    })
    .catch(err => {
      console.log(err.message);
      return next({
        log: 'Error in BoardController.savePrimary',
        message: {err: 'BoardController.savePrimary'}
      });
    });
}
BoardController.savePreset = (req, res, next) => {
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
        log: 'Error in BoardController.savePreset',
        message: {err: 'BoardController.savePreset'}
      });
    });
};

module.exports = BoardController;