const db = require('../database.js');
const dbFuncs = require('../databaseFuncs.js')

const BoardController = {};

BoardController.getAll = async (req, res, next) => {
  try {
  let username;
  if (req.body.userInfo == undefined) username = req.body.username;
  else username = req.body.userInfo.username;

  const data = await dbFuncs.getAll(username);
  res.locals.all = data;
  return next();
  } catch (err) {
    return next({
      log: 'Error in BoardController.getAll',
      message: {err: 'BoardController.getAll'}
    });
  }
}

BoardController.savePrimary = async (req, res, next) => {
  try {
    const testing = req.body.newPreset;
    const names = [testing[0], testing[14]];
    await dbFuncs.savePrimary(names);
    return next();
  } catch (err) {
    return next({
      log: 'Error in BoardController.savePrimary',
      message: {err: 'BoardController.savePrimary'}
    })
  }
}

BoardController.savePreset = async (req, res, next) => {
  try {
    const names = req.body.newPreset;
    await dbFuncs.savePreset(names);
    return next();
  } catch(err) {
    return next({
      log: 'Error in BoardController.savePreset',
      message: {err: 'BoardController.savePreset'}
    })
  }
} 

module.exports = BoardController;