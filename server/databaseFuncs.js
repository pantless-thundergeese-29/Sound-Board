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

DatabaseFuncs.login = async (username, password) => {
  let qString =  'select * from users Where name = $1 AND password = $2';
  try{
    await db.query(qString, [username, password])
    return;
  } catch (err) {return err}
}

DatabaseFuncs.signup = async (username, password) => {
  let qString =  "Insert INTO users (name, password) Values ($1, $2);" 
  try {
    await db.query(qString, [username, password]);
    return;
  } catch (err) {return err}
}
module.exports = DatabaseFuncs;
