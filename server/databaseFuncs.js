const db = require('./database.js');
const bcrypt = require('bcryptjs');
const DatabaseFuncs = {};

DatabaseFuncs.getAll = async (username) => {
  function formatData(SQL) {
    // SQL: [{presetname: 'gaffes', names: '...#...', links: '...#...'}, {presetname: 'instruments', names: '...#...', links: '...#...'}]
    const obj = {};
    // call "db.getAll()"
    SQL.forEach((element) => {
      obj[element.presetname] = [];
      const nameArray = element.names.split('#');
      const linkArray = element.links.split('#');
      const arrayObj = [];
      for (let i = 0; i < nameArray.length; i++) {
        const nameLink = {};
        nameLink.name = nameArray[i];
        nameLink.link = linkArray[i];
        arrayObj.push(nameLink);
      }
      obj[element.presetname] = arrayObj;
    });
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
  Group BY presetsongs.presetName`;

  try {
    const data = await db.query(qString, [username]);
    const formattedData = formatData(data.rows);
    return formattedData;
  } catch (err) {
    return err;
  }
};

DatabaseFuncs.savePrimary = async (names) => {
  const qString = `Insert INTO presets (name, username) Values ($1, $2)`;
  try {
    await db.query(qString, names);
    return;
  } catch (err) {
    return err;
  }
};

DatabaseFuncs.savePreset = async (names) => {
  const qString = `Insert INTO presetSongs Values 
    ($1, $2, $28), 
    ($1, $3, $28), 
    ($1, $4, $28), 
    ($1, $5, $28), 
    ($1, $6, $28), 
    ($1, $7, $28), 
    ($1, $8, $28), 
    ($1, $9, $28), 
    ($1, $10, $28), 
    ($1, $11, $28), 
    ($1, $12, $28), 
    ($1, $13, $28),
    ($1, $14, $28), 
    ($1, $15, $28), 
    ($1, $16, $28), 
    ($1, $17, $28), 
    ($1, $18, $28), 
    ($1, $19, $28), 
    ($1, $20, $28), 
    ($1, $21, $28), 
    ($1, $22, $28), 
    ($1, $23, $28), 
    ($1, $24, $28), 
    ($1, $25, $28),
    ($1, $26, $28)
    ($1, $27, $28);`;
  try {
    console.log('dbfunc save preset: query: ', qString);
    console.log('dbfunc save preset: names: ', names);
    await db.query(qString, names);
    return;
  } catch (err) {
    return err;
  }
};

DatabaseFuncs.login = async (username) => {
  let qString = `SELECT * FROM users WHERE users.name = $1`;
  try {
    const dbresponse = await db.query(qString, [username]);
    return dbresponse;
  } catch (err) {
    return err;
  }
};

DatabaseFuncs.signup = async (username, password) => {
  const bcryptedPW = await bcrypt.hash(password, 10);
  let qString = 'Insert INTO users (name, password) Values ($1, $2);';
  try {
    await db.query(qString, [username, bcryptedPW]);
    return;
  } catch (err) {
    return err;
  }
};

module.exports = DatabaseFuncs;
